import { useCallback, useEffect, useState } from "react";
export default function GameInput({socket, room, isJoined}){
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    
    // send message to the room
    const handleSend = useCallback(()=>{
        if (isJoined){
            socket.emit("message", {text: message, room: room})
            setMessage("")
        }
    },[isJoined, message])
    

    // recive messages from the room
    useEffect(()=>{
        if(socket){
            socket.on('new_msg', (message) => {
                setMessages([...messages, message])
            });
        }
    },[socket, messages])

    return(
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