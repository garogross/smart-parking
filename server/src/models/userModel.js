import mongoose from "mongoose";
import bcrypt from "bcryptjs"

import {setRequiredProp} from "../utils/setRequiredProp.js";
import {userRoles} from "../constants.js"

export const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        ...setRequiredProp('full name')
    },
    username: {
        type: String,
        unique: [true, "this username is already used"],
        required: [true, "username is required"],
        ...setRequiredProp('full name')
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.employee
    },
    password: {
        type: String,
        select: false,
        ...setRequiredProp('Password')
    },
    profession: String
})

// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.comparePassword = async function (candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword,userPassword)
}

export const User = mongoose.model('User', userSchema)