import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    createEmployee,
    deleteEmployee,
    getAllEmployee, getOneEmployee,
    updateEmployee
} from "../controllers/employeeController.js";
import {userRoles} from "../constants.js";
import {setFullName} from "../controllers/userController.js";

export const employeeRouter = express.Router()
employeeRouter.use(protect)

const {tenant,admin,moderator} = userRoles
employeeRouter.use(restrictTo(tenant,admin,moderator))


employeeRouter.post(
    '/create',
    setFullName,
    createEmployee,
    getAllEmployee
)

employeeRouter
    .route('/:id')
    .get(getAllEmployee)
    .patch(setFullName,updateEmployee, getAllEmployee)
    .delete(deleteEmployee, getAllEmployee)

employeeRouter.get('/getOne/:id', getOneEmployee)



