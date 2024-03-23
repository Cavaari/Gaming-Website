import { generateGame, gameToJSON } from "@/lib/jeopardy/jeopardy";




export default async function handler(req, res) {
    const game = await generateGame(3)
    // return to user only hints
    res.status(201).json(gameToJSON(game))
}