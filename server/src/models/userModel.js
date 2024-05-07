import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import validator from "validator";

import {setRequiredProp} from "../utils/setRequiredProp.js";
import {tariffTypes, userRoles} from "../constants.js"
import {AppError} from "../utils/appError.js";

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        ...setRequiredProp('full name')
    },
    username: {
        type: String,
        unique: [true, "this username is already used"],
        ...setRequiredProp('username')
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please write a correct email"]
    },
    phoneNumber: {
        type: String,
        ...setRequiredProp('patronymic')
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: "Tenant",
        required: function() {
            return this.role === userRoles.tenant;
        }
    },
    role: {
        type: String,
        ...setRequiredProp('role'),
        enum: Object.values(userRoles),
    },
    password: {
        type: String,
        select: false,
        ...setRequiredProp('Password'),
    },
    passwordConfirm : {
        type: String,
        ...setRequiredProp('password confirm'),
        validate: {
            validator: function(val) {
                const password = this.password || this._update.$set.password
                return val === password
            },
            message: 'Passwords are not equal'
        }
    },
})

// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    this.passwordConfirm = undefined
    next()
})


userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

export const User = mongoose.model('User', userSchema)