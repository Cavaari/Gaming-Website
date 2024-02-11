import Player from "./player";
// import UI from "../../../pages/game/[slug]";

// return random room code
function generateRoomCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// return random board based on the level name
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

// return shuffled array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// return new player based on the level name
function setPlayer(id, levelName, name) {
    let lives = 0;
    if (levelName == 'pros') {
        lives = 1;
    } else if (levelName == 'hackers') {
        lives = 2;
    }
    return new Player(lives, id, name);
}


// game logic class
export default class Game {
    constructor(levelName, playerId) {
        this.id = generateRoomCode();
        this.player1 = setPlayer(playerId, levelName, "player1");
        this.player2 = null;
        this.levelName = levelName;
        this.board = generateBoard(levelName);
    }
    
    /* SET PLAYERS */
    getId() {
        return this.id;
    }
    
    // Adds second player to the game
    joinPlayer(id) {
        this.player2 = setPlayer(id, this.levelName, "player2")
    }

    /* GAME LOGIC */
    runGame(levelName) {
        const board = generateLevel(levelName);
        console.log(board);
        currentPlayer = this.player1;
        do {
            playRound(levelName, currentPlayer);
            swapPlayers(currentPlayer);
        } while (!gameOver());
    }
    
    /* ROUND/TURN LOGIC */
    /* Handles the logic for a single round */
    playRound(currentPlayer) {
        let currentRound = 0;
        const roundsBeforeReshuffle = 2;
        
        /* Logic for handling player moves/matches/cardflips */
        this.makeMove(currentPlayer, moveType, coordinate);
        /* after a move has been made */
        currentRound++;
        
        if (currentRound % roundsBeforeReshuffle === 0) {
            reshuffleSpecialCards(this.board);
            console.log("Special cards have been reshuffled!");
            this.displayReshuflleScreen();
        }
    }
    
    /* Handles a single move */
    makeMove(playerId, moveType, coordinate) {
        return null;
    }

    /* Changes player */
    swapPlayers(currentPlayer) {
        if (currentPlayer == this.player1) {
            currentPlayer = this.player2;
        } else {
            currentPlayer = this.player1;
        }
    }

    /* CARD LOGIC */
    /* checks if the two selected cards are the same*/
    check_for_match(x1, y1, x2, y2) {
        if (this.board[x1][y1] == this.board[x2][y2]) {
            return true;
        } else return false;
    }
    
    /* reshuffles special cards (skip and death) only */
    reshuffleSpecialCards() {
        this.board = this.board.flat();
    }
    
    /* Handles the scenario when two death cards are matched (ends game/declare winner) */
    deathCardMatched(x1, y1, x2, y2, currentplayer) {
        if (this.board[x1][y1] == 'X' && this.board[x2][y2] == 'X') {
            winningplayer = this.swapPlayers(currentplayer);
            this.gameOver(winningplayer);
            return true;
        } else return false;
    }

    /* Handles the scenario when two skip cards are matched (gives current player two turns) */
    /* We can implement this next week */
    skipCardMatched(x1, y1, x2, y2) {
        if (this.board[x1][y1] == 'O' && this.board[x2][y2] == 'O') {
            return true;
        } else return false;
    }
    
    /* VISUALS/LOGIC HANDLED IN SLUG */
    /* Displays whole board in JSON format */
    displayBoard() {
        UI.displayBoard(this.board);
        return JSON.stringify(this.board);
    }
    
    /* Flips one card on board */
    flipCard(x, y) {
        UI.flipCard();
        return null;
    }
    
    /* Unflips one card on board */
    unflipCard(x, y) {
        UI.unflipCard(x, y);
        return null;
    }
    
    /* Removes one card */
    removeCard(x, y) {
        return null;
    }
    
    /* Displays that the special cards have been reshuffled*/
    displayReshuflleScreen() {
        return null;
    }
    
    /* Gets player input */
    getPlayerClicks() {
        UI.getPlayerClicks(x, y, this.board);
    }
    
    /* END GAME LOGIC */
    /* player passed in is the winner */
    gameOver(player) {
        // Done on line 74 in [slug].js
        UI.gameOver();
    }
}