"use client"
import { useEffect, useState } from "react"

export default function useAuthWinner(socket) {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (socket) {
            const fetchWinner = async() =>{
                const r = await fetch(
                    `${process.env.HOST_URL}/api/puzzle/is_winner?` +
                    new URLSearchParams({
                        id: socket.id
                    })
                );
                const data = await r.json();
    
                if (data == "Winner!") {
                    setAuth(true)
                }
            } 
            fetchWinner()
        }
    }, [socket, setAuth])

    return auth
}