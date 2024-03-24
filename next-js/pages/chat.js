// import { useContext, useEffect } from "react";

//old code

// import { useRouter } from 'next/router'
// import SocketContext from '@/components/SocketContext';
// import Room from "@/components/chat/Room";


// export default function Chat() {
//     const socket = useContext(SocketContext)
//     const router = useRouter()

//     useEffect(() => {
//         if (socket && router) {
//             socket.on('test', (message) => {
//                 console.log(JSON.parse(message));
//             });

//             socket.on('error', (message) => {
//                 alert(message)
//             });

//             // success 
//             socket.on('room created', (message) => {
//                 router.push("/game/" + message)
//             });

//             // success 
//             socket.on('room joined', (message) => {
//                 router.push("/game/" + message)
//             });
//         }
//     }, [socket, router])
//     return (
//         <div className="bg-primary d-flex flex-column align-items-center justify-content-center">
         
//             <Room socket={socket}/>

//         </div>
//     )
// }

import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import SocketContext from '@/components/SocketContext';
import Room from '@/components/chat/Room';


//  chatStyles 
const chatStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: '#333',
        backgroundColor: '#FAFAFA', 
    },
    header: {
        backgroundColor: '#5D5C61',
        color: '#FFFFFF',
        padding: '10px 20px',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    body: {
        display: 'flex',
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: 'lightgrey', 
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#3F0E40', 
        color: '#FFFFFF',
        overflowY: 'auto',
        padding: '20px',
    },
    mainContent: {
        flexGrow: 1,
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%',
    },
    notification: {
        padding: '5px 10px',
        margin: '10px 0',
        backgroundColor: '#e7e7e7',
        color: '#333',
        textAlign: 'center',
        borderRadius: '5px',
        fontSize: '0.9rem',
    },
};

export default function Chat() {
    const socket = useContext(SocketContext);
    const router = useRouter();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        
        addNotification('Chat room page loaded');
    
        if (socket && router) {
            socket.on('test', (message) => {
                console.log(JSON.parse(message));
                // If you want to add notification for test messages, uncomment below
                addNotification('Test message received');
            });
    
            socket.on('error', (message) => {
                alert(message);
                addNotification(`Error: ${message}`);
            });
    
            // When a room is created, display a notification
            socket.on('room created', (message) => {
                router.push(`/game/${message}`);
                addNotification(`Navigated to the room: ${message}`);
            });
    
            // When a room is joined, display a notification
            socket.on('room joined', (message) => {
                router.push(`/game/${message}`);
                addNotification(`Entered room: ${message}`);
            });
        }
    }, [socket, router]);

    // Function to add notifications
    const addNotification = (message) => {
        const id = Math.random().toString(36).substr(2, 9); // Generate a unique id for the notification
        setNotifications(prev => [...prev, { id, message }]);
        // Remove the notification after 3 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 3000);
    };

    // Call this function whenever you need to add a new notification
    // Example: addNotification('Message entered');

    return (
        <div style={chatStyles.container}>
            <div style={chatStyles.header}>
                <span>Team 9 Chat</span>
            </div>
            <div style={chatStyles.body}>
                <aside style={chatStyles.sidebar}>
                    {notifications.map((notification) => (
                        <div key={notification.id} style={chatStyles.notification}>
                            {notification.message}
                        </div>
                    ))}
                </aside>
                <main style={chatStyles.mainContent}>
                    <Room socket={socket} />
                </main>
            </div>
        </div>
    );
}

