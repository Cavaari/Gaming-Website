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
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    width: '40px',
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
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
  const [selectedWire, setSelectedWire] = useState(null);

  const handleWireSelection = async (index) => {
    setSelectedWire(index);
    const response = await handleUserInputSubmit("wire", colourNames[index]);
    if (response.includes("Winner")) {
      setWinnerIndex((prev) => prev + 1);
    } else {
      document.getElementById("buttons_game").classList.add("alerts-border")
      setTimeout(() => {
        document.getElementById("buttons_game").classList.remove("alerts-border")
      }, "1000");
      console.log(response)
    }
  };

  return (
    <div id='buttons_game' style={mainStyle}>
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
            {colourNames[index]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wires;
