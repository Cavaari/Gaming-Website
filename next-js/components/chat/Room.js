import { useState } from "react";
import ChatInput from "./ChatInput";
export default function Room({socket}){

    const [room, setRoom] = useState("")
    const [isJoined, setIsJoined] = useState(false)

    
    // join a socket room message
    const handleSelect = ()=>{
        socket.emit("join_chat", room)
        setIsJoined(true)
    }

    return(
        <div className="p-5 new-section bg-third d-flex flex-column align-items-center justify-content-end">  
            {   isJoined &&
                <>
                    <div className="mb-auto text-center">
                        <h2 className="text-white">Room: {room}</h2>
                        <h2 className="text-white">Client: {new Date().valueOf()}</h2>
                    </div>
                    <ChatInput socket={socket} room={room} isJoined={isJoined}/> 
                </>
            }

            {   !isJoined && 
                <>
                    <h2 className="mb-auto text-white">Select Chat</h2>
                    <div className="d-flex">
                        <input placeholder="Type Room ID to Enter" value={room} onChange={()=>{setRoom(event.target.value)}} className="form-control me-2" type="text" />
                        <button onClick={handleSelect} className="btn btn-success">Join Chat</button>
                    </div>
                </>
            }
        </div>
    )
}
