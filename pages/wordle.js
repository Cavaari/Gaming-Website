import SocketContext from '@/components/SocketContext';
import { useContext, useEffect, useRef, useState } from 'react';

import Board from '@/components/wordle/Board';
import WinnerModal from '@/components/wordle/WinnerModal';
import LoserModal from '@/components/wordle/LoserModal';

export default function Wordle() {
    const winnerModalRef = useRef(null);
    const loserModalRef = useRef(null);

    const [backEndGameData, setBackEndGameData] = useState();
    const [gameOver, setGameOver] = useState(false); // Track if the game is over

    //socket connection
    const socket = useContext(SocketContext);
    useEffect(() => {
        if (socket) {
            socket.emit("new_wordle_game");

            socket.on("game_data", (data) => {
                const parsedData = JSON.parse(data).data;
                setBackEndGameData(parsedData);
                if (parsedData.status === "winner" || parsedData.status === "loser") {
                    setGameOver(true); // Set game over to true if player wins or loses
                }
            });
        }
    }, [socket]);

    const [trials, setTrials] = useState(["", "", "", "", "", ""]);
    const [trialsIndex, setTrialsIndex] = useState(0);

    useEffect(() => {
        if (backEndGameData) {
            console.log(backEndGameData);
            const row = document.getElementById("row-" + trialsIndex);

            backEndGameData.data.forEach((letter, index) => {
                if (letter == "0") {
                    row.childNodes[index].style.backgroundColor = "#bd1b02";
                    row.childNodes[index].style.color = "#FFFFFF";
                } else if (letter == "?") {
                    row.childNodes[index].style.backgroundColor = "#fb9b00";
                    row.childNodes[index].style.color = "#FFFFFF";
                } else {
                    row.childNodes[index].style.backgroundColor = "#58a351";
                    row.childNodes[index].style.color = "#FFFFFF";
                }
            });

            if (backEndGameData.status == "winner") {
                winnerModalRef.current.show();
            } else if (backEndGameData.status == "loser") {
                loserModalRef.current.show();
            }
        }
    }, [backEndGameData, trialsIndex]);

    useEffect(() => {
        const userPress = (event) => {
            if (gameOver) return; // If game is over, ignore inputs

            let pressedKey = String(event.key);

            if (pressedKey === "Backspace") {
                const temp = [...trials];
                temp[trialsIndex] = temp[trialsIndex].substring(0, temp[trialsIndex].length - 1);
                setTrials(temp);
                return;
            }

            if (pressedKey === "Enter") {
                socket.emit("user_input", trials[trialsIndex].toLowerCase());
                setTrialsIndex(trialsIndex + 1);
                return;
            }

            let found = pressedKey.match(/[a-z]/gi);
            if (!found || found.length > 1) {
                return;
            } else {
                if (trials[trialsIndex].length < 5) {
                    const temp = [...trials];
                    temp[trialsIndex] = temp[trialsIndex] + pressedKey.toUpperCase();
                    setTrials(temp);
                }
            }
        };

        document.addEventListener("keyup", userPress);

        return () => {
            document.removeEventListener("keyup", userPress);
        };
    }, [socket, trials, trialsIndex, gameOver]); // Include gameOver in dependencies to re-run effect when it changes

    // Proceed to the next page button logic
    const handleProceedNextPage = () => {
        console.log("Proceeding to the next page...");
        // potential use
        // history.push('/next-page');
    };

    return (
        <div className="mt-5 d-flex align-items-center justify-content-center">
            <Board trials={trials} />

            <WinnerModal modalRef={winnerModalRef} />
            <LoserModal modalRef={loserModalRef} />

            {/* Conditionally render -> will go connect in the backend */}
            {backEndGameData?.status === 'winner' && (
                <button className="btn btn-success mt-3" onClick={handleProceedNextPage}>
                    Proceed to the Next Page
                </button>
            )}
        </div>
    );
}
