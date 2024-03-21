import { useRouter } from 'next/router';
import React, { useState } from 'react';

const colourNames = ['Red', 'Green', 'Yellow', 'Blue', 'Orange', 'Purple'];

const mainStyle = {
  backgroundColor: "#cccaca",
  margin: 15,
  padding: 15,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
};

const wireStyles = {
  default: {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    border: '2px solid #000',
    display: 'flex',
    flexDirection: 'column', // Change to column to help with vertical text alignment
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    width: '40px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  textBorder: {
    writingMode: 'vertical-rl', // Make the text vertical
    textOrientation: 'upright', // Ensure letters are upright
    // textShadow: `
    //   -1px -1px 0 #000,  
    //    1px -1px 0 #000,
    //   -1px  1px 0 #000,
    //    1px  1px 0 #000;`,
    textShadow: "2.5px 2.5px var(--second-color)" // Simulate black border around text
  },
  colors: [
    { backgroundColor: '#e6194B' }, // Red
    { backgroundColor: '#3cb44b' }, // Green
    { backgroundColor: '#ffe119' }, // Yellow
    { backgroundColor: '#4363d8' }, // Blue
    { backgroundColor: '#f58231' }, // Orange
    { backgroundColor: '#911eb4' }, // Purple
  ],
  cut: {
    transform: 'translateY(20px) rotate(45deg)',
    opacity: 0.5,
    borderColor: '#333',
  },
};

const Wires = ({ handleUserInputSubmit, gameState, setWinnerIndex }) => {
  const router = useRouter()

  const [selectedWire, setSelectedWire] = useState(null);

  const handleWireSelection = async (index) => {
    setSelectedWire(index);
    const response = await handleUserInputSubmit("wire", colourNames[index]);
    if (response.includes("Winner")) {
      setWinnerIndex((prev) => prev + 1);
    } else {
      router.push("/lose")
      // document.getElementById("buttons_game").classList.add("alerts-border")
      // setTimeout(() => {
      //   document.getElementById("buttons_game").classList.remove("alerts-border")
      // }, "1000");
      // console.log(response)
    }
  };

  return (
    <div id='wires_game' style={mainStyle}>
      <div className="alert alert-warning text-center" style={{ margin: 15 }}>
        <strong>Congratulations!! One step further away from death, but It’s not over yet. One wire must be cut so
        pick up the pliers and be careful. One bad decision and it may be your last.</strong><br/>
        The phone buzzed, JigSaw texted you!
      </div>
      {gameState &&
        <p className="fw-bold alert alert-primary fw-bold text-center" style={{ color: "var(--first-color)", background: "var(--second-color)"}}>
          {gameState.color_wires.hint}
          <span className="position-absolute align-items-right top-0 start-100 translate-middle p-2">
            <img src="/puzzle/jigsaw.png" height={70} width={70}></img>
          </span>
        </p>
      }
      <div className="wire-container" style={{ display: "flex" }}>
        {wireStyles.colors.map((style, index) => (
          <div
          key={index}
          style={{
            ...wireStyles.default,
            ...style,
            ...(selectedWire === index ? wireStyles.cut : {}),
          }}
          onClick={() => handleWireSelection(index)}
          disabled={selectedWire !== null}
        >
          <span style={wireStyles.textBorder}>{colourNames[index]}</span> {/* Wrap text for styling */}
        </div>
        ))}
      </div>
    </div>
  );
};

export default Wires;
