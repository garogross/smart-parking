import mongoose from "mongoose";
import { Car } from "../models/carModel.js";
import { History } from "../models/historyModel.js";
import { HandlerFactory } from "./HandlerFactory.js";

import { io } from "../../server.js";
import { historyActionTypes, historyStatusTypes } from "../constants.js";
import { setPlateNumber } from "../state.js";
import { catchAsync } from "../utils/catchAsync.js";
import { formatDate } from "../utils/date.js";
import { formatFullName } from "../utils/formatFullName.js";
import { translateToRussian } from "../utils/translateToRussian.js";

const handleFactory = new HandlerFactory(History, "history");

const filterByOrganization = (req) =>
  req.params.id
    ? {
        [`organization`]: new mongoose.Types.ObjectId(req.params.id),
      }
    : {};

// export const createHistory = catchAsync(async function (req, res) {
//   const reqData = req.body.map((item) => ({
//     car: item?.car?._id,
//     organization: item.car.owner?.organization,
//     date: item.date,
//     type: item.type,
//     plateNumber: item.plateNumber,
//     carModel: item.car.model,
//     organizationName: item.car.owner?.organization?.name,
//     employeeFullName: item.car.owner?.fullName,
//   }));
//   const newDoc = await History.create(reqData);
//   res.send({
//     status: "success",
//     data: newDoc,
//   });
// });

export const createHistory = catchAsync(async (req, res, next) => {
  console.log("createHistory");
  await createHistoryFunc(req.body, true);
  res.send({ status: "success" });
});

export const historySocketTest = catchAsync(async (req, res) => {
  getHistorySocket();
  res.send({ status: "success" });
});

export const getHistorySocket = async () => {
  try {
    const pageSize = +process.env.PAGE_LIMIT;
    const total = await History.countDocuments();
    const data = await History.find().sort({ date: -1 }).limit(pageSize);
    io.emit(`history-update`, {
      data: {
        status: "success",
        result: data.length,
        data,
        totalCount: total,
      },
    });
  } catch (error) {
    console.log(`Socket error`, error);
  }
};

export const createHistoryFunc = async (data, verify) => {
  try {
    const isExit = data.type === historyActionTypes.exit;
    setPlateNumber(data.plateNumber, isExit);
    const car = await Car.findOne({
      $or: [
        { plateNumber: data.plateNumber },
        { plateNumber: translateToRussian(data.plateNumber) },
      ],
    }).populate({
      path: "owner",
      populate: { path: "organization" }, // Populate the cars of each employee
    });
    if (verify && data.type === historyActionTypes.entry) {
      if (!car) return;
      const { organization } = car.owner;
      if (
        new Date(car.passFrom) > new Date() ||
        new Date(car.passTo) < new Date()
      ) {
        console.log(`validate of car has expired`);
        return;
      }

      if (new Date(organization.validate) < new Date()) {
        console.log(`validate of ${organization.name} has expired`);
        return;
      }

      if (organization.inSiteCarCount >= organization.allowedCarCount) {
        console.log(`allowed car count of ${organization.name} has filled`);
        return;
      }
    }
    console.log("cntrlBareerGate");
    // await cntrlBareerGate(isExit);
    if (!data.plateNumber) return;
    console.log("History.create");
    await History.create({
      ...data,
      plateNumber: car?.plateNumber ? car.plateNumber : data.plateNumber,
    });
  } catch (e) {
    console.log("createHistory Error", e);
  }
};

export const getAllHistory = handleFactory.getAll(null, filterByOrganization);

export const getAllHistoryMiddleware = handleFactory.getAll(
  null,
  filterByOrganization,
  null,
  true
);

export const getHistoryOfEmployee = handleFactory.getAll(
  [
    {
      localField: "car",
      from: Car.collection.name,
    },
  ],
  (req) => ({
    [`car.owner`]: new mongoose.Types.ObjectId(req.params.id),
    date: {
      $gte: req.dates.from,
      $lte: req.dates.to,
    },
  }),
  {
    "car.vin": 0,
    "car.color": 0,
    "car.plateNumber": 0,
    "car.model": 0,
    "car.passFrom": 0,
    "car.passTo": 0,
    organization: 0,
    plateNumber: 0,
    organizationName: 0,
    employeeFullName: 0,
    carModel: 0,
  }
);

export const disablePagination = catchAsync(async (req, res, next) => {
  req.query.page = 0;
  next();
});

const historyFileTitles = [
  {
    width: "10.4",
    text: "СТАТУС",
  },
  {
    width: "23.37",
    text: "Арендатор",
  },
  {
    width: "17.81",
    text: "Сотрудник",
  },
  {
    width: "12.78",
    text: "Номер машины",
  },
  {
    width: "12.99",
    text: "Модель автомобиля",
  },
  {
    width: "16.38",
    text: "Дата",
  },
  {
    width: "6.23",
    text: "#",
  },
];
const historyFileCols = [
  {
    style: (item) => ({
      "background-color":
        item.status === historyStatusTypes.exist ? "green" : "red",
      color: "#fff",
    }),
    key: "status",
  },
  {
    width: "23.37",
    key: "organization",
  },
  {
    width: "17.81",
    key: "fullName",
  },
  {
    width: "12.78",
    key: "plateNumber",
  },
  {
    width: "12.99",
    key: "model",
  },
  {
    width: "16.38",
    key: "date",
  },
  {
    width: "6.23",
    key: "type",
    style: (item) => ({
      "background-color":
        item.type === historyActionTypes.entry ? "green" : "yellow",
      color: "#fff",
    }),
  },
];

const renderHistoryFileData = ({ car, plateNumber, date, type }) => ({
  status: car._id ? historyStatusTypes.exist : historyStatusTypes.notExist,
  organization: car?.owner.organization?.name || "",
  fullName: formatFullName(car.owner?.fullName) || "",
  plateNumber,
  model: car?.model || "",
  date: formatDate(date),
  type,
});

export const downloadHistoryProps = [
  historyFileTitles,
  historyFileCols,
  renderHistoryFileData,
  "history",
];
