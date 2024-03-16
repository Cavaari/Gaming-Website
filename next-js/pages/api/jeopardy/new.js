import { generateGame } from "@/lib/jeopardy/jeopardy"


export default async function handler(req, res) {
    const game = await generateGame(3)
    // return to user only hints
    res.status(201).json(JSON.stringify({
        id: game.id,
        categories: game.categories.map(
            (category) => {
                return {
                    name: category.name, clues: category.clues.map(
                        (clue) => {
                            return {
                                question: clue.question, clue_value: clue.clue_value, clue_bonus_value: clue.clue_bonus_value
                            }
                        })
                }
            })
    }))
}