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