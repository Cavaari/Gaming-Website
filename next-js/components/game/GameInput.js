import { useEffect, useState } from "react";
export default function GameInput({socket}){
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    
    const handleSend = ()=>{
        socket.emit("message", message)
        setMessage("")
    }

    
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