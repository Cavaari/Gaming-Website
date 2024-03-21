"use client"
import { useEffect, useState } from "react";

export default function Jeopardy() {
  const [gameState, setGameState] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(0);

  useEffect(() => {
    const fetchNewGame = async () => {
      const r = await fetch(`${process.env.HOST_URL}/api/jeopardy/new?`);
      const data = await r.json();
      setGameState(JSON.parse(data));
      console.log(JSON.parse(data));
    };
    fetchNewGame();
  }, []);

  const makeMove = async () => {
    const user_answer = document.getElementById("answer").value;

    if (user_answer) {
      const r = await fetch(
        `${process.env.HOST_URL}/api/jeopardy/make_move?` +
        new URLSearchParams({
          id: gameState.id,
          player_index: playerIndex,
          category: gameState.categories[0].name,
          question: gameState.categories[0].clues[0].question,
          answer: document.getElementById("answer").value,
        })
      );
      const data = await r.json();

      if (data == "Wrong!") {
        setPlayerIndex((prev) => (prev + 1) % 3);
      } else if (data == "Correct!") {
      }

      console.log(data);
    }
  };



  return (
    <div className="container">
      <div className="mt-5 row row-cols-4 d-flex align-items-center justify-content-center">
        {gameState && (
          <>
            {/* {gameState.id}
          <p>Player Turn Index: {playerIndex}</p> */}
            {/* <button onClick={makeMove}>Make Move</button>
          <input type='text' id="answer" /> */}


                {gameState.categories.map((category, i) => (
                  <span className="fs-6 fw-bold text-secondary text-center mb-3" key={i}>{category.name}</span>
                ))}


                {gameState.categories.map((category, i) => (
                  <div className="d-flex flex-column" key={i}>
                    {
                      category.clues.map((clue, j)=>(
                        <button onClick={() => alert(clue.question)} className={"fw-bold m-1 btn btn-primary text-secondary pt-3 pb-3 " + `fs-${6 - j}`} key={j}>{clue.clue_value}</button>
                      ))
                    }
                  </div>
                ))}

                
          </>
        )}
      </div>


    </div>
  );
}
