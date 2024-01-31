import { createServer } from "http";
import { Server } from "socket.io";

// In socket.js or CustomSocket.js
function generateRoomCode() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function reshuffleSpecialCards(level) {
  level = level.flat();
}

function playRound(levelName) {
  let currentRound = 0;
  const roundsBeforeReshuffle = 2;

  let level = generateLevel(levelName)

  /* Logic for handling player moves/matches/cardflips */

  /* after a move has been made */
  currentRound++;

  if (currentRound % roundsBeforeReshuffle === 0) {
    reshuffleSpecialCards(level);
    console.log("Special cards have been reshuffled!");
  }
}

function generateLevel(levelName) {
  let rows = 0;
  let cols = 0;
  let deathCards = 0;
  let skipCards = 0;

  if (levelName == 'noob') {
    rows = 4;
    cols = 8;
    deathCards = 1
  } else if (levelName == 'pros') {
    rows = 6;
    cols = 10;
    deathCards = 2
    skipCards = 2
  } else if (levelName == 'hackers') {
    rows = 8
    cols = 16
    deathCards = 3
    skipCards = 2
  }

  let cards = [];
  let totalCards = rows * cols;
  const totalPairs = totalCards / 2 - deathCards - skipCards;

  for (let i = 1; i <= totalPairs; i++) {
    cards.push(i, i); //regular pairs
  }

  for (let i = 0; i < deathCards; i++) {
    cards.push('X', 'X'); // Death cards
  }

  for (let i = 0; i < skipCards; i++) {
    cards.push('O', 'O'); // Skip cards
  }

  shuffleArray(cards)

  /* generate as 2D-array */
  const level = [];
  for (let row = 0; row < rows; row++) {
    const rowCards = cards.slice(row * cols, (row + 1) * cols);
    level.push(rowCards);
  }
  return level;
}

const games = [];
function getGameById(id) {
  return games.filter((game) => {
    if (game.id == id) {
      return game
    }
  })[0]
}

function generateGame(id, lives, level) {
  var game = {
    id: id,
    player1: {
      lives: lives,
      socketId: null
    },
    player2: {
      lives: lives,
      socketId: null
    },
    level: generateLevel(level)
  }

  games.push(game)
}

function joinPlayer(num, socket, gameId) {
  const game = getGameById(gameId)
  if (num == 1) {
    game.player1.socketId = socket.id
  } else if (num == 2) {
    game.player2.socketId = socket.id
  }
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
        origin: "*"
      }
    });

    // socket.io framework config
    io.on("connection", (socket) => {
      console.log("Client is Here: " + socket.id);

      // Creates Lobby and Joins one player 
      socket.on("create", () => {
        const id = generateRoomCode();
        generateGame(id, 5, "hackers")
        joinPlayer(1, socket, id)

        // Create a new room and join the socket to this room
        socket.join(id);
        // Inform the client of the new room code
        socket.emit('room created', id);
        console.log('Room Created With ID:', id);
      });

      // Joins second player to the ready Lobby
      socket.on("join", (gameId) => {
        const game = getGameById(gameId)
        console.log(game);
        if (game) {
          joinPlayer(2, socket, gameId)

          socket.join(gameId);
          // Inform the client of the new room code
          socket.emit('room joined', gameId);
        }else{
          socket.emit('error', "no such game");
        }
      });

      socket.on("test", () => {
        socket.emit('test', JSON.stringify({ games }));
      });

      socket.on("winner", (room) => {

      });

      /*socket.on('takeTurn', (roomId, playerId, action) => {
          if (processTurn(roomId, playerId, action)) {
              // Broadcast the updated game state to both players
              io.to(roomId).emit('updateState', games[roomId]);

              // Optionally, notify players whose turn it is
              const nextPlayerId = games[roomId].players[games[roomId].currentPlayerIndex];
              io.to(roomId).emit('yourTurn', nextPlayerId);
          } else {
              socket.emit('error', 'Not your turn');
          }
        }); */

      // socket.on("makeMove", (room) => {

      // });

      socket.on("disconnect", () => {
        console.log("Client is Out: " + socket.id);
      });
    });



    httpServer.listen(3001, () => {
      console.log("Socket Server Started!");
    });


    res.socket.server.io = io
  }
  res.end()
}


/*
      const roomDetails = {};

      // In socket.js or CustomSocket.js
      function generateRoomCode() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      
      socket.on('create room', () => {
        const roomCode = generateRoomCode();
        // Link the socket.id with the new room code
        roomDetails[socket.id] = roomCode;
        // Create a new room and join the socket to this room
        socket.join(roomCode);
        // Inform the client of the new room code
        socket.emit('room created', roomCode); 
        console.log('Room Created With Code:', roomCode);
      }); */
