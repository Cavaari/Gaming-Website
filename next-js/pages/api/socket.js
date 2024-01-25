import { NextResponse } from "next/server"
import { Server } from "socket.io";


export default function SocketHandler (req, res)  {
    if (res.socket.server.io) {
      console.log('Socket is already running')
    } else {
      console.log('Socket is initializing')
      const io = new Server(res.socket.server)

      io.on("connection", (socket) => {
        console.log("Client Connected!");

        socket.on('message', (message) => {
            io.emit('message', message);
        });

        io.engine.on("connection_error", (err) => {
          console.log(err.req);      // the request object
          console.log(err.code);     // the error code, for example 1
          console.log(err.message);  // the error message, for example "Session ID unknown"
          console.log(err.context);  // some additional error context
        });

        // Clean up the socket on disconnect
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id} disconnected.`);
        });
      });
      
      res.socket.server.io = io
    }
    res.end()
  }
  
