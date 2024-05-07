import jwt from "jsonwebtoken"

import {User} from "../models/userModel.js";
import {HandlerFactory} from "./HandlerFactory.js";

import {AppError} from "../utils/appError.js";
import {catchAsync} from "../utils/catchAsync.js";

import {userRoles} from "../constants.js";
import mongoose from "mongoose";
import {Tenant} from "../models/tenantModel.js";


const handlerFactory = new HandlerFactory(User, 'user')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const createAndSendToken = (user, res, statusCode = 200) => {
    const token = signToken(user._id)

    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        user,
        token
    })
}

export const setFullName = catchAsync(async (req, res, next) => {
    const {firstName, lastName, patronymic} = req.body

    if (!firstName) {
        return next(new AppError('first name is required', 400, {firstName: "1"}))
    }
    if (!lastName) {
        return next(new AppError('lastname is required', 400, {lastName: "1"}))
    }
    req.body.fullName = `${firstName}**${lastName}${patronymic ? '**' + patronymic : ""}`
    next()
})


export const signUp = catchAsync(async (req, res, next) => {
    await User.create(req.body)

    next()
})

export const login = catchAsync(async (req, res, next) => {
    const {username, password} = req.body

    if (!username || !password) {
        return next(new AppError('Пожалуйста, укажите username или пароль', 400, {username: {}}))
    }

    const user = await User.findOne({
        username: {
            $regex: new RegExp(`^${username}$`, 'i')
        }
    }).select('+password')

    if (!user) {
        return next(new AppError('Неверный username', 401, {username: {}}))
    }
    const isPasswordCorrect = await user.correctPassword(password, user.password)

    if (!isPasswordCorrect) {
        return next(new AppError('Неверный пароль', 401, {password: {}}))
    }

    createAndSendToken(user, res)

})


export const getAllUsers = handlerFactory.getAll([
    {
        localField: "organization",
        from: Tenant.collection.name
    }
],
    (req) => ({'_id': {$ne: new mongoose.Types.ObjectId(req.user._id)}}),
    {password: 0}
)


export const deleteUser = handlerFactory.deleteOne(true)

export const changePassword = catchAsync(async (req,res,next) => {
    const {password,passwordConfirm} = req.body
    if(!password && !passwordConfirm) return next()
    if(password !== passwordConfirm) {
        return next(new AppError('password are not equal', 400,{passwordConfirm: "1",password: '1'}))
    }

    const user = await User.findById(req.params.id || req.user.id).select("+password")



    user.password = password
    await user.save()

    if(req.params.id) {
        return next()
    } else {
        res.send({
            status: 'success',
            data: user
        })
    }
})
export const updateUser = handlerFactory.updateOne(true)
export const getOneUser = handlerFactory.getOne('organization')
export const updateProfile = handlerFactory.updateOne(true)