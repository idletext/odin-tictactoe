const gameLogic = (function(){
    
    function makeBoard (size) {
        return Array.from({length : size}, () => Array(size).fill(null));
    };
    
    function makeMove (board, row, col, player ){
        if (!board[row][col]) {
            board[row][col] = player;
            
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
        const mainDiagonal = board.every( (row, i => row[i] === player) )
        const antiDiagonal = board.every( (row, i) => (row - 1 - i) === player )

        return mainDiagonal || antiDiagonal;
    };

    function checkTie (board) {

    return board.every(rows => rows.every(elem => elem !== null)) 
        
    };

    return{ makeBoard, makeMove, checkWin, checkTie}

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






