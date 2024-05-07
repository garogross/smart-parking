import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    deleteParking,
    getAllParking, getParkingMiddleware,
} from "../controllers/parkingController.js";
import {userRoles} from "../constants.js";

export const parkingRouter = express.Router()
parkingRouter.use(protect)


parkingRouter.get('/', getAllParking)
parkingRouter.get('/:id', getAllParking)

parkingRouter.delete(
    '/:id',
    restrictTo(userRoles.admin),
    getParkingMiddleware,
    deleteParking
)