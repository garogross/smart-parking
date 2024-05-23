import {Tenant} from "../models/tenantModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {catchAsync} from "../utils/catchAsync.js";
import {userRoles} from "../constants.js";
import {User} from "../models/userModel.js";


const handleFactory = new HandlerFactory(Tenant, 'tenant')

export const createTenant = catchAsync(async (req, res, next) => {
    const tenantProps = [
        "name",
        "allowedCarCount",
        "address",
        "tin",
        "bic",
        "bankName",
        "checkingAccount",
        "tariff",
        "tariff",
        "tariff",
        "costOfTime",
        "costOfMonth",
    ]

    const userProps = [
        "fullName",
        "username",
        "email",
        "phoneNumber",
        "password",
        "passwordConfirm",
    ]

    const filterBody = (props) => {
        return props.reduce((acc, cur) => {
            acc[cur] = req.body[cur]
            return acc
        }, {})
    }

    const tenant = await Tenant.create(filterBody(tenantProps))

    try {
        await User.create({
            ...filterBody(userProps, next),
            role: userRoles.tenant,
            organization: tenant._id
        })
    } catch (err) {
        await Tenant.findByIdAndDelete(tenant._id)
        next(err)
    }
   next()
})
export const getAllTenant = handleFactory.getAll()

export const getNameList = catchAsync(async (req,res,next) => {
    const data = await Tenant.find().select('name')

    res.send({
        status: "success",
        data
    })
})
export const updateTenant = handleFactory.updateOne(true)
export const deleteTenant = handleFactory.deleteOne(true)

export const getOneTenant = handleFactory.getOne()