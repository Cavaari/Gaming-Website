import Room from "@/components/game/room/Room";
import CustomSocket from "@/components/socket/CustomSocket";
import { useEffect, useState } from "react";


const pingRoom = async () =>{
    await fetch("http://localhost:3000/api/socket")
}


export default function Game(){
    // socket must be pinged once before server start up to be in listening state
    useEffect(()=>{
        pingRoom()
    },[])

    // declare a socket connection state for other components on the page can use it
    const [socket, setSocket] = useState(null)


    return (
        <div className="p-5 new-section bg-second d-flex flex-column align-items-center justify-content-end">
            {/* declare a socket connection state for other components on the page can use it */}
            <CustomSocket setSocket={setSocket}/>


            {/* Test Component which uses socket connection state*/}
            <Room socket={socket}/>
        </div>
    )
}