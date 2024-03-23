"use client"

import { useEffect, useState, useRef, useMemo } from "react";
import ClueModal from "@/components/jeopardy/ClueModal";
import ScoreBoard from "@/components/jeopardy/ScoreBoard";



import JeopardyContext from "@/components/jeopardy/JeopardyContext";



export default function Jeopardy() {
  const [gameState, setGameState] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(0);

  const [currentClue, setCurrentClue] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);


  const currentPlayer = useMemo(() => {
    if (gameState) {
      const player = gameState.players.filter(player => {
        if (player.is_turn) {
          return player
        }
      })[0];
      return player
    }
  }, [gameState])

  const [currentAnswers, setCurrentAnswers] = useState(null);

  const modalRef = useRef(null)

  useEffect(() => {
    const fetchNewGame = async () => {
      const r = await fetch(`${process.env.HOST_URL}/api/jeopardy/new?`);
      const data = await r.json();
      setGameState(JSON.parse(data));
      console.log(JSON.parse(data));
    };
    fetchNewGame();
  }, []);



  return (
    <JeopardyContext.Provider value={{ gameState, setGameState, currentClue, currentAnswers, currentPlayer, currentCategory }}>
      <div className="container">
        <div className="mt-5 row row-cols-4 d-flex align-items-center justify-content-center">
          {gameState && (
            <>
              {gameState.categories.map((category, i) => (
                <span className="fs-6 fw-bold text-secondary text-center mb-3" key={i}>{category.name}</span>
              ))}


              {gameState.categories.map((category, i) => (
                <div className="d-flex flex-column" key={i}>
                  {
                    category.clues.map((clue, j) => (
                      <button onClick={() => { setCurrentCategory(category.name); setCurrentAnswers(category.answers); setCurrentClue(clue); modalRef.current.toggle(); }} className={(clue.is_solved ? "disabled " : "") + "fw-bold m-1 btn btn-primary text-secondary pt-3 pb-3 " + `fs-${6 - j}`} key={j}>{clue.clue_value}</button>
                    ))
                  }
                </div>
              ))}
              <ClueModal modalRef={modalRef} />
            </>
          )}
        </div>

        <ScoreBoard players={3} />

      </div>
    </JeopardyContext.Provider>
  );
}
