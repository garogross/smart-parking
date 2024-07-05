import express from "express";
import {protect, restrictTo} from "../controllers/authController.js";
import {
    createTenant,
    deleteTenant, downloadReportProps,
    getAllTenant, getAllTenantMiddleware, getNameList, getOneTenant,
    updateTenant
} from "../controllers/tenantController.js";
import {userRoles} from "../constants.js";
import {setFullName} from "../controllers/userController.js";
import {
     disablePagination,
} from "../controllers/historyController.js";
import {downloadFile} from "../utils/fileTemplates/downloadFile.js";

export const tenantRouter = express.Router()

const {admin,moderator} = userRoles


tenantRouter.get(
    '/report/download/:format',
    disablePagination,
    getAllTenantMiddleware,
    downloadFile(...downloadReportProps),
)

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

