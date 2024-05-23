import dotenv from "dotenv";
import {app} from "./app.js";
import mongoose from "mongoose";

import {setTcpSocket} from "./src/utils/tcpSocket.js"

dotenv.config({path: './config.env'})

process.on('uncaughtException', (err) => {
    process.exit(1)
})

const isProduction = process.env.NODE_ENV

const db = !isProduction ? process.env.DATABASE_LOCAL : process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((con) => {
    console.log('db connected')
    // setTcpSocket()
}).catch(err => console.log(err))

const port = process.env.PORT || 5000


const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})


process.on('unhandledRejection', (err) => {
    server.close(() => {
        process.exit(1)
    })
})
