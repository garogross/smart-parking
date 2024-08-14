import dotenv from "dotenv";
import {app} from "./app.js";
import mongoose from "mongoose";
import { Server } from "socket.io";


import {setTcpSocket} from "./src/utils/tcpSocket.js"
import { createSocketServer } from "./src/utils/socket.js";

dotenv.config({path: './config.env'})

process.on('uncaughtException', (err) => {
    process.exit(1)
})

const isProduction = process.env.NODE_ENV

const db = process.env.DATABASE
export let io = null;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((con) => {
    console.log('db connected')
    // setTcpSocket()
}).catch(err => console.log(err))

const port = process.env.PORT || 5000


const server = app.listen(port,'0.0.0.0', () => {
    console.log(`App is running on port ${port}`)
    io = createSocketServer(server, () => console.log("socket started"));
})


process.on('unhandledRejection', (err) => {
    server.close(() => {
        process.exit(1)
    })
})
