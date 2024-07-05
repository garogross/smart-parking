import { Parking } from "../models/parkingModel.js";
import { HandlerFactory } from "./HandlerFactory.js";
import { Car } from "../models/carModel.js";
import { Employee } from "../models/employeeModel.js";
import { Tenant } from "../models/tenantModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import mongoose from "mongoose";
import { cntrlBareerGate } from "../utils/cntrlBareerGate.js";
import { createHistoryFunc } from "./historyController.js";
import { globalState, setPlateNumber } from "../state.js";
import { historyActionTypes } from "../constants.js";


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
        { [`car.owner.organization._id`]: new mongoose.Types.ObjectId(req.params.id) }
        : {}
)

export const getAllParking = handleFactory.getAll(populateOptions, filterParkingByOrganization)
export const getParkingMiddleware = handleFactory.getAll(
    populateOptions,
    filterParkingByOrganization,
    null,
    true
)


export const deleteParking = catchAsync(async (req, res, next) => {
    const data = req?.data
    if (!data) return next(new AppError('invalid parameters'))

    if (data.length) {
        await Tenant.findByIdAndUpdate(req.params.id, { inSiteCarCount: 0 })

        const employeeIds = data.map(item => item.car.owner._id)
        await Employee.updateMany({ _id: { $in: employeeIds } }, { isInPark: false })

        const deletingItems = data.map(item => item._id)
        await Parking.deleteMany({ _id: { $in: deletingItems } })
    }

    res.send({
        status: 'success',
    })
})


export const openBareer = catchAsync(async (req, res,next) => {
    if(!req.params.type || !Object.values(historyActionTypes).includes(req.params.type)) {
        return next(new AppError("invalid typeParams"))
    }
    const isExit = req.params.type === historyActionTypes.exit
    const data = {
        plateNumber: globalState[isExit ? "lastExitPlateNumber" : "lastEntryPlateNumber"],
        type: req.params.type
    }
    
    await createHistoryFunc(data)
    res.send({ status: "success" })
})

// ffmpeg -i rtsp://admin:Mos12cow@192.168.1.125:554/ISAPI/Streaming/Channels/101 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -hls_flags delete_segments -vcodec copy -y ./public/stream/index.m3u8

