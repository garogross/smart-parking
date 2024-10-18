import {Car} from "../models/carModel.js";
import {HandlerFactory} from "./HandlerFactory.js";


const handleFactory = new HandlerFactory(Car, 'car')

export const createCar = handleFactory.create()
export const getAllCar = handleFactory.getAll()
export const getOneCar = handleFactory.getOne()
export const updateCar = handleFactory.updateOne()
export const deleteCar = handleFactory.deleteOne()
