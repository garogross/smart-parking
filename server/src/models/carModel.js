import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const carSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        unique: [true, "this plate number is already used"],
        ...setRequiredProp('plate number')
    },
    model: {
        type: String,
    },
    color: {
        type: String,
    },
    vin: {
        type: String,
    },
    passFrom: {
        type: Date,
        ...setRequiredProp('pass from')
    },
    passTo: {
        type: Date,
        ...setRequiredProp('pass to')
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee",
        ...setRequiredProp('owner')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const Car = mongoose.model('Car',carSchema)
