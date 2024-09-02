
import { findPuzzleGame } from "@/lib/puzzle"

// ex: /api/puzzle/timeout?id=socket_id
export default function handler(req, res) {
    if(!req.query.id){
        res.status(400).json({ message: 'Provide Socket!' })
    }

    const game = findPuzzleGame(req.query.id)
    if(!game){
        res.status(404).json({ message: 'No Such Game!' })
    }


    return res.status(200).json({ message: timeoutPuzzle(req.query.id) })
}