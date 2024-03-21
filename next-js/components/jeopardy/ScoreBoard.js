
import { useEffect } from "react"
export default function ScoreBoard({players}) {
    useEffect(()=>{
        window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
        // modalRef.current = new bootstrap.Modal(document.getElementById('clue-modal'))
    },[])
    return (
        <div id="clue-modal" className="modal fade" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h5 className="modal-title text-center">{clue ? clue.clue_value : ""}</h5> */}
                        yo
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/* <p>{clue ? clue.question : ""}</p> */}
                        hi
                    </div>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}