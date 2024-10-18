import mongoose from "mongoose";
import { historyActionTypes } from "../constants.js";
import { setRequiredProp } from "../utils/setRequiredProp.js";
import { translateToRussian } from "../utils/translateToRussian.js";
import { Car } from "./carModel.js";

const historySchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.ObjectId,
      ref: "Car",
    },
    organization: {
      type: mongoose.Schema.ObjectId,
      ref: "Tenant",
    },
    date: {
      type: Date,
    },
    type: {
      type: String,
      enum: Object.values(historyActionTypes),
      ...setRequiredProp("type"),
    },
    plateNumber: {
      type: String,
      ...setRequiredProp("car number"),
    },
    carModel: {
      type: String,
    },
    organizationName: {
      type: String,
    },
    employeeFullName: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

historySchema.pre("save", async function (next) {
  // set date
  const now = Date.now();
  this.date = now;

  const { plateNumber, type } = this;

  // set car by plateNumber
  const car = await Car.findOne({
    $or: [{ plateNumber }, { plateNumber: translateToRussian(plateNumber) }],
  }).populate({
    path: "owner",
    populate: { path: "organization" }, // Populate the cars of each employee
  });
  const carId = car?._id || null;
  this.car = carId;

  if (car) {
    this.organization = car.owner?.organization?._id;
    this.carModel = car.model;
    this.organizationName = car.owner?.organization?.name;
    this.employeeFullName = car.owner.fullName;
  }
  const isEntry = type === historyActionTypes.entry;

  // update parking
  // const parking = await Parking.findOne({
  //   plateNumber: car?.plateNumber || plateNumber,
  // });
  // if (isEntry) {
  //   const data = {
  //     car: carId || null,
  //     plateNumber,
  //     entryDate: now,
  //   };

  //   if (!parking) await Parking.create(data);
  // } else {
  //   if (parking) await Parking.findOneAndDelete(plateNumber);
  // }

  if (car && car?.owner) {
    // update Tenant (inSiteCarCount) and Employee (isInPark)
    // const { organization } = car.owner;
    // const sum = isEntry ? 1 : -1;
    // const inSiteCarCount = organization?.inSiteCarCount;
    // if (inSiteCarCount || (!inSiteCarCount && sum === 1)) {
    //   await Tenant.findByIdAndUpdate(organization._id, {
    //     inSiteCarCount: inSiteCarCount + sum,
    //   });
    // }
    // if (car.owner.isInPark !== isEntry) {
    //   await Employee.findByIdAndUpdate(car.owner._id, { isInPark: isEntry });
    // }
    // if (!isEntry && organization.tariff === tariffTypes.guest) {
    //   car.remove();
    //   await car.save()
    // }
  }
});

// historySchema.post("save", async function (next) {
//   getHistorySocket();
// });

export const History = mongoose.model("History", historySchema);
