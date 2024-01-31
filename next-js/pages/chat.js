import Room from "@/components/game/room/Room";
import useSocket from "@/components/socket/useSocket";
import { useEffect } from "react";

export default function Chat(){
    // declare a socket connection state for other components on the page can use it
    const socket = useSocket()

    useEffect(()=>{
        
    },[socket])


    return (
        <div className="p-5 new-section bg-second d-flex flex-column align-items-center justify-content-end">
            {/* declare a socket connection state for other components on the page can use it */}


            {/* Test Component which uses socket connection state*/}
            {/* <Room socket={socket}/> */}
        </div>
    )
}