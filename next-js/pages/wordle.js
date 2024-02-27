import SocketContext from '@/components/SocketContext';
import { useContext, useEffect } from 'react';

export default function Wordle(){
    const socket = useContext(SocketContext)


    useEffect(()=>{
        if (socket){
            socket.emit("new_wordle_game")
        }
    }, [socket])
    
    return (
        <></>
    )
}