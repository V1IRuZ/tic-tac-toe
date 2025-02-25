// Create gameboard
const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];
    let cell = ""

    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameBoard[i].push(cell);
        }        
    }

    const getGameBoard = () => gameBoard;
    
    return {
        getGameBoard
    }
})();

// Create player objects
const players = (function () {

    const playerOne = function (name) {
        const marker = "X";
        
        return {
            name,
            marker
        }
    }

    const playerTwo = function (name) {
        const marker = "O";

        return {
            name, 
            marker
        }
    }

    const player1 = playerOne("Mike");
    const player2 = playerTwo("John");

    const getPlayers = () => {
        return  {
            player1,
            player2
        }
    }

    return {
        getPlayers
    }

})();


// Take player inputs
// Flow of a game

