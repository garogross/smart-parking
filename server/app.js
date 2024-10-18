import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import hpp from "hpp";

import { globalErrorHandler } from "./src/controllers/errorController.js";
import { AppError } from "./src/utils/appError.js";

// ROUTES1
import bodyParser from "body-parser";
import { carRouter } from "./src/routes/carRoutes.js";
import { employeeRouter } from "./src/routes/employeeRoutes.js";
import { historyRouter } from "./src/routes/historyRoutes.js";
import { parkingRouter } from "./src/routes/parkingRoutes.js";
import { tenantRouter } from "./src/routes/tenantRoutes.js";
import { userRouter } from "./src/routes/userRoutes.js";

export const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

// add headers for secure

app.use(helmet());

app.use(bodyParser.text({ type: "/" }));

// save as json
app.use(express.json({ limit: "150mb" }));

// limit requests
const limiter = rateLimit({
  skip: () => false, // or add your own logic for skipping rate limiting
  max: 100,
  windowMs: 60 * 60 * 100000000,
  message: "Too many requests from this IP, please try again in an hour",
});

// app.use(multer({ storage : multerStorage}).fields([{name:'files[]',maxCount:20}]));

app.set("trust proxy", 1);
app.use("/api", limiter);

// disable queries in json
app.use(mongoSanitize());

// disabling html sending
app.use(xss());

// prevent multiple parameters
app.use(
  hpp({
    whitelist: [],
  })
);

app.use("/api", express.static("public"));

// ROUTES2
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/parking", parkingRouter);
app.use("/api/v1/tenants", tenantRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/employees", employeeRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in this server`, 404));
  app.use(globalErrorHandler);
});
