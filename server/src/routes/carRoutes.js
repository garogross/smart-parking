import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    createCar,
    deleteCar,
    getAllCar,
    getOneCar,
    updateCar
} from "../controllers/carController.js";
import {userRoles} from "../constants.js";

export const carRouter = express.Router()
const {admin,moderator,tenant} = userRoles

carRouter.use(protect)
carRouter.use(restrictTo(admin,moderator,tenant))

carRouter.get('/:id', getAllCar)
carRouter.post('/create', createCar)

carRouter
    .route('/:id')
    .get(getOneCar)
    .patch(updateCar)
    .delete(deleteCar)
