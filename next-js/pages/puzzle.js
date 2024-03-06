import SocketContext from '@/components/SocketContext';
import { useContext, useEffect } from 'react';


export default function Puzzle(){
    const socket = useContext(SocketContext)

    useEffect(()=>{
        if(socket){
            socket.emit("new_puzzle");

            socket.on("game_data", (data) => {
                const parsedData = JSON.parse(data);
                console.log(data);
            });
        }
    },[socket])



    return (
        <></>
    )
}