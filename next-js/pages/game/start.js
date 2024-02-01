import useSocket from "@/components/socket/useSocket";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


import { useRouter } from 'next/router'

export default function Game() {
    const socket = useSocket()
    const router = useRouter()

    useEffect(() => {
        if (socket) {
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
    }, [socket])

    const handleCreateGame = useCallback(() => {
        if (socket) {
            socket.emit("create")
        }
    }, [socket])

    const handleJoinLobby = useCallback(() => {
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
        <div className="new-section bg-second d-flex flex-column align-items-center justify-content-center">
            {/* <Link href={"/game/create"}>
                <button>Create Room</button>
            </Link> */}

            {socket ?
                (<button className="btn btn-success btn-lg" onClick={handleCreateGame}>Create Game</button>) :
                (null)
            }

            <span className="fs-3 m-5 text-white">OR</span>

            {socket ?
                (
                    <div className="d-flex m-2">
                        <input
                            className="form-control me-2"
                            type="text"
                            placeholder="Enter Room Code"
                            id="code"
                        />
                        <button className="btn btn-primary" onClick={handleJoinLobby}>Join Lobby</button>
                    </div>
                ) :
                (null)
            }

            {/* {socket ?
                (<button onClick={handleTest}>Test</button>) :
                (null)
            } */}
        </div>
    )
}

