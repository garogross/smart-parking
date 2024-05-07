import {Parking} from "../models/parkingModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {Car} from "../models/carModel.js";
import {Employee} from "../models/employeeModel.js";
import {Tenant} from "../models/tenantModel.js";
import {catchAsync} from "../utils/catchAsync.js";
import {AppError} from "../utils/appError.js";
import mongoose from "mongoose";


const handleFactory = new HandlerFactory(Parking, 'parking')

const populateOptions = [
    {
        localField: "car",
        from: Car.collection.name
    },
    {
        localField: "car.owner",
        from: Employee.collection.name
    },
    {
        localField: "car.owner.organization",
        from: Tenant.collection.name
    },
]

const filterParkingByOrganization = (req) => (
    req.params.id ?
        {[`car.owner.organization._id`]: new mongoose.Types.ObjectId(req.params.id)}
        : {}
)

export const getAllParking = handleFactory.getAll(populateOptions,filterParkingByOrganization)
export const getParkingMiddleware = handleFactory.getAll(
    populateOptions,
    filterParkingByOrganization,
    null,
    true
)


export const deleteParking = catchAsync(async (req, res, next) => {
    const data = req?.data
    if (!data) return next(new AppError('invalid parameters'))

    if(data.length) {
        await Tenant.findByIdAndUpdate(req.params.id,{inSiteCarCount: 0})

        const employeeIds = data.map(item => item.car.owner._id)
        await Employee.updateMany({_id: {$in: employeeIds}},{isInPark: false})

        const deletingItems = data.map(item => item._id)
        await Parking.deleteMany({_id: {$in: deletingItems}})
    }

    res.send({
        status: 'success',
    })
})
