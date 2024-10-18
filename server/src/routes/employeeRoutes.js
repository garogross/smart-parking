import express from "express";
import { userRoles } from "../constants.js";
import { protect, restrictTo } from "../controllers/authController.js";
import {
  createEmployee,
  deleteEmployee,
  downloadEmployeesReportProps,
  getAllEmployee,
  getAllEmployeeMiddleware,
  getEmployeesReport,
  getEmployeesReportMiddleware,
  getOneEmployee,
  setReportDates,
  updateEmployee,
} from "../controllers/employeeController.js";
import { setFullName } from "../controllers/userController.js";
// import {disablePagination} from "../controllers/historyController.js";
import { downloadFile } from "../utils/fileTemplates/downloadFile.js";

export const employeeRouter = express.Router();

employeeRouter.get(
  "/report/download/:id/:format",
  // disablePagination,
  setReportDates,
  getAllEmployeeMiddleware,
  getEmployeesReportMiddleware,
  downloadFile(...downloadEmployeesReportProps)
);

employeeRouter.use(protect);

const { tenant, admin, moderator } = userRoles;
employeeRouter.use(restrictTo(tenant, admin, moderator));

employeeRouter.post("/create", setFullName, createEmployee, getAllEmployee);

employeeRouter
  .route("/:id")
  .get(getAllEmployee)
  .patch(setFullName, updateEmployee, getAllEmployee)
  .delete(deleteEmployee, getAllEmployee);

employeeRouter.get("/getOne/:id", getOneEmployee);

employeeRouter.get(
  "/report/:id",
  restrictTo(admin),
  setReportDates,
  getAllEmployeeMiddleware,
  getEmployeesReport
);
