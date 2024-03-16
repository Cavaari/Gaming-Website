import { makeMove } from "@/lib/jeopardy/jeopardy"

export default async function handler(req, res) {
    if (!req.query.id) {
        res.status(400).json('Provide Game ID!')
    }

    if (!req.query.player_index) {
        res.status(400).json('Provide Player Index!')
    }

    if (!req.query.category) {
        res.status(400).json('Provide Category!')
    }

    if (!req.query.question) {
        res.status(400).json('Provide Question!')
    }

    if (!req.query.answer) {
        res.status(400).json('Provide Answer!')
    }


    res.status(200).json(makeMove(req.query.id, req.query.player_index, req.query.category, req.query.question, req.query.answer))
}