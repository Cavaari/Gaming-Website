"use client"
import { useEffect, useState } from "react"

export default function useAuthCookie(socket){
    const [auth, setAuth] = useState(false)

    


    useEffect(()=>{
        if(socket){
            socket.emit("is_winner")

            socket.on('is_winner', (is_winner) => {
                setAuth(is_winner)
                console.log(is_winner);
            });

        }
    },[socket, setAuth])

    return auth
}