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
}

const up = {
    backgroundColor: "green",
    borderColor: "green"
}

const down = {
    backgroundColor: "red",
    borderColor: "red"
}

const netural = {
    backgroundColor: "grey",
    borderColor: "grey"
}


export default function Switches({ gameState, handleUserInputSubmit, setWinnerIndex }) {
    const [switchesState, setSwitchesState] = useState(["10", "00", "00", "00", "01"])

    // const handleSumbit 
    const handleSwitchesChange = (id, position) => {
        const temp = [...switchesState]
        if (position == "up") {
            temp[id] = "10"
        } else if (position == "down") {
            temp[id] = "01"
        }
        setSwitchesState(temp)
    }

    const handleSubmit = async () => {
        const response = await handleUserInputSubmit("switch", switchesState)
        if (response.includes("Winner")) {
            setWinnerIndex(prev => prev + 1)
        } else {
            document.getElementById("buttons_game").classList.add("alerts-border")
            setTimeout(() => {
                document.getElementById("buttons_game").classList.remove("alerts-border")
            }, "1000");
            console.log(response)
        }
    }

    return (
        <div id='buttons_game' style={mainStyle}>
            {gameState &&
                <>{JSON.stringify(gameState.switches.hint)}</>
            }
            <div className='d-flex flex-row'>
                {
                    switchesState.map((item, index) => {
                        return (
                            <div key={index} className="form-check d-flex flex-column">
                                <input onChange={() => { handleSwitchesChange(index, "up") }} style={item == "10" ? up : null} checked={item == "10"} className="scale_2 form-check-input m-2" type="radio" name={"switch_" + index} id={"up_switch_" + index} />

                                <input style={item == "00" ? netural : null} checked={item == "00"} className="scale_2 form-check-input m-2" type="radio" name={"switch_" + index} id={"netural_switch_" + index} disabled />

                                <input onChange={() => { handleSwitchesChange(index, "down") }} style={item == "01" ? down : null} checked={item == "01"} className="scale_2 form-check-input m-2" type="radio" name={"switch_" + index} id={"down_switch_" + index} />
                            </div>
                        )
                    })
                }
            </div>

            <button onClick={handleSubmit} className='btn btn-primary m-5'>Submit Switches</button>
        </div>
    )
}