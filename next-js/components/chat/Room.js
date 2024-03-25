import { useState } from "react";
import ChatInput from "./ChatInput";
export default function Room({socket}){

    const [room, setRoom] = useState("")
    const [isJoined, setIsJoined] = useState(false)
    const [notifications, setNotifications] = useState([])

    // join a socket room message
    const handleSelect = ()=>{
        socket.emit("join_chat", room)
        addNotification(`Navigated to the room: ${room}`)
        setIsJoined(true)
    }

    //  add notifications
    const addNotification = (message) => {
        const id = Math.random().toString(36).substr(2, 9); // Generate a unique id for the notification
        setNotifications(prev => [...prev, { id, message }]);
        // Remove the notification after 3 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 3000);
    }

    return(
        <div className="p-5 new-section d-flex flex-column align-items-center justify-content-end">  
            {   isJoined &&
                <>
                    <div className="mb-auto text-center">
                        <h1 className="text-text-secondary">Room: {room}</h1>
                    </div>
                    <ChatInput socket={socket} room={room} isJoined={isJoined}/> 
                </>
            }

            {   !isJoined && 
                <>
                    <h1 className="mb-auto text-secondary">Select Chat</h1>
                    {notifications.map((notification) => (
                        <div key={notification.id} className="alert alert-secondary align-items-left flex-column" role="alert">
                            {notification.message}
                        </div>
                    ))}
                    <div className="d-flex">
                        <input placeholder="Type Room ID to Enter" value={room} onChange={()=>{setRoom(event.target.value)}} className="form-control me-2" type="text" />
                        <button onClick={handleSelect} className="btn btn-primary">Join Chat</button>
                    </div>
                </>
            }
        </div>
    )
}
