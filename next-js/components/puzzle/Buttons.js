import { useState } from 'react';

const mainStyle = {
    backgroundColor: "#cccaca",
    margin: 15,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontColor: "#00032F",
}

const buttonStyle = {
    default: {
        border: '2px solid #000',
        borderRadius: '2px'
    }
}

export default function Buttons({ setWinnerIndex, gameState, handleUserInputSubmit }) {
    const [colorsStr, setColorsStr] = useState("")

    const handleColorClick = (color) => {
        setColorsStr(prev => prev + color + ", ")
    }

    const resetColorButtons = () => {
        setColorsStr("")
    }

    const handleSubmit = async () => {
        const response = await handleUserInputSubmit("color poem", colorsStr.slice(0, -2))
        if (response.includes("Winner")) {
            setWinnerIndex(prev => prev + 1)
        } else {
            document.getElementById("buttons_game").classList.add("alerts-border")
            setTimeout(() => {
                document.getElementById("buttons_game").classList.remove("alerts-border")
            }, "1000");
            console.log(response)
        }
        resetColorButtons()
    }

    return (
        <div id='buttons_game' style={mainStyle}>
            {gameState &&
                <span className='text-center mb-3'>{JSON.stringify(gameState.buttons.hint)}</span>
            }
            <div className="btn-group" style={buttonStyle.default} role="group" aria-label="Vertical radio toggle button group">
                <input disabled={colorsStr.includes("red")} onClick={() => handleColorClick("red")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off"></input>
                <label className="btn btn-danger" htmlFor="vbtn-radio1">Red</label>
                <input disabled={colorsStr.includes("yellow")} onClick={() => handleColorClick("yellow")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off"></input>
                <label className="btn btn-warning" htmlFor="vbtn-radio2">Yellow</label>
                <input disabled={colorsStr.includes("green")} onClick={() => handleColorClick("green")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off"></input>
                <label className="btn btn-success" htmlFor="vbtn-radio3">Green</label>
                <input disabled={colorsStr.includes("white")} onClick={() => handleColorClick("white")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio4" autoComplete="off"></input>
                <label className="btn btn-light" htmlFor="vbtn-radio4">White</label>
            </div><br></br>
            <div style={{ textAlign: 'center' }}>
                <h5>Your Answer</h5>
                {colorsStr}
                <br></br>
                <button onClick={handleSubmit} className='btn btn-primary m-5'>Submit Answer</button>
            </div>
        </div>
    )
}