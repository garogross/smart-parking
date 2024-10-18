import net from "net";
import { createHistoryFunc } from "../controllers/historyController.js";
import { historyActionTypes } from "../constants.js";

export const setTcpSocket = () => {
  const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
      console.log("socket data", data);
      const buffer = Buffer.from(data, "hex");
      const xml = buffer.toString("utf8");
      console.log({ xml });
      const plateStartTag = "<licensePlate>";
      const plateEndTag = "</licensePlate>";
      const plateStartIndex = xml.indexOf(plateStartTag);
      const plateEndIndex = xml.indexOf(plateEndTag);

      const ipAddressStartTag = "<ipAddress>";
      const ipAddressEndTag = "</ipAddress>";
      const ipAddressStartIndex = xml.indexOf(ipAddressStartTag);
      const ipAddressEndIndex = xml.indexOf(ipAddressEndTag);
      console.log({ plateStartIndex });
      console.log("date", new Date().toLocaleString());

      if (plateStartIndex === -1) return;
      const ipAddress = xml.slice(
        ipAddressStartIndex + ipAddressStartTag.length,
        ipAddressEndIndex
      );
      console.log({ ipAddress });
      const cameraTypes = {
        [process.env.ENTRY_CAMERA_IP]: historyActionTypes.entry,
        [process.env.EXIT_CAMERA_IP]: historyActionTypes.exit,
      };
      const resdata = {
        plateNumber: xml.slice(
          plateStartIndex + plateStartTag.length,
          plateEndIndex
        ),
        type: cameraTypes[ipAddress],
      };
      createHistoryFunc(resdata, true);
    });

    // Handle client disconnection
    socket.on("end", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (error) => {
      console.log("error", error);
    });
  });

  const PORT = 8090;
  const HOST = "192.168.1.41";
  server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
  });
};
