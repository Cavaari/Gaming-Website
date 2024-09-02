import { promises as fs } from 'fs';
import path from "path";


const riddle_games = []

const createNewRiddleGame = async (socket_session_id) =>{
  const {encoded, shift, answer} = await encodeRandomRiddle()
  riddle_games.push( {
    id: socket_session_id,
    riddle: encoded,
    answer: answer,
    shift: shift, 
    trials_left: 6,
    is_win: false
  })
}

const findRiddleGame = (socket_session_id) => {
    const game = riddle_games.filter(game => game.id == socket_session_id)[0]

    if (!game) {
        return false
    }

    return game
}

const handleRiddleGameInput = (socket_session_id, user_input_word) => {
  if (!user_input_word) {
    return "Input must have a message"
  }

  // find game
  const game = findRiddleGame(socket_session_id)

  if (!game) {
    return "No such game"
  }

  if(user_input_word == game.answer){
    game.is_win = true
    return "Secret is broken"
  }else{
    return "Try more"
  }
}

const isRiddleGameWinner = (socket_session_id) =>{
  // find game
  const game = findRiddleGame(socket_session_id)
  if (!game) {
    return false
  }


  return game.is_win
}

/* Use this function to encode the riddle PATH might need to be updated*/
async function encodeRandomRiddle() {
  const riddlesPath = path.join(process.cwd(), 'lib/riddles/riddles.csv');
  const randomRiddle = await getRandomRiddle(riddlesPath);
  const encodedRiddle = encodeCSV(randomRiddle)
  return encodedRiddle
}
async function getRandomRiddle(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  const lines = data.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  const randomLine = nonEmptyLines[Math.floor(Math.random() * nonEmptyLines.length)];
  return randomLine;
}
function encodeCSV(csvContent) {
  const shift = Math.floor(Math.random() * 25) + 1;
  
  const encode = (text, shift) => {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) { 
        let base = char >= 'A' && char <= 'Z' ? 65 : 97;
        let code = ((char.charCodeAt(0) - base + shift) % 26) + base; 
        return String.fromCharCode(code);
      }
      return char;
    }).join('');
  };
  
  let answer = ""
 
  const parts = csvContent.split(','); 
  const riddle = parts.slice(0, parts.length - 1).join(','); 
  answer = parts[parts.length - 1].trim(); 
  const encoded = encode(riddle, shift).trim()
  
  return {
      encoded,
      shift,
      answer
  };
}

export {createNewRiddleGame, findRiddleGame, handleRiddleGameInput, isRiddleGameWinner}