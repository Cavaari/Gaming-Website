import React, { useState, useMemo, useEffect, useRef } from "react";

export default function LabyrinthGame() {
  const [stage, setStage] = useState(1);
  const [adventureStatus, setAdventureStatus] = useState("exploring");
  const [adventurerPosition, setAdventurerPosition] = useState({ row: 0, col: 0 });
  const labyrinthSize = 8;
  const labyrinth = useMemo(() => generateLabyrinth(labyrinthSize, labyrinthSize), [stage]);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    gameContainerRef.current.focus();
  }, []);
  
  useEffect(() => {
    const isAtFinishLine = adventurerPosition.row === labyrinth.length - 1 && adventurerPosition.col === labyrinth[0].length - 1;
    if (isAtFinishLine) {
      setAdventureStatus("triumphed");
    }
  }, [adventurerPosition, labyrinth]);

  const handleAdventurerMove = (event) => {
    if (adventureStatus !== "exploring") return;
    const { row, col } = adventurerPosition;
    let newRow = row;
    let newCol = col;
  
    switch (event.key) {
      case "ArrowUp":
        if (labyrinth[row][col][0] === 1) newRow -= 1;
        break;
      case "ArrowRight":
        if (labyrinth[row][col][1] === 1) newCol += 1;
        break;
      case "ArrowDown":
        if (labyrinth[row][col][2] === 1) newRow += 1;
        break;
      case "ArrowLeft":
        if (labyrinth[row][col][3] === 1) newCol -= 1;
        break;
      default:
        return; 
    }
  
    setAdventurerPosition({ row: newRow, col: newCol });
    event.preventDefault();
  };
  
  const handleNextStage = () => {
    if (stage < 3) {
      setStage(stage + 1);
      setAdventurerPosition({ row: 0, col: 0 });
      setAdventureStatus("exploring");
    }
  };

  // Some useStyles and other are inline in the return
  const useStyles = {
    canvasFrame: {
      border: '4px solid var(--bs-text)',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#efebf6', // same colour as light mode bg
      tabIndex: 0, 
    },
  };

  // labyrinth and adventurer UI being rendered
  return (
    <>
      <h1 className="mt-5 mb-4 text-center">Welcome to the Labyrinth</h1>
      <p className="text-center d-flex flex-column justify-content-center mx-auto mb-5" style={{fontSize: "1.5rem", width: '50%'}}>
        This game has 3 levels, solve them and win the game! 
        To navigate, use the arrow keys and good luck </p>
      <div className="d-flex justify-content-center">
        <div
          className="canvas LabyrinthGame mt-70px"
          onKeyDown={handleAdventurerMove}
          tabIndex={0}
          ref={gameContainerRef}
          style={{ ...useStyles.canvasFrame, color: 'black' }} 
        >
          <p> Current Stage: {stage}</p>
          <LabyrinthDisplay labyrinth={labyrinth} adventurerPosition={adventurerPosition} />
          {adventureStatus === "triumphed" && (
            <div className="mt-20 align-items-center #efebf6"> 
              {stage < 3 ? (
                <button className="btn btn-primary mt-2" onClick={handleNextStage}> 
                  Continue to next stage
                </button>
              ) : (
                <h5 className="mt-4 flex-column">Congratulations, you've completed all stages!</h5>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

//  display the labyrinth
function LabyrinthDisplay({ labyrinth, adventurerPosition }) {
    return (
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {labyrinth.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, colIndex) => (
                <LabyrinthCell key={`cell-${rowIndex}-${colIndex}`} cell={cell} rowIndex={rowIndex} colIndex={colIndex} adventurerPosition={adventurerPosition} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  // individual cells in the labyrinth
  function LabyrinthCell({ cell, rowIndex, colIndex, adventurerPosition }) {
    const isDestination = rowIndex === labyrinth.length - 1 && colIndex === labyrinth[0].length - 1;
    const isCurrentPosition = rowIndex === adventurerPosition.row && colIndex === adventurerPosition.col;
    const baseStyle = {
      width: '50px',
      height: '50px',
      backgroundColor: '#efebf6',
      boxSizing: 'border-box',
      border: '1px solid rgba(206, 206, 206, 0.9)',
    };
  
    if (isCurrentPosition) baseStyle.backgroundColor = '#ffca80';
    if (isDestination) baseStyle.backgroundColor = '#8093ff';
  
    //  labyrinth walls borders
    if (cell[0] === 0) baseStyle.borderTop = '4px solid #331';
    if (cell[1] === 0) baseStyle.borderRight = '4px solid #332';
    if (cell[2] === 0) baseStyle.borderBottom = '4px solid #333';
    if (cell[3] === 0) baseStyle.borderLeft = '4px solid #334';
  
    return <td style={baseStyle}><div/></td>;
  }
  
  // generate labyrinth
  function generateLabyrinth(width, height) {
      const labyrinth = Array.from({ length: height }, () => Array.from({ length: width }, () => [0, 0, 0, 0]));
      const stack = [];
      let visitedCells = 1;
      let currentCell = { row: Math.floor(Math.random() * height), col: Math.floor(Math.random() * width) };
      labyrinth[currentCell.row][currentCell.col] = [1, 1, 1, 1];
      stack.push(currentCell);
  
      while (visitedCells < width * height) {
          const { row, col } = currentCell;
          const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
          const neighbors = dirs.reduce((acc, [dRow, dCol]) => {
              const newRow = row + dRow, newCol = col + dCol;
              if (labyrinth[newRow]?.[newCol]?.every(wall => wall === 0)) acc.push({ row: newRow, col: newCol });
              return acc;
          }, []);
  
          if (neighbors.length > 0) {
              const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
              const xDiff = currentCell.col - nextCell.col, yDiff = currentCell.row - nextCell.row;
              const [rmFromCurrent, rmFromNext] = xDiff ? [xDiff === 1 ? 3 : 1, xDiff === 1 ? 1 : 3] : [yDiff === 1 ? 0 : 2, yDiff === 1 ? 2 : 0];
              labyrinth[currentCell.row][currentCell.col][rmFromCurrent] = 1;
              labyrinth[nextCell.row][nextCell.col][rmFromNext] = 1;
              visitedCells++, stack.push(currentCell), currentCell = nextCell;
          } else if (stack.length > 0) currentCell = stack.pop();
      }
  
      return labyrinth;
  }
  
}