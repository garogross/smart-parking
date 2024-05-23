import net from "net"
import { createHistoryFunc } from "../controllers/historyController.js";
import { historyActionTypes } from "../constants.js";

export const setTcpSocket = () => {
  const server = net.createServer((socket) => {
    console.log('Client connected');
  
    socket.on('data', (data) => {
      const buffer = Buffer.from(data,'utf8')
      const xml = buffer.toString('utf8');
  
      console.log('xmlString',xml)
      const plateStartTag = '<licensePlate>'
      const plateEndTag = '</licensePlate>'
      const plateStartIndex = xml.indexOf(plateStartTag)
      const plateEndIndex = xml.indexOf(plateEndTag)
  
      if(plateStartIndex === -1) return;
  
      console.log('licensePlate',xml.slice(plateStartIndex + plateStartTag.length,plateEndIndex));
      const resdata = {
        plateNumber: xml.slice(plateStartIndex + plateStartTag.length,plateEndIndex),
        type: historyActionTypes.entry
      }
      createHistoryFunc(resdata)
  
    });
  
    // Handle client disconnection
    socket.on('end', () => {
      console.log('Client disconnected');
    });
  });
  
  const PORT = 8090;
  const HOST = '192.168.1.41'
  console.log("setTcpSocket",server)
  server.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
  });
}


