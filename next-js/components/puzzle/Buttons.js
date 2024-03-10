import {useState} from 'react';

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

export default function Buttons ({setWinnerIndex, gameState, handleUserInputSubmit}){
    const [colorsStr, setColorsStr] = useState("")
    
    const handleColorClick = (color) =>{
        setColorsStr(prev => prev + color + ", ")
    }

    const resetColorButtons = () =>{
        setColorsStr("")
    }
    
    const handleSubmit = async() =>{
        console.log(colorsStr.slice(0, -2));
        const response = await handleUserInputSubmit("color poem", colorsStr.slice(0, -2))
        console.log(response);
        if (response.includes("Winner")) {
            setWinnerIndex(prev => prev + 1)
        } else {
            console.log("Try Again...")
        }
        resetColorButtons()
    }
    
    return (
        <div style={mainStyle}>
            {gameState &&
                <>{JSON.stringify(gameState.buttons.hint)}</>
            }
        <div class="btn-group"style={buttonStyle.default} role="group" aria-label="Vertical radio toggle button group">
            <input disabled={colorsStr.includes("red")} onClick={()=>handleColorClick("red")} type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off"></input>
            <label class="btn btn-danger" for="vbtn-radio1">Red</label>
            <input disabled={colorsStr.includes("yellow")} onClick={()=>handleColorClick("yellow")} type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off"></input>
            <label class="btn btn-warning" for="vbtn-radio2">Yellow</label>
            <input disabled={colorsStr.includes("green")} onClick={()=>handleColorClick("green")} type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio3" autocomplete="off"></input>
            <label class="btn btn-success" for="vbtn-radio3">Green</label>
            <input disabled={colorsStr.includes("white")} onClick={()=>handleColorClick("white")} type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio4" autocomplete="off"></input>
            <label class="btn btn-light" for="vbtn-radio4">White</label>
        </div><br></br>
        <div style={{textAlign:'center'}}>
            <h5>Your Answer</h5>
            {colorsStr}
            <br></br>
            <button onClick={handleSubmit} className='btn btn-primary m-5'>Submit Answer</button>
        </div>
        </div>
    )
}