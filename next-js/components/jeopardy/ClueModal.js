import { useEffect, useState } from "react";


import JeopardyContext from "./JeopardyContext";
import { useContext } from "react";

export default function ClueModal({ modalRef }) {

    const { gameState, setGameState, currentClue, currentAnswers, currentPlayer, currentCategory } = useContext(JeopardyContext)


    useEffect(() => {
        window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
        modalRef.current = new bootstrap.Modal(document.getElementById('clue-modal'));
    }, [modalRef])

    const [status, setStatus] = useState("Not Answered!")

    async function checkAnswer(answer) {
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
            setStatus("Wrong!")
        } else if (parsed_data.msg == "Correct!") {
            setStatus("Correct!")
        }

        setTimeout(() => {
            modalRef.current.hide()
            setStatus("Not Answered!")
          }, "1000");
        
    }

    return (
        <div id="clue-modal" className="modal fade" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className={"modal-content " + (status == "Wrong!" ? "border-danger" : "") + (status == "Correct!" ? "border-success" : "")}>
                    <div className="modal-header">
                        <h5 className="modal-title text-center">{currentClue ? currentClue.clue_value : ""}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{currentClue ? currentClue.question : ""}</p>
                    </div>
                    <div className="modal-footer d-flex alig-items-center justify-content-between">
                        { status == "Not Answered!" && 
                            <>
                            {currentAnswers &&
                                currentAnswers.map((answer, index) => (

                                    <span key={index} className="btn btn-primary m-1" onClick={() => { checkAnswer(answer) }}>{answer}</span>

                                ))
                            }
                            </>
                        }

                        { status == "Wrong!" && 
                            <>
                                <span className="w-100 fs-3 fw-bold text-center shaking">Wrong!</span>
                            </>
                        }

                        { status == "Correct!" && 
                            <>
                                <span className="w-100 fs-3 fw-bold text-center shaking">Correct!</span>
                            </>
                        }
                        
                    </div>
                </div>
            </div>
        </div >
    )
}