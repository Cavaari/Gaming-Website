import { createNewPuzzleGame } from "@/lib/puzzle"

// ex: /api/puzzle/new?id=socket_id
export default function handler(req, res) {
    if (req.query.id) {
        const game = createNewPuzzleGame(req.query.id)
        // return to user only hints
        res.status(201).json({
            buttons: {
                hint: game.buttons.hint,
            },
            color_wires: { 
                hint: game.color_wires.hint,
            },
            switches: { 
                hint: game.switches.hint,
            },
        })
    } else {
        res.status(400).json({ message: 'Wrong Socket!' })
    }
}