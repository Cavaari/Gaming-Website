"use client"
import { useEffect, useState } from "react"

export default function useIsSolved(){
    const [auth, setAuth] = useState(false)


    useEffect(()=>{
        const code = localStorage.getItem("code");
        if (code == "solved"){
            setAuth(true)
        }
    },[])

    return auth
}