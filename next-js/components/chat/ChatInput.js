import { useCallback, useEffect, useState } from "react";
import Message from "./Message";
import { useRouter } from "next/router";
export default function ChatInput({socket, room, isJoined}){
    const router = useRouter()

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    
    // send message to the room
    const handleSend = useCallback(()=>{
        if (isJoined){
            socket.emit("message", {text: message, room: room})
            setMessage("")
        }
    },[isJoined, message])
    

    // recive messages from the room
    useEffect(()=>{
        if(socket){
            socket.on('new_msg', (message) => {
                setMessages([...messages, {text: message, side: "right"}])
            });
            socket.on('init_secret_msg', (message) => {
                const temp = [...messages]
                const msgObj = JSON.parse(message)

                temp.push({text: "Hey, Stranger! Do you like Caesar salad? Honestly, Secret Room doesn't care! Here some word salad for you. And.. Hmm..  Some key?!?!?!?", side: "left"})
                temp.push({text: msgObj.riddle, side: "left"})
                temp.push({text: msgObj.shift, side: "left", color: "green"})

                setMessages(temp)
            });
            socket.on('secret_msg', (message) => {
                // Transfering to the secret hidden page
                if(message == "Secret is broken"){
                    setTimeout(() => {
                        router.push("/hidden")
                      }, 500);
                }
                setMessages([...messages, {text: message, side: "left"}])
            });
        }
    },[socket, messages, router])

    return(
        <>
            <div className="w-100 d-flex flex-column overflow-y-auto">
                {
                    messages.map((msg, index)=>
                        <Message key={index} text={msg.text} side={msg.side} color={msg.color}/>
                    )
                }
            </div>
            <div className="d-flex">
                <input placeholder="Enter Your Message" value={message} onChange={()=>{setMessage(event.target.value)}} className="form-control me-2" type="text" />
                <button onClick={handleSend} className="btn btn-success">Send</button>
            </div>
        </>
    )
}
