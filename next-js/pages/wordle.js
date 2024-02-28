import SocketContext from '@/components/SocketContext';
import { useContext, useEffect, useState } from 'react';

const square = {
    padding: 25,
    margin: 5,
    border: "1px solid #1a0000"
}

function Square({ value }) {
    return (
        <div style={square}>
            {value}
        </div>
    );
}

function Board({ trials }) {

    return (
        <div className="d-flex flex-column">
            <div id="row-1" className="d-flex">
                <Square value={trials[0][0]} />
                <Square value={trials[0][1]} />
                <Square value={trials[0][2]} />
                <Square value={trials[0][3]} />
                <Square value={trials[0][4]} />
            </div>
            <div id="row-2" className="d-flex">
                <Square value={trials[1][0]} />
                <Square value={trials[1][1]} />
                <Square value={trials[1][2]} />
                <Square value={trials[1][3]} />
                <Square value={trials[1][4]} />
            </div>
            <div id="row-3" className="d-flex">
                <Square value={trials[2][0]} />
                <Square value={trials[2][1]} />
                <Square value={trials[2][2]} />
                <Square value={trials[2][3]} />
                <Square value={trials[2][4]} />
            </div>
            <div id="row-4" className="d-flex">
                <Square value={trials[3][0]} />
                <Square value={trials[3][1]} />
                <Square value={trials[3][2]} />
                <Square value={trials[3][3]} />
                <Square value={trials[3][4]} />
            </div>
            <div id="row-5" className="d-flex">
                <Square value={trials[4][0]} />
                <Square value={trials[4][1]} />
                <Square value={trials[4][2]} />
                <Square value={trials[4][3]} />
                <Square value={trials[4][4]} />
            </div>
            <div id="row-6" className="d-flex">
                <Square value={trials[5][0]} />
                <Square value={trials[5][1]} />
                <Square value={trials[5][2]} />
                <Square value={trials[5][3]} />
                <Square value={trials[5][4]} />
            </div>
        </div>
    );
}


export default function Wordle() {
    const [backEndGameData, setBackEndGameData] = useState()
    //socket connection
    const socket = useContext(SocketContext)
    useEffect(() => {
        if (socket) {
            socket.emit("new_wordle_game")

            socket.on("game_data", (data)=>{
                setBackEndGameData(JSON.parse(data).data)
            })
        }
    }, [socket])


    //game trials state 
    const [trials, setTrials] = useState(["", "", "", "", "", ""])
    const [trialsIndex, setTrialsIndex] = useState(0)


    useEffect(()=>{
        if(backEndGameData){
            console.log(backEndGameData);
            const row = document.getElementById("row-" + trialsIndex)
           
            backEndGameData.data.forEach((letter, index)=>{
                if(letter == "0"){
                    row.childNodes[index].style.backgroundColor = "red"
                }else if (letter == "?"){
                    row.childNodes[index].style.backgroundColor = "orange"
                }else{
                    row.childNodes[index].style.backgroundColor = "green"
                }
            })
            
            if(backEndGameData.status == "winner"){
                alert("You won")
            }else if(backEndGameData.status == "loser"){
                alert("You lost")
            }
            
        }
    }, [backEndGameData, trialsIndex])

    //keyboard input tracking
    useEffect(() => {
        const userPress = () => {
            let pressedKey = String(event.key)
            if (pressedKey === "Backspace") {
                const temp = [...trials]
                temp[trialsIndex] = temp[trialsIndex].substring(0, temp[trialsIndex].length - 1)
                setTrials(temp)
                return
            }

            if (pressedKey === "Enter") {
                socket.emit("user_input", trials[trialsIndex])
                setTrialsIndex(trialsIndex + 1)
                return
            }

            let found = pressedKey.match(/[a-z]/gi)
            if (!found || found.length > 1) {
                return
            } else {
                if (trials[trialsIndex].length < 5) {
                    const temp = [...trials]
                    temp[trialsIndex] = temp[trialsIndex] + pressedKey
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
        </div>
    )
}