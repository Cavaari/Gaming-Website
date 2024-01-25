"use client"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

  
export default function CustomSocket(){
    const [message, setMessage] = useState("")
    const [socket, setSocket] = useState(null)
    
    const [messages, setMessages] = useState([])
    
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

        return () =>{
            socket.disconnect();
        }
    },[])


    useEffect(()=>{
        if(socket){
            socket.on('new_msg', (message) => {
                setMessages([...messages, message])
            });
        }
    },[socket, messages])
    
    const handleSend = ()=>{
        socket.emit("message", message)
        setMessage("")
    }



    return (
        <>
            <div>
                {
                    messages.map((msg, index)=>
                        <p className="text-white" key={index}>{msg}</p>
                    )
                }
            </div>
            <div className="d-flex">
                <input value={message} onChange={()=>{setMessage(event.target.value)}} className="form-control me-2" type="text" />
                <button onClick={handleSend} className="btn btn-success">Send</button>
            </div>
        </>
        
    )
}