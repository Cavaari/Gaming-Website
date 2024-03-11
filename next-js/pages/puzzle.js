import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter
import SocketContext from '@/components/SocketContext';
import Switches from '@/components/puzzle/Switches';
import Buttons from '@/components/puzzle/Buttons';
import Wires from '@/components/puzzle/Wires';
import Image from 'next/image';
import useIsSolved from '@/components/puzzle/useIsSolved';
import NotAuth from '@/components/hidden/NotAuth';

const game_types = ["switch", "color poem", "wire"];

export default function Puzzle() {
    const socket = useContext(SocketContext);
    const router = useRouter(); // Use the useRouter hook

    const [gameState, setGameState] = useState(null);
    const [winnerIndex, setWinnerIndex] = useState(0);
    const [timer, setTimer] = useState(300); // 300 seconds for 5 minutes

    const auth = useIsSolved()

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

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        if (timer === 0) {
            clearInterval(countdown);
            router.push('/lose');
        }

        return () => clearInterval(countdown);
    }, [timer, router]);

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

    if (auth) {
        return (
            <div className='pt-5 container-fluid d-flex align-items-center justify-content-center' style={{ background: "var(--third-color)" }}>
                <div style={{
                    position: 'fixed',
                    top: 100,
                    left: 20,
                    width: '100%',
                    zIndex: 1000,
                    padding: '0px 0',
                    textAlign: 'left',
                    color: '#FFFF'
                }}>
                    <h2>Time Remaining: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}</h2>
                </div>
                <div style={{ paddingTop: 50 }} className='col-12 col-md-7 col-lg-5 d-flex flex-column align-items-center justify-content-center'>
                    <div className="puzzle-intro-text text-center d-flex flex-column align-items-center justify-content-center">
                        <p style={{ color: "var(--first-color)", background: "var(--second-color)" }} className="text-wrap fs-4 fw-bold alert alert-warning">
                            You have stepped into the shoes of Alex Carter. How unfortunate for you. You have done bad things
                            and bad things have consequences. JigSaw has trapped you in a room with a bomb. You see a sheet
                            of paper, pliers and a phone in front of you, you’ve tried to call someone, but it only seems to
                            receive messages.
                            <p></p>
                        </p>
                        <div>
                            <Image
                                className='img-fluid'
                                src="/puzzle/bomb.png"
                                width={300}
                                height={300}
                            />
                            <Image
                                className='img-fluid'
                                src="/puzzle/cutters.png"
                                width={200}
                                height={200}
                            />
                            <Image
                                className='img-fluid'
                                src="/puzzle/phone.png"
                                width={100}
                                height={100}
                            />
                        </div>
                        <p className="fw-bold alert alert-primary" style={{ color: "var(--first-color)", background: "var(--second-color)" }}>
                            You then reach for the paper, here’s what’s on it:
                            <span class="position-absolute align-items-right top-0 start-100 translate-middle p-2">
                                <img src="/puzzle/jigsaw.png" height={70} width={70}></img>
                            </span>
                        </p>
                        <Image
                            className='img-fluid'
                            src="/puzzle/alex_carter.jpg"
                            width={500}
                            height={500}
                        />
                        <p className="fw-bold alert alert-primary mt-5" style={{ color: "var(--first-color)", background: "var(--second-color)" }}>
                            You have 5 minutes to solve the puzzle, or else the bomb will explode. Good luck.
                            <span class="position-absolute align-items-right top-0 start-100 translate-middle p-2">
                                <img src="/puzzle/jigsaw.png" height={70} width={70}></img>
                            </span>
                        </p>
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

{/* Finish styling here------------------------ */}
                    {winnerIndex === 3 &&
                        <div className='text-center'>
                            <h1>Hello Winner</h1>
                            <p>Dont get too excited... the adventure is not over for you just yet! Good luck...</p>
                            <Image
                                className='img-fluid'
                                src="/puzzle/jigsaw.gif"
                                width={1000}
                                height={1000}
                            />
                            {/* Button to proceed to the next page */}
                            <button className="btn btn-primary mt-3 mb-3" onClick={proceedToNextPage}>Proceed to Next Page</button>
                        </div>
                    }
                </div>

            </div>
        );
    } else {
        return (
            <NotAuth />
        )
    }

}
