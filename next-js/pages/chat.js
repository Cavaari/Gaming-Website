import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";


import { useRouter } from 'next/router'
import SocketContext from '@/components/SocketContext';
import Room from "@/components/chat/Room";

// return random room code
function generateRoomCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function Game() {
    const socket = useContext(SocketContext)
    const router = useRouter()

    useEffect(() => {
        if (socket && router) {
            socket.on('test', (message) => {
                console.log(JSON.parse(message));
            });

            socket.on('error', (message) => {
                alert(message)
            });

            // success 
            socket.on('room created', (message) => {
                router.push("/game/" + message)
            });

            // success 
            socket.on('room joined', (message) => {
                router.push("/game/" + message)
            });
        }
    }, [socket, router])

    const handleCreateRoom = useCallback(() => {
        if (socket) {
            socket.emit("create", "noob")
        }
    }, [socket])

    const handleJoinChat = useCallback(() => {
        if (socket) {
            const input = document.getElementById("code")
            socket.emit("join", input.value)
        }
    }, [socket])

    const handleTest = useCallback(() => {
        if (socket) {
            socket.emit("test")
        }
    }, [socket])

    

    

    return (
        <div className="new-section bg-third d-flex flex-column align-items-center justify-content-center">
         

            <div className="p-5 new-section bg-third d-flex flex-column align-items-center justify-content-end">
                {/* Test Component which uses socket connection state*/}
                <Room socket={socket}/>
            </div>


            {/* {socket ?
                (<button onClick={handleTest}>Test</button>) :
                (null)
            } */}
        </div>
    )
}



/* import { useState } from "react";
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
 */
