import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";
import {monthsShort, tariffTypes} from "../constants.js";
import {Car} from "./carModel.js";
import {Employee} from "./employeeModel.js";
import {User} from "./userModel.js";

const costOfMonthsModels = monthsShort.reduce((acc,cur) => {
   acc[cur] = {
       type: Number,
       required: true,
       default: 0,
       validate: {
           validator: function(value) {
               if (this.tariff === tariffTypes.unLimit || this.tariff === tariffTypes.perMonth) {
                   return !!(value);
               }
               return true;
           },
           message: `Cost of ${cur} is required.`
       }
   }
   return acc
},{})

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "this Name is already used"],
        ...setRequiredProp('Name'),
    },
    allowedCarCount: {
        type: Number,
        ...setRequiredProp('allowed car count')
    },
    inSiteCarCount: {
        type: Number,
        ...setRequiredProp('in site car count'),
        default: 0,
    },
    address: {
        type: String,
    },
    tin: {
        type: String,
    },
    bic: {
        type: String,
    },
    bankName: {
        type: String,
    },
    checkingAccount: {
        type: String,
    },
    tariff: {
        type: String,
        ...setRequiredProp('tariff'),
        enum: Object.values(tariffTypes),
    },
    costOfTime: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator: function(value) {
                if (this.tariff === tariffTypes.Guest || this.tariff === tariffTypes.perHour) {
                    return !!(value);
                }
                return true;
            },
            message: `Cost of Hour is required.`
        }
    },
    costOfMonth: costOfMonthsModels,
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

tenantSchema.virtual('employees', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'organization'
})


tenantSchema.post('findOneAndDelete', async function () {
    try {
        const condition = {organization: this._conditions._id }
        const employees = await Employee.find(condition).populate("cars")
        if(employees.length) {
            const cars = employees.flatMap(item => item.cars).map(item => item._id)
            await Employee.deleteMany(condition);
            await Car.deleteMany({_id: {$in: cars}});
        }
        await User.deleteMany(condition)
    } catch (error) {
        console.error(error);
    }
});

export const Tenant = mongoose.model('Tenant',tenantSchema)
