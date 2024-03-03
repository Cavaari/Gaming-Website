import { useContext, useEffect } from "react";


import { useRouter } from 'next/router'
import SocketContext from '@/components/SocketContext';
import Room from "@/components/chat/Room";


export default function Chat() {
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

    

    

    return (
        <div className="new-section bg-third d-flex flex-column align-items-center justify-content-center">
         
            <Room socket={socket}/>

        </div>
    )
}
