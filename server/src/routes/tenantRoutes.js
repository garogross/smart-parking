import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    createTenant,
    deleteTenant,
    getAllTenant, getNameList, getOneTenant,
    updateTenant
} from "../controllers/tenantController.js";
import {userRoles} from "../constants.js";
import {setFullName} from "../controllers/userController.js";

export const tenantRouter = express.Router()

const {admin,moderator} = userRoles

tenantRouter.use(protect)
restrictTo(admin,moderator),

tenantRouter.get('/',
    getAllTenant
)

tenantRouter.get('/nameList',getNameList)

tenantRouter.post('/create',
    setFullName,
    createTenant,
    getAllTenant
)

tenantRouter
    .route('/:id')
    .get(getOneTenant)
    .delete(
        deleteTenant,
        getAllTenant
    )
    .patch(
        updateTenant,
        getAllTenant
    )

