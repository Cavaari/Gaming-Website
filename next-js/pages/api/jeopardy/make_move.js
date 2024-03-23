import { makeMove } from "@/lib/jeopardy/jeopardy"

export default async function handler(req, res) {
    if (!req.query.id) {
        res.status(400).json('Provide Game ID!')
    }

    if (!req.query.player_name) {
        res.status(400).json('Provide Player Name!')
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
    const player_index = parseInt(req.query.player_name[req.query.player_name.length - 1]) - 1


    res.status(200).json(makeMove(req.query.id, player_index, req.query.category, req.query.question, req.query.answer))
}