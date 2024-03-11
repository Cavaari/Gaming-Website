import { isWinner } from "@/lib/puzzle"

// ex: /api/puzzle/new?id=socket_id
export default function handler(req, res) {
    if (req.query.id) {
        res.status(200).json(isWinner(req.query.id))
    } else {
        res.status(400).json('Wrong Id!')
    }
}