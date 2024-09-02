import JeopardyContext from "./JeopardyContext";
import { useContext } from "react";
export default function ScoreBoard({ }) {
    const { gameState } = useContext(JeopardyContext)
    return (
        <div className="p-2 mt-4 rounded">
            <h2 className="text-secondary">Scoreboard</h2>
            {gameState &&

                <div className="alig-items-center justify-content-between">
                    {
                        gameState.players.map((player, index) => (
                            <button key={index} className={"fw-bold m-1 text-secondary btn btn-warning " + (player.is_turn ? "active" : "")}>
                                <span className="me-5">{player.name.charAt(0).toUpperCase() + player.name.slice(1).replace("_", " ")}</span>
                                <span className="ms-5">{player.score}</span>
                            </button>

                        ))
                    }
                </div>

            }
        </div>
    );
}
