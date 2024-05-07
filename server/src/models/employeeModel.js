import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";
import {Car} from "./carModel.js";
import {Tenant} from "./tenantModel.js";

const employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        ...setRequiredProp('full name')
    },
    phoneNumber: {
        type: String,
        ...setRequiredProp('patronymic')
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: "Tenant",
        ...setRequiredProp('organization')
    },
    isInPark: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

employeeSchema.virtual('cars', {
    ref: 'Car',
    localField: '_id',
    foreignField: 'owner'
})


employeeSchema.post('findOneAndDelete', async function () {
    try {
        await Car.deleteMany({owner: this._conditions._id});
    } catch (error) {
        console.error(error);
    }
});


export const Employee = mongoose.model('Employee', employeeSchema)
