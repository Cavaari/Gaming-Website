import { useEffect, useState } from "react";
import { io } from "socket.io-client";


// socket must be pinged once before server start up to be in listening state
const pingRoom = async () =>{
    await fetch("http://localhost:3000/api/socket")
}

// custom react hook needed for socket connection state
export default function useSocket(){
    const [socket, setSocket] = useState(null)
    // establishing a socket connection
    useEffect(()=>{
        pingRoom().then(()=>{
            const socket = io("http://localhost:3001");
        
            socket.on("connect", () => {
                console.log("Client Connected!");
            });

            socket.on("connect_error", (error) => {
                console.log(error.code)
            });

            setSocket(socket)
        })
        
        // clean the connection
        return () =>{
            if(socket){
                socket.disconnect();
            }
        }
    },[])

    return socket
}