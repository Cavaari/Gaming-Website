import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import SocketContext from '@/components/SocketContext';
import Switches from '@/components/puzzle/Switches';
import Buttons from '@/components/puzzle/Buttons';
import Wires from '@/components/puzzle/Wires';
import Image from 'next/image';

const game_types = ["switch", "color poem", "wire"];

export default function Puzzle() {
    const socket = useContext(SocketContext);
    const router = useRouter(); // Use the useRouter hook

    const [gameState, setGameState] = useState(null);
    const [winnerIndex, setWinnerIndex] = useState(0);

    useEffect(() => {        
        if (socket) {
            const fetchNewGame = async () => {
                const r = await fetch(
                    `${process.env.HOST_URL}/api/puzzle/new?` +
                    new URLSearchParams({ id: socket.id })
                );
                const data = await r.json();
                setGameState(data);
            };
            fetchNewGame();
        }
    }, [socket]);

    const handleUserInputSubmit = async (game, user_input) => {
        const r = await fetch(
            `${process.env.HOST_URL}/api/puzzle/make_move?` +
            new URLSearchParams({
                id: socket.id,
                game: game,
                user_input: user_input
            })
        );
        const data = await r.json();
        return data;
    };

    // Function to navigate to the /solved page
    const proceedToNextPage = () => {
        router.push('/solved');
    };

    return (
        <div className='mt-5 container-fluid align-items-center justify-content-center'>
            <div className="puzzle-intro-text text-center">
                <p>You have stepped into the shoes of Alex Carter. How unfortunate for you. You have done bad things
                    and bad things have consequences. JigSaw has trapped you in a room with a bomb. You see a sheet
                    of paper, pliers and a phone in front of you, you’ve tried to call someone, but it only seems to
                    receive messages.</p>
                <p>You then reach for the paper, here’s what’s on it:</p>
                <Image
                    className='img-fluid'
                    src="/puzzle/alex_carter.jpg"
                    width={1000}
                    height={1000}
                />
            </div>

            {winnerIndex === 0 &&
                <>
                    <Buttons setWinnerIndex={setWinnerIndex} gameState={gameState} handleUserInputSubmit={handleUserInputSubmit} />
                </>
            }

            {winnerIndex === 1 &&
                <>
                    <Switches setWinnerIndex={setWinnerIndex} gameState={gameState} handleUserInputSubmit={handleUserInputSubmit} />
                </>
            }

            {winnerIndex === 2 && 
                <>
                    <Wires setWinnerIndex={setWinnerIndex} gameState={gameState} handleUserInputSubmit={handleUserInputSubmit} />
                </>
            }

            {winnerIndex === 3 &&
                <div className='text-center'>
                    <h1>Hello Winner</h1>
                    <Image
                        className='img-fluid'
                        src="/puzzle/jigsaw.gif"
                        width={1000}
                        height={1000}
                    />
                    {/* Button to proceed to the next page */}
                    <button className="btn btn-primary mt-3" onClick={proceedToNextPage}>Proceed to Next Page</button>
                </div>
            }
        </div>
    );
}
