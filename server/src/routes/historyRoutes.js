import express from "express";
import {protect} from "../controllers/authController.js";
import {
    createHistory,
    disableHistoryPagination, downloadHistoryProps,
    getAllHistory,
    getAllHistoryMiddleware,
} from "../controllers/historyController.js";
import {downloadFile} from "../utils/fileTemplates/downloadFile.js";

export const historyRouter = express.Router()

historyRouter.post('/create', createHistory)
historyRouter.get(
    '/download/:format',
    disableHistoryPagination,
    getAllHistoryMiddleware,
    downloadFile(...downloadHistoryProps),
)

historyRouter.use(protect)
historyRouter.get('/', getAllHistory)
historyRouter.get('/:id', getAllHistory)

