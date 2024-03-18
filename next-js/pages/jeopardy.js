import { useEffect, useMemo, useState } from "react";

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

  const maxClues = useMemo(() => {
    if (gameState) {
      return Math.max(
        ...gameState.categories.map((category) => category.clues.length)
      );
    } else {
      return 0;
    }
  }, [gameState]);

  return (
    <>
      <style jsx>{`
        table,
        th,
        td {
          border: 1px solid;
        }
      `}</style>
      {gameState && (
        <>
          {/* {gameState.id}
          <p>Player Turn Index: {playerIndex}</p> */}
          {/* <button onClick={makeMove}>Make Move</button>
          <input type='text' id="answer" /> */}

          <table>
            <thead>
              <tr style={{ border: "1px black solid" }}>
                {gameState.categories.map((category, i) => (
                  <th key={i}>{category.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: maxClues }).map((_, clueIndex) => (
                <tr key={clueIndex}>
                  {gameState.categories.map((category, categoryIndex) => (
                    <td key={categoryIndex}>
                      {category.clues[clueIndex] ? (
                        <button onClick={()=>alert(category.clues[clueIndex].question)}>{category.clues[clueIndex].clue_value}</button>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
