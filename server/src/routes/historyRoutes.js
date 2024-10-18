import express from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createHistory,
  disablePagination,
  downloadHistoryProps,
  getAllHistory,
  getAllHistoryMiddleware,
  getHistoryOfEmployee,
  historySocketTest,
} from "../controllers/historyController.js";
import { downloadFile } from "../utils/fileTemplates/downloadFile.js";
import { setReportDates } from "../controllers/employeeController.js";
import { userRoles } from "../constants.js";

export const historyRouter = express.Router();

historyRouter.post("/create", createHistory);
historyRouter.get("/socket", historySocketTest);
historyRouter.get(
  "/download/:format",
  disablePagination,
  getAllHistoryMiddleware,
  downloadFile(...downloadHistoryProps)
);

historyRouter.use(protect);
historyRouter.get("/", getAllHistory);
historyRouter.get("/:id", getAllHistory);
historyRouter.get(
  "/report/:id",
  restrictTo(userRoles.admin),
  setReportDates,
  getHistoryOfEmployee
);
