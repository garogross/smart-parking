import mongoose from "mongoose";
import {HandlerFactory} from "./HandlerFactory.js";
import {AppError} from "../utils/appError.js";
import {catchAsync} from "../utils/catchAsync.js";

import {Employee} from "../models/employeeModel.js";
import {Car} from "../models/carModel.js";
import {History} from "../models/historyModel.js";
import {Tenant} from "../models/tenantModel.js";
import {historyActionTypes, historyStatusTypes, monthsShort, tariffTypes} from "../constants.js";
import {formatFullName} from "../utils/formatFullName.js";
import {formatDate} from "../utils/date.js";


const handleFactory = new HandlerFactory(Employee, 'employee')

// const checkAllowedCarsCount = async (tenantId, carsLength) => {
//     const tenant = await Tenant
//         .findById(tenantId)
//         .populate({
//             path: 'employees',
//             populate: {path: 'cars'} // Populate the cars of each employee
//         })
//
//     if (!tenant) throw new AppError('invalid organization')
//
//     const carCount = tenant.employees.reduce((acc, cur) => {
//         acc += cur.cars.length
//         return acc
//     }, 0)
//
//     if (tenant.allowedCarCount && carCount + carsLength > tenant.allowedCarCount) {
//         throw new AppError(`your allowed car count is ${tenant.allowedCarCount}`, 400, {cars: '1'})
//     }
// }

export const getAllEmployeeMiddleware = handleFactory.getAll([
        {
            localField: "organization",
            from: Tenant.collection.name
        },
        {
            foreignField: "owner",
            from: Car.collection.name,
            as: 'cars'
        },
    ],
    (req) => ({'organization._id': new mongoose.Types.ObjectId(req.params.id)}),
    null,
    true
)

export const setReportDates = catchAsync(async (req, res, next) => {
    const {dateFrom, dateTo} = req.query

    const lastMonthStartDate = new Date()
    lastMonthStartDate.setDate(1)

    req.dates = {
        from: dateFrom ? new Date(dateFrom) : lastMonthStartDate,
        to: dateTo ? new Date(dateTo) : new Date()
    }

    if (dateFrom) delete req.query.dateFrom
    if (dateTo) delete req.query.dateTo
    next()

})

export const createEmployee = (catchAsync(async (req, res, next) => {
    const {cars, ...employeeData} = req.body

    // stop creating if tenant allowed cars count is filled

    // try {
    //     await checkAllowedCarsCount(employeeData.organization, cars.length)
    // } catch (err) {
    //     return next(err)
    // }
    const employee = await Employee.create(employeeData)

    const carsData = cars.map(item => ({...item, owner: employee._id}))
    try {
        await Car.create(carsData)
    } catch (err) {
        await Employee.findByIdAndDelete(employee._id)
        await Car.deleteMany({owner: employee._id})
        next(err)
    }

    req.params.id = employee.organization
    next()

}))

export const getAllEmployee = handleFactory.getAll([
        {
            localField: "organization",
            from: Tenant.collection.name
        },
        {
            foreignField: "owner",
            from: Car.collection.name,
            as: 'cars'
        },
    ],
    (req) => ({'organization._id': new mongoose.Types.ObjectId(req.params.id)}))

export const updateEmployee = (catchAsync(async (req, res, next) => {
    const {cars, ...employeeData} = req.body

    const employee = await Employee.findByIdAndUpdate(req.params.id, employeeData, {new: true, runValidators: true})
    if (!employee) return next(new AppError('invalid Id param.'))

    req.params.id = employee.organization

    const employeeCars = cars.map(item => ({...item, owner: employee._id}))
    const updatedCars = employeeCars.filter(item => item._id)
    const newCars = employeeCars.filter(item => !item._id)

    // if (cars?.length) {
    //     try {
    //         await checkAllowedCarsCount(employee.organization, newCars.length)
    //     } catch (err) {
    //         return next(err)
    //     }
    // }


    // delete
    const dbCars = await Car.find({owner: employee._id})
    const deletingIds = []
    if (updatedCars.length !== dbCars.length) {
        dbCars.forEach(item => {
            const curCar = updatedCars.find(curItem => curItem._id === item.id)
            if (!curCar) {
                deletingIds.push(item._id)
            }
        })
        await Car.deleteMany({_id: {$in: deletingIds}})
    }

    if (!cars?.length) return next()

    // update
    for (let item of updatedCars) {
        const {_id, ...data} = item;
        await Car.findByIdAndUpdate(_id, data, {new: true, runValidators: true})
    }

    // create
    await Car.create(newCars)

    next()
}))
export const deleteEmployee = catchAsync(async (req, res, next) => {
    const employee = await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
        return next(new AppError(`No Employee found with that id`, 404))
    }
    req.params.id = employee.organization

    next()
})

export const getOneEmployee = handleFactory.getOne('cars organization')


const getEmployeesReportFunc = async (req) => {
    if (!req.data) return new AppError('no data')
    const cars = req.data.flatMap(item => item.cars.map(car => car.plateNumber))
    const history = await History.find({
        date: {
            "$gte": req.dates.from,
            "$lte": req.dates.to,
        },
        plateNumber: {"$in": cars}
    }).sort('date')
    return req.data.map(({fullName,_id, cars, organization}) => {
        const isGuestTariff = organization.tariff === tariffTypes.guest

        const curHistory = history
            .filter(item => cars.map(car => car.plateNumber).includes(item.plateNumber))
        let timeInPark = 0
        let amount = 0
        let entryDate = new Date(req.dates.from)

        curHistory.forEach(item => {
            if (item.type === historyActionTypes.entry) {

                if (!isGuestTariff) {
                    if (entryDate.getDate() !== new Date().getDate()) {
                        timeInPark += 1
                        const curItemMonth = new Date(item.date).getMonth()

                        // sum amount to current month day amount (monthAmount / 30)
                        amount += organization.costOfMonth[monthsShort[curItemMonth]] / 30
                    }
                }
                entryDate = new Date(item.date)
            }
            if (isGuestTariff && item.type === historyActionTypes.exit) {
                timeInPark += ((new Date(item.date) - entryDate) / 1000 / 60 / 60)
            }
        })

        amount = amount || timeInPark * (organization?.costOfHour || 0)

        return {
            _id,
            fullName,
            plateNumber: cars[0].plateNumber,
            timeInPark,
            timeInParkCeil: Math.ceil(timeInPark),
            amount,
            amountCeil: Math.ceil(amount),
        }
    })
}
export const getEmployeesReport = catchAsync(async (req, res, next) => {

    const resData = await getEmployeesReportFunc(req)
    res.send({
        status: "success",
        data: resData
    })
})

export const getEmployeesReportMiddleware = catchAsync(async (req, res, next) => {
    const resData = await getEmployeesReportFunc(req)
    req.data = resData
    next()
})



const employeesReportFileTitles = [
    {
        width: '30',
        text: "Ф.И.О"
    },
    {
        width: '20',
        text: "Автомобиль"
    },
    {
        width: '10',
        text: "время парковки"
    },
    {
        width: '10',
        text: "стоимость"
    },
    {
        width: '10',
        text: "время после округления"
    },
    {
        width: '20',
        text: "стоимость после округления"
    },
]
const employeesReportFileCols = [
    {
        width: '30',
        key: "fullName",
    },
    {
        width: '20',
        key: "plateNumber"
    },
    {
        width: '10',
        key: "timeInPark"
    },
    {
        width: '10',
        key: "timeInParkCeil"
    },
    {
        width: '10',
        key: "amount"
    },
    {
        width: '20',
        key: "amountCeil"
    },
]

const renderEmployeesReportFileData = (item) => ({
    ...item,
    fullName: formatFullName(item.fullName)
})

export const downloadEmployeesReportProps = [
    employeesReportFileTitles,
    employeesReportFileCols,
    renderEmployeesReportFileData,
    'tenant_report'
]
