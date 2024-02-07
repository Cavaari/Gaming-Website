import { createServer } from "http";
import { Server } from "socket.io";

import Game from "@/lib/card_match/classes/game"

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
    });



    httpServer.listen(3001, () => {
      console.log("Socket Server Started!");
    });


    res.socket.server.io = io
  }
  res.end()
}
