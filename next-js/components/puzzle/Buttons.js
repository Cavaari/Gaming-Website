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
        <div id='buttons_game' className="buttons-game">
          {gameState &&
            <div className="hint-text">{gameState.buttons.hint}</div>
          }
          <div className="btn-group" role="group" aria-label="Button group with nested radio toggle button group">
            <input disabled={colorsStr.includes("red")} onClick={() => handleColorClick("red")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" />
            <label className="btn btn-danger custom-btn" htmlFor="vbtn-radio1">Red</label>
            
            <input disabled={colorsStr.includes("yellow")} onClick={() => handleColorClick("yellow")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" />
            <label className="btn btn-warning custom-btn" htmlFor="vbtn-radio2">Yellow</label>
            
            <input disabled={colorsStr.includes("green")} onClick={() => handleColorClick("green")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autoComplete="off" />
            <label className="btn btn-success custom-btn" htmlFor="vbtn-radio3">Green</label>
            
            <input disabled={colorsStr.includes("white")} onClick={() => handleColorClick("white")} type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio4" autoComplete="off" />
            <label className="btn btn-light custom-btn" htmlFor="vbtn-radio4">White</label>
          </div>
          <div className="answer-section">
            <h5>Your Answer</h5>
            <div className="answer-display">{colorsStr}</div>
            <button onClick={handleSubmit} className='btn btn-primary submit-btn'>Submit Answer</button>
          </div>
      
          <style jsx>{`
            .buttons-game {
              text-align: center;
              padding: 20px;
            }
      
            .hint-text {
              margin-bottom: 1rem;
              font-size: 1.2rem;
            }
      
            .btn-group {
              display: flex;
              justify-content: center;
              margin-bottom: 1rem;
            }
      
            .custom-btn {
              margin: 0 0.5rem;
              border: 2px solid black;
              border-radius: 15px;
            }
      
            .answer-section {
              margin-top: 2rem;
            }
      
            .answer-display {
              font-weight: bold;
              margin: 1rem 0;
            }
      
            .submit-btn {
              margin-top: 1rem;
              border: 2px solid black;
              border-radius: 15px; 
            }
          `}</style>
        </div>
      );
      
}