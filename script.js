const game = (function(){
    
    function makeBoard (size) {
        return Array.from({length : size}, () => Array(size).fill(null));
    };

    const board = makeBoard(3)
    
    function makeMove (board, row, col, player ){
        if (!board[row][col]) {
            board[row][col] = player;
            //add return function here to indicate successful placement
        } 
        //add return function here to indicate unsuccessful placement
    }
    
    function checkWin () {
        
    };

    return {
        
    }

})();

const playerModule = (function(){

})();

const stats =  (function(){

})();  