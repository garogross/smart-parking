import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";
import {historyActionTypes} from "../constants.js";
import {Parking} from "./parkingModel.js";
import {Car} from "./carModel.js";
import {Tenant} from "./tenantModel.js";
import {Employee} from "./employeeModel.js";

const historySchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.ObjectId,
        ref: "Car",
    },
    date: {
        type: Date,
    },
    type: {
        type: String,
        enum: Object.values(historyActionTypes),
        ...setRequiredProp('type')
    },
    plateNumber: {
        type: String,
        ...setRequiredProp('car number'),
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

historySchema.pre('save', async function (next) {
    const now = Date.now()
    this.date = now
    const { plateNumber, type} = this
    const car = await Car.findOne({plateNumber}).populate({
        path: 'owner',
        populate: {path: 'organization'} // Populate the cars of each employee
    })
    const carId = car?._id || null

    console.log({plateNumber,car})
    this.car = carId
    const isEntry = type === historyActionTypes.entry
    
    if (isEntry) {
        const data = {
            car: carId || null,
            plateNumber,
            entryDate: now
        }
        await Parking.create(data)

    } else {
        await Parking.findOneAndDelete(plateNumber)
    }
    if (car) {
        const {organization} = car.owner
        const sum = isEntry ? 1 : -1
        const inSiteCarCount = organization.inSiteCarCount
        if (inSiteCarCount || (!inSiteCarCount && sum === 1)) {
            await Tenant.findByIdAndUpdate(organization._id, {inSiteCarCount: inSiteCarCount + sum})
        }
        if (car.owner.isInPark !== isEntry) {
            await Employee.findByIdAndUpdate(car.owner._id, {isInPark: isEntry})
        }
    }

})

export const History = mongoose.model('History', historySchema)
