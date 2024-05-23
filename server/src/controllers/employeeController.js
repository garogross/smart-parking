import mongoose from "mongoose";
import {HandlerFactory} from "./HandlerFactory.js";
import {AppError} from "../utils/appError.js";
import {catchAsync} from "../utils/catchAsync.js";

import {Employee} from "../models/employeeModel.js";
import {Car} from "../models/carModel.js";
import {History} from "../models/historyModel.js";
import {Tenant} from "../models/tenantModel.js";
import {historyActionTypes} from "../constants.js";


const handleFactory = new HandlerFactory(Employee, 'employee')

const checkAllowedCarsCount = async (tenantId, carsLength) => {
    const tenant = await Tenant
        .findById(tenantId)
        .populate({
            path: 'employees',
            populate: {path: 'cars'} // Populate the cars of each employee
        })

    if (!tenant) throw new AppError('invalid organization')

    const carCount = tenant.employees.reduce((acc, cur) => {
        acc += cur.cars.length
        return acc
    }, 0)

    if (carCount + carsLength > tenant.allowedCarCount) {
        throw new AppError(`your allowed car count is ${tenant.allowedCarCount}`, 400, {cars: '1'})
    }
}

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

export const setEmployeesReportDates = catchAsync(async (req, res, next) => {
    const {dateFrom, dateTo} = req.query

    const lastMonthStartDate = new Date()
    lastMonthStartDate.setDate(1)

    req.dates = {
        from: dateFrom || lastMonthStartDate,
        to: dateTo || new Date()
    }
    if (dateFrom) delete req.query.dateFrom
    if (dateTo) delete req.query.dateTo
    next()

})

export const createEmployee = (catchAsync(async (req, res, next) => {
    const {cars, ...employeeData} = req.body

    try {
        await checkAllowedCarsCount(employeeData.organization, cars.length)
    } catch (err) {
        return next(err)
    }
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

    if (cars?.length) {
        try {
            await checkAllowedCarsCount(employee.organization, newCars.length)
        } catch (err) {
            return next(err)
        }
    }


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

export const getEmployeesReport = catchAsync(async (req, res, next) => {
    if (!req.data) return new AppError('no data')
    const cars = req.data.flatMap(item => item.cars.map(car => car.plateNumber))
    const history = await History.find({
        date: {
            "$gte": req.dates.from,
            "$lte": req.dates.to,
        },
        plateNumber: {"$in": cars}
    }).sort('date')
    const resData = req.data.map(({fullName, cars}) => {
        const curHistory = history
            .filter(item => cars.map(car => car.plateNumber).includes(item.plateNumber))

        let hoursInPark = 0
        let entryDate = new Date(req.dates.from)

        curHistory.forEach(item => {
            if(item.type === historyActionTypes.entry) entryDate = new Date(item.date)
            if(item.type === historyActionTypes.exit) {
                hoursInPark +=  (new Date(item.date) - entryDate)/1000/60/60
            }
        })

        return {
            // fullName,
            // cars,
            hoursInPark
        }
    })

    res.send({resData,cars,history})
})