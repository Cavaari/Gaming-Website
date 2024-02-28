import SocketContext from '@/components/SocketContext';
import { useContext, useEffect, useRef, useState } from 'react';

import Board from '@/components/wordle/Board';

import WinnerModal from '@/components/wordle/WinnerModal';
import LoserModal from '@/components/wordle/LoserModal';

export default function Wordle() {
    const winnerModalRef = useRef(null)
    const loserModalRef = useRef(null)

    const [backEndGameData, setBackEndGameData] = useState()
    //socket connection
    const socket = useContext(SocketContext)
    useEffect(() => {
        if (socket) {
            socket.emit("new_wordle_game")

            socket.on("game_data", (data) => {
                setBackEndGameData(JSON.parse(data).data)
            })
        }
    }, [socket])


    //game trials state 
    // single game state examle "0r?a?" and the whole state is array of trials made by user
    // 0 no such letter
    // ? there is one or more such letters but in the other positions
    const [trials, setTrials] = useState(["", "", "", "", "", ""])
    const [trialsIndex, setTrialsIndex] = useState(0)


    //this react hook listens for backEndGameData updates and colors squares based on data
    useEffect(() => {
        if (backEndGameData) {
            console.log(backEndGameData);
            // FUCK REACT DOING IT IN PLAIN JS
            const row = document.getElementById("row-" + trialsIndex)

            // coloring squares based on backend data response 
            backEndGameData.data.forEach((letter, index) => {
                // no such letter: color squares red
                if (letter == "0") {
                    row.childNodes[index].style.backgroundColor = "#bd1b02"
                    row.childNodes[index].style.color = "#FFFFFF"
                // right letter but wrong index: color squares orange
                } else if (letter == "?") {
                    row.childNodes[index].style.backgroundColor = "#fb9b00"
                    row.childNodes[index].style.color = "#FFFFFF"
                // right letter and index: color squares green
                } else {
                    row.childNodes[index].style.backgroundColor = "#58a351"
                    row.childNodes[index].style.color = "#FFFFFF"
                }
            })

            // winner loser logic after backend response
            if (backEndGameData.status == "winner") {
                winnerModalRef.current.show()
            } else if (backEndGameData.status == "loser") {
                loserModalRef.current.show()
            }

        }
    }, [backEndGameData, trialsIndex, winnerModalRef, loserModalRef])

    //keyboard input tracking
    useEffect(() => {
        const userPress = () => {
            let pressedKey = String(event.key)

            // Backspace key
            if (pressedKey === "Backspace") {
                const temp = [...trials]
                temp[trialsIndex] = temp[trialsIndex].substring(0, temp[trialsIndex].length - 1)
                setTrials(temp)
                return
            }

            // enter sends socket message with user input
            if (pressedKey === "Enter") {
                socket.emit("user_input", trials[trialsIndex].toLowerCase())
                setTrialsIndex(trialsIndex + 1)
                return
            }

            // letter keys
            let found = pressedKey.match(/[a-z]/gi)
            if (!found || found.length > 1) {
                return
            } else {
                if (trials[trialsIndex].length < 5) {
                    const temp = [...trials]
                    temp[trialsIndex] = temp[trialsIndex] + pressedKey.toUpperCase()
                    setTrials(temp)
                }
            }
        }

        // set up event 
        document.addEventListener("keyup", userPress)

        // clean event 
        return () => {
            document.removeEventListener("keyup", userPress)
        }
    }, [trials, trialsIndex])

    
    return (
        <div className="mt-5 d-flex align-items-center justify-content-center">
            <Board trials={trials} />

            <WinnerModal modalRef={winnerModalRef}/>
            <LoserModal modalRef={loserModalRef}/>
        </div>
    )
}