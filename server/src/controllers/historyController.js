import {History} from "../models/historyModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {Car} from "../models/carModel.js";
import {Employee} from "../models/employeeModel.js";
import {Tenant} from "../models/tenantModel.js";
import mongoose from "mongoose";
import {catchAsync} from "../utils/catchAsync.js";
import {DIRNAME, downloadFileFormats, historyActionTypes, historyStatusTypes} from "../constants.js";
import {AppError} from "../utils/appError.js";
import fs from "fs";
import path from "path";
import {fileTemplates} from "../utils/fileTemplates/fileTemplates.js";
import {formatDate} from "../utils/date.js";
import {formatFullName} from "../utils/formatFullName.js";


const handleFactory = new HandlerFactory(History, 'history')

const filterByOrganization = (req) => (
    req.params.id ?
        {[`car.owner.organization._id`]: new mongoose.Types.ObjectId(req.params.id)}
        : {}
)

export const createHistory = handleFactory.create()
export const getAllHistory = handleFactory.getAll(
    [
        {
            localField: "car",
            from: Car.collection.name
        },
        {
            localField: "car.owner",
            from: Employee.collection.name
        },
        {
            localField: "car.owner.organization",
            from: Tenant.collection.name
        },
    ],
    filterByOrganization
)

export const getAllHistoryMiddleware = handleFactory.getAll(
    [
        {
            localField: "car",
            from: Car.collection.name
        },
        {
            localField: "car.owner",
            from: Employee.collection.name
        },
        {
            localField: "car.owner.organization",
            from: Tenant.collection.name
        },
    ],
    filterByOrganization,
    null,
    true
)

export const disableHistoryPagination = catchAsync(async (req, res, next) => {
    req.query.page = 0
    next()
})

const historyFileTitles = [
    {
        width: '10.4',
        text: "СТАТУС"
    },
    {
        width: '23.37',
        text: "Арендатор"
    },
    {
        width: '17.81',
        text: "Сотрудник"
    },
    {
        width: '12.78',
        text: "Номер машины"
    },
    {
        width: '12.99',
        text: "Модель автомобиля"
    },
    {
        width: '16.38',
        text: "Дата"
    },
    {
        width: '6.23',
        text: "#"
    },
]
const historyFileCols = [
    {
        style: item => ({
            'background-color': item.status === historyStatusTypes.exist ? 'green' : 'red',
            color: '#fff'
        }),
        key: "status",
    },
    {
        width: '23.37',
        key: "organization"
    },
    {
        width: '17.81',
        key: "fullName"
    },
    {
        width: '12.78',
        key: "plateNumber"
    },
    {
        width: '12.99',
        key: "model"
    },
    {
        width: '16.38',
        key: "date"
    },
    {
        width: '6.23',
        key: "type",
        style: item => ({
            'background-color': item.type === historyActionTypes.entry ? 'green' : 'yellow',
            color: '#fff'
        }),
    },
]

const renderHistoryFileData = ({car, plateNumber, date, type}) => ({
    status: car._id ? historyStatusTypes.exist : historyStatusTypes.notExist,
    organization: car?.owner.organization?.name || "",
    fullName: formatFullName(car.owner?.fullName) || "",
    plateNumber,
    model: car?.model || "",
    date: formatDate(date),
    type,
})

export const downloadHistoryProps = [
    historyFileTitles,
    historyFileCols,
    renderHistoryFileData,
    'history'
]