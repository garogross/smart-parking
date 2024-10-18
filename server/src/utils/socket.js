import { Server } from "socket.io";
import { socketServer } from "../../server.js";


export const createSocketServer = ( onStart) => {
  const io = new Server(socketServer, {
  cors: {
    origin: ["http://localhost:3000", "https://lk.npo-nauka.ru"],
  },
  serveClient: false
  });

  io.on("connection", (socket) => {
    console.log("New connection established:", socket.id);
    if (onStart) onStart();
    // socket.on('disconnect', () => { });
  });
  return io;
};

