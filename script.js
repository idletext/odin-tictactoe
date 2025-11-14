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
    
    function makeMove (board, row, col, playerSymbol ){
        if (!board[row][col]) {
            board[row][col] = playerSymbol;
            return true;
        };
        return false;
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
        const mainDiagonal = board.every( (row, i => row[i] === player) )
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

    async function playerMove(board, player) { 
        console.log("player 1 'x' you're up!")
        const playerInput = await nodejs.input().ask("To pick, enter two numbers that represents 'row' and 'col' (ex: 3 5 ):");

        const parts = playerInput.split(" ").map(Number);

        if ( parts.length !== 2 || parts.some( n => isNaN(n) ) ) {

            console.log("Invalid input. Try again." );
            return playerMove(); // I believe this is called a recursion?
        }

        const [x, y] = parts;
        gameLogic.makeMove(board, x, y, player.getSymbol());

    };

    return { 
        makeBoard, 
        makeMove, 
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


// Console Game Play Testing
const gamePlay = (async function() {

    // const prompt = nodejs.input();
    let thisBoard = gameLogic.makeBoard(3);
    const thisRound = gameLogic.gameRound();

    const playerOneInput = await nodejs.input().ask("player 1, what is your name?");

    const playerOne = playerModule.makePlayer(playerOneInput);
    playerOne.giveSymbol('x')
    console.log(`Hello ${playerOne.getName()}!`)

    const playerTwoInput = await nodejs.input().ask("player 2, what is your name?");
    // nodejs.input().close()

    const playerTwo = playerModule.makePlayer(playerTwoInput);
    playerTwo.giveSymbol('o')
    console.log(`Hello ${playerTwo.getName()}!`)

    console.log("let's start the game!")

    gameLogic.renderBoard(thisBoard);
    
    //playerMove

    // function checkState(board){
    //     if (board.checkTie())
    // }

    await gameLogic.playerMove(thisBoard, playerOne);

    gameLogic.renderBoard(thisBoard)

    

    // move loop
    // for(i = 0; i < thisBoard.length * 3; i++) {
    //     renderBoard(thisBoard)
    //     console.log("Player 1 your're up")
    //     console.log('Pick a side eg. "r1"')    
    // thisBoard = [ ["x", "x", "x"], ["x", "x", "x"], ["x", "x", "x"] ];
    
    // };

    console.log("gameFinished");
        
})();

// Tests (TO BE REMOVED)

// [ ["x", "x", "x"], ["x", "x", "x"], ["x", "x", "x"] ]

// [ ["x", "x", "x"], ["x", "x", "x"], ["x", "x", "null"] ]






