import { createServer } from "http";
import { Server } from "socket.io";

import { createNewWordleGame, findWordleGame, handleWordleInput } from "@/lib/wordle";

import { createNewRiddleGame, findRiddleGame, handleRiddleGameInput, isRiddleGameWinner } from "@/lib/riddle";
import {generateGame} from "@/lib/jeopardy/jeopardy";

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
      // General socket logic
      console.log("Client is Here: " + socket.id);
      socket.on("disconnect", () => {
        console.log("Client is Out: " + socket.id);
      });


      // Guessing game : socket layer 
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
          io.to(game.getId()).emit('game start', JSON.stringify(game));
          // Inform the client of the new room code
          socket.emit('room joined', game.getId());
        } else {
          socket.emit('error', "no such game");
        }
      });
      // Fetching the game
      socket.on("get game", (id) => {
        const game = getGameById(id)
        if (game) {
          socket.emit('get game', JSON.stringify({ games }));
        } else {
          socket.emit('error', "no such game");
        }
      });

      // Chat room logic + Riddle game : socket layer 
      socket.on("join_chat", async (room)  => {
        socket.join(room);
        console.log(socket.id + " Joined the Room: " + room);

        // Create riddle with socket id
        if(room == "secret room"){
          await createNewRiddleGame(socket.id)
          const riddle = findRiddleGame(socket.id)
          const data_out = {
            riddle: riddle.riddle,
            shift: riddle.shift
          }
          io.to("secret room").emit("init_secret_msg", JSON.stringify(data_out));

          console.log(JSON.stringify(riddle));
        }
      });
      socket.on("message", (message) => {
        console.log(message);
        io.to(message.room).emit("new_msg", message.text);

        // Solve riddle by user here
        if(message.room == "secret room"){
          io.to("secret room").emit("secret_msg", handleRiddleGameInput(socket.id, message.text)); 
        }
      });
      // hidden room auth
      socket.on("is_winner", () => {
        socket.emit("is_winner", isRiddleGameWinner(socket.id))
      });


      // Wordle game : socket layer 
      socket.on("new_wordle_game", async () => {
        await createNewWordleGame(socket.id)
        const game =  findWordleGame(socket.id)
        console.log(JSON.stringify(game));
      })
      socket.on("user_input", (word) => {
        const data = handleWordleInput(socket.id, word)
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
