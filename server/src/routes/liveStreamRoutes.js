import express from "express";
import {getLiveStream} from "../controllers/liveStreamController.js";

export const liveStreamRouter = express.Router()

liveStreamRouter.get('/',getLiveStream)