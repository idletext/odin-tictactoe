const readline = require("readline");
const nodejs = (function() {
    // This persists inside the closure
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    function input() {
      // Returns a promise that resolves the user's input
      const ask = (question) => {
        return new Promise((resolve) => {
          rl.question(question, (answer) => resolve(answer));
        });
      };
    
      // Clean up the interface
      const close = () => rl.close();
    
      // Public API
      return {
        ask,
        close
      };
    };
    
    return {input};

})();

const gameLogic = (function(){

    function makeBoard (size) {
        return Array.from({length : size}, () => Array(size).fill(null));
    };

    function gameRound() {
        let roundCount = 0;

        const getRound = () => roundCount;
        const newRound = () => roundCount++;

        return {newRound, getRound};
    };
    
    function applyMove (board, row, col, playerSymbol ){
        if (!board[row][col]) {
            board[row][col] = playerSymbol;
            return true;
        } else {
            return false;
        }
    };
    
    function checkWin (board, player) {
        const size = board.length;
        //check rows
        for (let row = 0; row < size; row++) {
            if ( board[row].every( (cell) => cell === player) ) return true;
        };
        //check columns
        for (let col = 0; col < size; col++) {
            if ( board.every( (row) => row[col] === player ) ) return true;
        };
        //check diagonals
        const mainDiagonal = board.every( (row, i) => (row[i] === player) )
        const antiDiagonal = board.every( (row, i) => (row - 1 - i) === player )

        return mainDiagonal || antiDiagonal;
    };

    function checkTie (board) {

        return board.every(rows => rows.every(elem => elem !== null)) 
        
    };

    function gameFinish (winPlayer, losePlayer) {
        console.log ("game is finished!");
        consolg.log (`${winPlayer} wins!`);
        console.log ( `${winPlayer}'s Score: ${winPlayer.getScore()}`);
        console.log ( `${losePlayer}'s Score: ${losePlayer.getScore()}`);
    };

    function renderBoard(board) {
        console.log(board[0].toString());
        console.log(board[1].toString());
        console.log(board[2].toString());
    };

    async function playerMove(board, player, input) { 

        const parts = input.split(" ").map(Number);

        if ( parts.length !== 2 || parts.some( n => isNaN(n) ) ) {

            console.log("Invalid input. Try again." );
            return false(); // I believe this is called a recursion?
        }

        const [x, y] = parts;
        const apply = gameLogic.applyMove(board, x, y, player.getSymbol());

        if (apply === true) {
            console.log("Input Success!");
        }

        if (apply === false) {
            console.log("spot is taken! Enter number again!");
            return false;
        }

    };

    return { 
        makeBoard, 
        applyMove, 
        checkWin, 
        checkTie, 
        gameFinish, 
        gameRound, 
        renderBoard, 
        playerMove
    }

})();

const playerModule = (function(){

    function makePlayer (name){
        let symbol = "";
        let score = 0;

        const getName = () => name;
        const giveSymbol = (input) => symbol = input;
        const getSymbol = () => symbol;
        const getScore = () => score;
        const giveScore = () => score++;

        return { getName, giveSymbol, getSymbol, getScore, giveScore }
    };
    

    return {
        makePlayer
    };
})();

const stats =  (function(){
})();


const info = (function(){

})();


// round
const gamePlay = (async function() {
    

    // Ask Player's information
    const playerOneName = await nodejs.input().ask("player 1, what is your name?");

    const playerOne = playerModule.makePlayer(playerOneName);
    playerOne.giveSymbol('x')
    console.log(`Hello ${playerOne.getName()}!`)

    const playerTwoName = await nodejs.input().ask("player 2, what is your name?");

    const playerTwo = playerModule.makePlayer(playerTwoName);
    playerTwo.giveSymbol('o')
    console.log(`Hello ${playerTwo.getName()}!`)

     //start round
    const thisRound = gameLogic.gameRound();
    thisRound.newRound();
    round()

    function round () {

    //Start Round
    // let thisBoard = gameLogic.makeBoard(3);
    let thisBoard = [ ["o", "o", "x"], ["x", null, "x"], ["o", "o", null] ];
    
    console.log("let's start the game!")
    console.log(`round ${thisRound.getRound()}`)
    
    
    moveLoop(playerOne, playerTwo, thisBoard);
    
    
    function playerMoveInput(player, board, playerInput) {

        const check = gameLogic.playerMove(board, player, playerInput);

        if (check === false) playerMoveInput(player.getSymbol()); //repeat loop

        if (gameLogic.checkTie(board, player) === true){
            thisRound.newRound()
            console.log("it's a tie! Next Round!")
            return true;
          };

        if (gameLogic.checkWin(board, player.getSymbol()) === true){
            playerOne.giveScore()
            console.log(`Score to ${player.getName()}!`)
            console.log(playerOne.getScore())
            console.log(playerTwo.getScore())
            if (thisRound)
            thisRound.newRound()
            console.log("Next Round!")
            round();
          };
    };

    async function moveLoop(player1, player2, board) {
        for(i = 0; i < thisBoard.length * 3; i++) {
        
        gameLogic.renderBoard(thisBoard);
        console.log(`${player1.getName()} ${player1.getSymbol()} you're up!`);
        const playerInput = await nodejs.input().ask("To pick, enter two numbers that represents 'row' and 'col' (ex: 0 2 ):");
        playerMoveInput(player1, board, playerInput);
        
        gameLogic.renderBoard(thisBoard);
        console.log(`${player2.getName()} ${player2.getSymbol()} you're up!`);
        const playerInput2 = await nodejs.input().ask("To pick, enter two numbers that represents 'row' and 'col' (ex: 0 2 ):");
        playerMoveInput(player2, board, playerInput2);
        
        };
    };

    };//Round

})();

// Tests (TO BE REMOVED)

// [ ["x", "x", "x"], ["x", "x", "x"], ["x", "x", "x"] ]

// [ ["x", "x", "x"], ["x", "x", "x"], ["x", "x", "null"] ]

// [ ["o", "o", "x"], ["x", "x", "x"], ["o", "o", "null"] ]






