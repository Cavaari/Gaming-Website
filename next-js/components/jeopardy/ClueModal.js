import { useEffect } from "react";

export default function ClueModal({clue, modalRef, currentAnswers}) {
    useEffect(()=>{
        window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
        modalRef.current = new bootstrap.Modal(document.getElementById('clue-modal'));
    },[modalRef])

    function checkAnswer(answer) {
        // TBD: Checking answer (string) and getting T or F from backend
        // if (response) {
            
        // } else {

        // }
        answer = answer;
    }
    
    return (
        <div id="clue-modal" className="modal fade" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center">{clue ? clue.clue_value : ""}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{clue ? clue.question : ""}</p>
                    </div>
                    <div className="modal-footer">
                        {currentAnswers &&
                            currentAnswers.map((answer, i)=>(
                                <button className="btn btn-primary" onClick={checkAnswer({answer})}>{answer}</button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}