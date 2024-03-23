import { generateGame } from "@/lib/jeopardy/jeopardy";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default async function handler(req, res) {
    const game = await generateGame(3)
    // return to user only hints
    res.status(201).json(JSON.stringify({
        id: game.id,
        players: game.players.map((player)=>{
            return {
                name: player.name,
                score: player.score,
                is_turn: player.is_turn
            }
        }),
        categories: game.categories.map(
            (category) => {
                const answers = category.clues.map((clue) => {
                    return clue.answer
                })
                shuffleArray(answers)
                return {
                    name: category.name, clues: category.clues.map(
                        (clue) => {
                            return {
                                question: clue.question, clue_value: clue.clue_value, clue_bonus_value: clue.clue_bonus_value, is_solved: clue.is_solved
                            }
                        }),
                    answers: answers,
                }
            })
    }))
}