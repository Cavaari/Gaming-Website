import { useState } from "react";
import GameInput from "@/components/game/room/GameInput";
export default function Room({socket}){

    const [room, setRoom] = useState("")
    const [isJoined, setIsJoined] = useState(false)

    
    // join a socket room message
    const handleSelect = ()=>{
        socket.emit("join", room)
        setIsJoined(true)
    }

    return(
        <>  
            {   isJoined &&
                <>
                    <div className="mb-auto text-center">
                        <h2 className="text-white">Room: {room}</h2>
                        <h2 className="text-white">Client: {new Date().valueOf()}</h2>
                    </div>
                    <GameInput socket={socket} room={room} isJoined={isJoined}/> 
                </>
            }

            {   !isJoined && 
                <>
                    <h2 className="mb-auto text-white">Select Room</h2>
                    <div className="d-flex">
                        <input placeholder="Type Room ID to Enter" value={room} onChange={()=>{setRoom(event.target.value)}} className="form-control me-2" type="text" />
                        <button onClick={handleSelect} className="btn btn-success">Join Room</button>
                    </div>
                </>
            }
        </>
    )
}