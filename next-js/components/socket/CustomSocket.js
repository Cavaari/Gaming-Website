import { useEffect } from "react";
import { io } from "socket.io-client";

// component needed for importing socket connection state into the page
export default function CustomSocket({setSocket}){
    // establishing a socket connection
    useEffect(()=>{
        const socket = io("http://localhost:3001");
        
        socket.on("connect", () => {
            console.log("Client Connected!");
        });

        socket.on('message', (message) => {
            console.log(message);
        });

        socket.on("connect_error", (error) => {
            console.log(error.code)
        });

        setSocket(socket)

        // clean the connection
        return () =>{
            socket.disconnect();
        }
    },[setSocket])


    return null
}