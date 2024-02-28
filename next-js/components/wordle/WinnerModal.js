"use client"
import { useEffect } from "react"



export default function WinnerModal({modalRef, title}) {
    useEffect(()=>{
        if(modalRef.current == null){
            const { Modal } = require("bootstrap")
            modalRef.current = new Modal("#winner-modal")
        }
    },[modalRef])

    return (
        <>
            <div id="winner-modal" className="modal" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Winner</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Winner Winner Winner</p>
                            <p>Lets go to the secret page</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}