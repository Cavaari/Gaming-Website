import { useContext, useEffect } from "react";
import SocketContext from "@/components/SocketContext";

export default function Chat(){
    // declare a socket connection state for other components on the page can use it
    const socket = useContext(SocketContext)

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