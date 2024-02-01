import Player from "./player";

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

function generateBoard(levelName) {
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default class Game {
    constructor(levelName, playerId) {
        this.id = generateRoomCode();
        this.player1 = setPlayer(playerId, levelName, "player1");
        this.player2 = null;
        this.levelName = levelName;
        this.board = generateBoard(levelName);
    }
    
    setPlayer(id, levelName, name) {
        let lives = 0;
        if (levelName == 'pros') {
            lives = 1;
        } else if (levelName == 'hackers') {
            lives = 2;
        }
        return new Player(lives, id, name);
    }
     
    joinPlayer(id) {
        this.player2 = setPlayer(id, levelName, "player2")
    }

    reshuffleSpecialCards() {
        this.board = this.board.flat();
    }

    runGame(levelName) {
        const board = generateLevel(levelName);
        console.log(board);
        playRound(levelName);

    }

    playRound() {
        let currentRound = 0;
        const roundsBeforeReshuffle = 2;

        /* Logic for handling player moves/matches/cardflips */
        processTurn();
        /* after a move has been made */
        currentRound++;

        if (currentRound % roundsBeforeReshuffle === 0) {
            reshuffleSpecialCards(this.board);
            console.log("Special cards have been reshuffled!");
        }
    }

    processTurn(roomId, playerId, action) {
        return null
    }
}