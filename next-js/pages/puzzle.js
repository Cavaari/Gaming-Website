import SocketContext from '@/components/SocketContext';
import { useContext, useEffect, useState } from 'react';


const game_types = ["switch", "color poem", "wire"]

export default function Puzzle() {
    const socket = useContext(SocketContext)


    const [gameState, setGameState] = useState(null)

    


    useEffect(() => {
        // when socket client session is created 
        if (socket) {
            // fetch new game from back-end using unique socket id
            const fetchNewGame = async () => {
                const r = await fetch(
                    process.env.HOST_URL + "/api/puzzle/new?" +
                    new URLSearchParams({ id: socket.id })
                )
                const data = await r.json();
                setGameState(data)
            }
            fetchNewGame()
        }
    }, [socket])


    // for example purpose of user input is sent to the back-end
    const handleUserInputSubmit = () =>{
        event.preventDefault()
        const form_data = new FormData(event.target)

        const makeMove = async () =>{
            const r = await fetch(
                process.env.HOST_URL + "/api/puzzle/make_move?" +
                new URLSearchParams({ id: socket.id, game: form_data.get("game_type"), user_input: form_data.get("user_input")})
            )
            const data = await r.json();
            // on cold server boot might return no such game CTRL + SHIFT + R couple of times 
            console.log(data);
        }
        makeMove()
    }



    return (
        <div className='mt-5 container-fluid'>
            {JSON.stringify(gameState)}

            {/* for example purpose */}
            <form onSubmit={handleUserInputSubmit} className='m-5'>
                <select className='form-control m-2' name="game_type" id="game_type">
                    {
                        game_types.map((type, index) => <option key={index} value={type}>{type}</option>)
                    }
                </select>
                <input className='form-control m-2' name='user_input' id='user_input' type='text' placeholder='User Input'/>
                <button className='form-control m-2'>Submit</button>
            </form>
        </div>
    )
}