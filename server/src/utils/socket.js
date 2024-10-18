import { Server } from "socket.io";

export const createSocketServer = (server, onStart) => {
  const io = new Server(server, {
    cors: "http://localhost:3000",
    methods: ["GET", "POST"],
  });

  io.on("connection", (socket) => {
    if (onStart) onStart();
    // socket.on('disconnect', () => { });
  });
  return io;
};
