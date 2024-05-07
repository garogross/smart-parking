import {Employee} from "../models/employeeModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {catchAsync} from "../utils/catchAsync.js";
import {Car} from "../models/carModel.js";
import {AppError} from "../utils/appError.js";
import {Tenant} from "../models/tenantModel.js";
import mongoose from "mongoose";


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
export const deleteEmployee = catchAsync(async (req,res,next) => {
    const employee = await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
        return next(new AppError(`No Employee found with that id`, 404))
    }
    req.params.id = employee.organization

    next()
})

export const getOneEmployee = handleFactory.getOne('cars organization')