import { promises as fs } from 'fs';
import path from "path";


// array of all games for all users
const wordle_games = []

// wordle gamelogic : backend
const generateWord = async () => {
    const filePath = path.join(process.cwd(), 'public/wordle/words.txt');
    console.log("Word is started generating")

    const data = await fs.readFile(filePath, 'utf8');

    let words = data.split("\n").filter(Boolean);

    if (words.length === 0) {
        return 'No words found';
    }

    const wordIndex = Math.floor(Math.random() * words.length);
    const word = words[wordIndex].trim();
    /* words.splice(wordIndex, 1) */

    console.log('Random word:', word);
    return word

}

// adds new game to wordle_games state array
const createNewWordleGame = async (socket_session_id) => {
    wordle_games.push({
        id: socket_session_id,
        word: await generateWord(),
        trials_left: 6
    })
}

const findWordleGame = (socket_session_id) => {
    const game = wordle_games.filter(game => game.id == socket_session_id)[0]

    if (!game) {
        return false
    }

    return game
}

// searches for game and makes user input
// return [0,game.word[1],?,game.word[3],?]
// 0 no such letter
// ? there is one or more such letters but in the other positions
const handleWordleInput = (socket_session_id, user_input_word) => {
    console.log(user_input_word);
    if (!user_input_word) {
        return "Input must have a message"
    }

    // find game
    const game = findWordleGame(socket_session_id)

    //Wordle Game Logic
    // winner is here, winner condition
    if (user_input_word == game.word) {
        return { status: "winner", data: [game.word[0], game.word[1], game.word[2], game.word[3], game.word[4]] }
    }

    game.trials_left = game.trials_left - 1;

    const front_end_data = user_input_word.split("").map((user_letter, user_index) => {
        // user guessed position and letter
        if (user_letter == game.word[user_index]) {
            return game.word[user_index]
        }


        let hasMatch = false
        // user guessed only letter 
        game.word.split("").forEach((game_letter) => {
            if (user_letter == game_letter) {
                hasMatch = true
                return
            }
        });

        if (hasMatch) {
            return "?"
        }

        // no such letter 
        return "0"
    })

    if (game.trials_left == 0) {
        return { status: "loser", data: front_end_data }
    }

    return { status: "game is going", data: front_end_data }
}


export { createNewWordleGame, findWordleGame, handleWordleInput, generateWord }