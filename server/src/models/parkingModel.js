import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const parkingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.ObjectId,
        ref: "Car",
    },
    plateNumber: {
        type: String,
        unique: [true,'this plate number already exist'],
        ...setRequiredProp('plate number')
    },
    entryDate: {
        type: Date,
        ...setRequiredProp('entry date')
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


parkingSchema.pre('save',function (next) {
    this.entryDate = Date.now()
    next()
})

export const Parking = mongoose.model('Parking',parkingSchema)
