import { generateWord } from './wordle';

// IDEA: three mini games
// 1: wordle
// 2: color wires 
// 3: switches

const puzzle_games = []

async function createNewPuzzleGame (socket_session_id){
    puzzle_games.push({
    id: socket_session_id,
    wordle: {
      word: await generateWord(),
      trials_left: 6,
      is_win: false
    },
    color_wires:{ // make generation function
      wire: "red",
      hint: "select not green",
      is_win: false
    },
    switches:{ // make generation function
      positions: ["00", "11", "01", "10"],
      is_win: false
    },
  })
}

function findPuzzleGame (socket_session_id){
  // find game
  const game = puzzle_games.filter(game => game.id == socket_session_id)[0]

  if (!game) {
    return false
  }

  return game
}



function randomWire() {
    const wires = ["red", "blue", "purple", "green", "white"]
    const random = Math.floor(Math.random() * wires.length);
    return wires[random]
}


// function for user input of color wordle game
function handlePuzzleWordleInput (socket_session_id, input){
    if (!input) {
      return "Input must have a message"
    }
  
    const game = findPuzzleGame(socket_session_id)
    if(game){
      //Wordle Game Logic
    
      // winner is here, winner condition
      if (input == game.wordle.word) {
        return { status: "winner", data: [game.wordle.word[0], game.wordle.word[1], game.wordle.word[2], game.wordle.word[3], game.wordle.word[4]] }
      }
    
      game.wordle.trials_left = game.wordle.trials_left - 1;
    
      const front_end_data = input.split("").map((user_letter, user_index) => {
        // user guessed position and letter
        if (user_letter == game.wordle.word[user_index]) {
          return game.wordle.word[user_index]
        }
    
    
        let hasMatch = false
        // user guessed only letter 
        game.wordle.word.split("").forEach((game_letter) => {
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
    
      if (game.wordle.trials_left == 0) {
        return { status: "loser", data: front_end_data }
      }
    
      return { status: "game is going", data: front_end_data }
    }
}

// function for user input of color wires game
function handlePuzzleColorWiresInput (socket_session_id, input){}

// function for user input of switches game
function handlePuzzleSwitchesInput (socket_session_id, input){}


// OR just one handlePuzzleInput (socket_session_id, input) ??? 


export {createNewPuzzleGame, findPuzzleGame}