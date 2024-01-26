import { createServer } from "http";
import { Server } from "socket.io";


// creating route at /api/socket
export default function SocketHandler (req, res)  {
    // launching socket server
    if (res.socket.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Socket is initializing')

      // socket server config
      const httpServer = createServer();
      const io = new Server(httpServer, {
        cors:{
          origin: "*"
        }
      });
      
      // socket.io framework config
      io.on("connection", (socket) => {
        console.log("Client is Here: " + socket.id);

        socket.join("test room");

        socket.on("message", (message) => {
          io.to("test room").emit("new_msg", message);
        });

        socket.on("disconnect", () => {
          console.log("Client is Out: " + socket.id);
        });
      });

      

      httpServer.listen(3001, () =>{
        console.log("Socket Server Started!");
      });


      res.socket.server.io = io
    }
    res.end()
  }
  
