"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

  
export default function CustomSocket(){
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        const socket = io("http://localhost:3000", {path: "/api/socket", transports: ['websocket']});

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

        return () =>{
            socket.disconnect();
        }
    },[])
    
    const handleSend = ()=>{
        socket.emit("message", message)
        setMessage("")
    }

    return (
        <div className="d-flex">
            <input value={message} onChange={()=>{setMessage(event.target.value)}} className="form-control me-2" type="text" />
            <button onClick={handleSend} className="btn btn-success">Send</button>
        </div>
    )
}