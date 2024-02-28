import { createServer } from "http";
import { Server } from "socket.io";
import { promises as fs } from 'fs';
import path from "path";

const generateWord = async () => {
  const filePath = path.join(process.cwd(), 'public/wordle/words.txt');
  console.log("Word is started generating")

  // try{
    const data = await fs.readFile(filePath, 'utf8');
  // }catch{
  //   console.error('Error reading the words file:', err);
  //   return 'Failed to read the words file';
  // }


  
  let words = data.split("\n").filter(Boolean);

  if (words.length === 0) {
      return 'No words found';
  }

  const wordIndex = Math.floor(Math.random() * words.length);
  const word = words[wordIndex].trim();
  /* words.splice(wordIndex, 1) */

  console.log('Random word:', word);
  return word
  
    // console.log('example data',data);
    // if (err) {
    //   console.error('Error reading the words file:', err);
    //   return 'Failed to read the words file';
    // }
    // let words = data.split("\n").filter(Boolean);
    
    // if (words.length === 0) {
    //   return 'No words found';
    // }

    // const wordIndex = Math.floor(Math.random() * words.length);
    // const word = words[wordIndex];
    // /* words.splice(wordIndex, 1) */

    // console.log('Random word:', word);

    /* DELETES CHOSEN WORD NEED TO UNCOMMENT AFTER TESTING*/
    /* words = words.filter((_, index) => index !== wordIndex); */

    /* fs.writeFile(filePath, words.join('\n'), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing the words file:', writeErr);
            return;
        }
        console.log('Word removed from the file');
    }); */
    // return word
}


// array of all games for all users
const wordle_games = []

// return one game state
const  createWordleGame = async (socket_session_id) => {
  
  return {
    id: socket_session_id,
    word: await generateWord(),
    trials_left: 6
  }
}

// searches for game and makes user input
// return [0,game.word[1],?,game.word[3],?]
// 0 no such letter
// ? there is one or more such letters but in the other positions
const handleUserInput = (socket_session_id, user_input_word) => {
  console.log(user_input_word);
  if (!user_input_word){
    return "Input must have a message"
  }
  
  // find game
  const game = wordle_games.filter(game => game.id == socket_session_id)[0]

  if(!game){
    return "No such game"
  }

  //Wordle Game Logic

  // winner is here, winner condition
  if(user_input_word == game.word){
    return {status: "winner", data: [game.word[0],game.word[1],game.word[2],game.word[3],game.word[4]]}
  }

  game.trials_left = game.trials_left - 1;

  const front_end_data = user_input_word.split("").map((user_letter, user_index)=>{
    // user guessed position and letter
    if(user_letter == game.word[user_index]){
      return game.word[user_index]
    }


    let hasMatch = false
    // user guessed only letter 
    game.word.split("").forEach((game_letter) => {
      if(user_letter == game_letter){
        hasMatch = true 
        return 
      }
    });

    if (hasMatch){
      return "?"
    }

    // no such letter 
    return "0"
  })

  if (game.trials_left == 0){
    return {status: "loser", data: front_end_data}
  }
  
  return {status: "game is going", data: front_end_data} 
}


const games = []
function getGameById(id){
  return games.filter((game)=>{
    if(game.getId() == id){
      return game
    }
  })[0]
}

// creating route at /api/socket
export default function SocketHandler(req, res) {
  // launching socket server
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')

    // socket server config
    const httpServer = createServer();
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // socket.io framework config
    io.on("connection", (socket) => {
      console.log("Client is Here: " + socket.id);

      // Creates Lobby and Joins one player 
      socket.on("create", (levelName) => {
        const newGame = new Game(levelName, socket.id)
        games.push(newGame)

        // Create a new room and join the socket to this room
        socket.join(newGame.getId());
        // Inform the client of the new room code
        socket.emit('room created', newGame.getId());
        console.log('Game Created With ID:', newGame.getId());
      });

      // Joins second player to the ready Lobby
      socket.on("join", (id) => {
        const game = getGameById(id)
        if (game) {
          game.joinPlayer(socket.id)

          socket.join(game.getId());
          // game start + last game state
          io.to(game.getId()).emit('game start', JSON.stringify( game ));
          // Inform the client of the new room code
          socket.emit('room joined', game.getId());
        }else{
          socket.emit('error', "no such game");
        }
      });

      // Fetching the game
      socket.on("get game", (id) => {
        const game = getGameById(id)
        if (game) {
          socket.emit('get game', JSON.stringify({ games }));
        }else{
          socket.emit('error', "no such game");
        }
      });

      socket.on("winner", (room) => {

      });

      
      socket.on("message", (message) => {
        console.log(message);
        io.to(message.room).emit("new_msg", message.text);
      });

      socket.on("join_chat", (room) => {
        socket.join(room);
        console.log(socket.id + " Joined the Room: " + room);
      });

      socket.on('takeTurn', (roomId, playerId, action) => {
          if (processTurn(roomId, playerId, action)) {
              // Broadcast the updated game state to both players
              io.to(roomId).emit('updateState', games[roomId]);

              // Optionally, notify players whose turn it is
              const nextPlayerId = games[roomId].players[games[roomId].currentPlayerIndex];
              io.to(roomId).emit('yourTurn', nextPlayerId);
          } else {
              socket.emit('error', 'Not your turn');
          }
        }); 

      // socket.on("makeMove", (room) => {

      // });

      socket.on("disconnect", () => {
        console.log("Client is Out: " + socket.id);
      });

      socket.on("new_wordle_game", async() => {
        const game = await createWordleGame(socket.id)
        wordle_games.push(game)
        console.log(JSON.stringify(game));
      })

      socket.on("user_input", (word) => {
        const data = handleUserInput(socket.id, word)
        socket.emit('game_data', JSON.stringify({ data }));
        console.log(data);
      })
    });

    httpServer.listen(3001, () => {
      console.log("Socket Server Started!");
    });


    res.socket.server.io = io
  }
  res.end()
}
