import useSocket from "@/components/socket/useSocket"

export default function Create(){
    const socket = useSocket()


    const handleCreateRoom = () => {
        setActiveComponent('create');
        console.log('Create Room clicked');
    };

    
    return (
        <div className="container">
           
    
            
    
            {/* {activeComponent === 'create' && <Create socket={socket}/>}
            {activeComponent === 'join' && <Join socket={socket} roomCode={roomCode}/>} */}
        </div>
    );    
}

/*     const handleCreateRoom = () => {
        setActiveComponent('create');
        console.log('Create Room clicked');
    };

    const handleJoinRoom = () => {
        setActiveComponent('join');
        console.log('Join Room clicked', roomCode);
    };

    return (
        <div className="container">
            <CustomSocket setSocket={setSocket}/>
    
            <div className="buttons-container">
                <button onClick={handleCreateRoom}>Create Room</button>
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Room Code" 
                        value={roomCode} 
                        onChange={(e) => setRoomCode(e.target.value)}
                    />
                    <button onClick={handleJoinRoom}>Join Room</button>
                </div>
            </div>
    
            {activeComponent === 'create' && <Create socket={socket}/>}
            {activeComponent === 'join' && <Join socket={socket} roomCode={roomCode}/>}
        </div>
    );    
} */