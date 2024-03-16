import { useContext, useEffect } from 'react';

import SocketContext from '@/components/SocketContext';


export default function Jeopardy({ }) {



  // check auth
  const socket = useContext(SocketContext)

  useEffect(()=>{
    if(socket){
        socket.emit("new_jeopardy")
        socket.on("new_jeopardy", (message) =>{
            console.log(message);
        })
    }
  },[socket])

  return (
    <>
      
    </>

  );
}
