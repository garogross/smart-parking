import dotenv from "dotenv";
import { createServer } from "http";
import mongoose from "mongoose";
import { app } from "./app.js";

import { createSocketServer } from "./src/utils/socket.js";

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  process.exit(1);
});

const isProduction = process.env.NODE_ENV;

const db = true
  ? process.env.DATABASE
  : process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
export let io = null;
console.log(db);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("db connected");
    // setTcpSocket();
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export const socketServer = createServer();
io = createSocketServer(() => console.log("socket started"));
socketServer.listen(4000, () => {
  console.log(`Socket.IO server running on port 4000`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
