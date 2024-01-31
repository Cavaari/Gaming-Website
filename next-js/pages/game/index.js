import useSocket from "@/components/socket/useSocket";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Game() {
    const [roomCode, setRoomCode] = useState("")


    const socket = useSocket()

    useEffect(()=>{
        if(socket){
            socket.on('test', (message) => {
                console.log(JSON.parse(message));
            });
        }
    },[socket])

    const handleCreateLobby = useCallback(()=>{
        if(socket){
            socket.emit("create")
        }
    },[socket])

    const handleTest = useCallback(()=>{
        if(socket){
            socket.emit("test")
        }
    },[socket])

    return (
        <div className="buttons-container">
            {/* <Link href={"/game/create"}>
                <button>Create Room</button>
            </Link> */}
            
            { socket ? 
                (<button onClick={handleCreateLobby}>Create Lobby</button>) :
                (null)
            }

            { socket ? 
                (<button onClick={handleTest}>Test</button>) :
                (null)
            }
           

            <div>
                <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                />
                {/* <Link href={{
                    pathname: '/game/lobby',
                    query: { code: roomCode },
                }}>
                    <button>Join Room</button>
                </Link> */}
                <button>Join Room</button>
            </div>
        </div>
    )
}

