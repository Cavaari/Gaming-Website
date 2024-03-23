import { useEffect } from "react";


import JeopardyContext from "./JeopardyContext";
import { useContext } from "react";

export default function ClueModal({ modalRef }) {

    const { gameState, setGameState, currentClue, currentAnswers, currentPlayer, currentCategory } = useContext(JeopardyContext)


    useEffect(() => {
        window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
        modalRef.current = new bootstrap.Modal(document.getElementById('clue-modal'));
    }, [modalRef])

    async function checkAnswer(answer) {
        // console.log(gameState.id);
        // console.log(currentCategory);
        // console.log(currentClue.question);
        // console.log(currentPlayer.name);
        // console.log(answer);

        const r = await fetch(
            `${process.env.HOST_URL}/api/jeopardy/make_move?` +
            new URLSearchParams({
                id: gameState.id,
                player_name: currentPlayer.name,
                category: currentCategory,
                question: currentClue.question,
                answer: answer,
            })
        );
        const data = await r.json();
        const parsed_data = JSON.parse(data);

        console.log(JSON.parse(parsed_data.game_data));

        setGameState(JSON.parse(parsed_data.game_data))

        if (parsed_data.msg == "Wrong!") {
            alert("Wrong!")
        } else if (parsed_data.msg == "Correct!") {
            alert("Correct!")
        }

        modalRef.current.hide()
    }

    return (
        <div id="clue-modal" className="modal fade" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center">{currentClue ? currentClue.clue_value : ""}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{currentClue ? currentClue.question : ""}</p>
                    </div>
                    <div className="modal-footer d-flex alig-items-center justify-content-between">
                        {currentAnswers &&
                            currentAnswers.map((answer, index) => (

                                <span key={index} className="btn btn-primary m-1" onClick={() => { checkAnswer(answer) }}>{answer}</span>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}