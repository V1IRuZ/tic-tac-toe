// Create gameboard
const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
                gameBoard[i].push("");     
        }        
    }

    const getGameBoard = () => gameBoard;

    const setMarker = (player) => {
        const rowValue = +prompt("Pick a row (between 0 - 2) ");
        const columnValue = +prompt("Pick a columns between 0 - 2");
        const markerValue = player.marker
        
            let markedSpot = gameBoard[rowValue][columnValue];
            if(!markedSpot) {
                return gameBoard[rowValue][columnValue] = markerValue;
                
            } else {
                console.log("Spot has been used ")
            }  
    } 

    return {
        getGameBoard,
        setMarker
    }
})();

// Create player objects


// Playround

function Gamecontroller () {
   
    const playerOneName = "Mike"
    const playerTwoName = "John"

    const playerOne = {
        name: playerOneName,
        marker: "X"
    }

    const playerTwo = {
        name: playerTwoName,
        marker: "O"
    }

    const player1 = playerOne
    const player2 = playerTwo

    let activePlayer = player1;

    const switchPlayer = () => {
        return activePlayer = activePlayer === player1 ? player2 : player1; 
    }

    const getActivePlayer = () => activePlayer;

    const {setMarker, getGameBoard} = Gameboard;

    
    const playRound = () => {
        setMarker(activePlayer);
    }

    const board = getGameBoard();

    let gameRunning = true

    const checkWinningConditions = () => {
            for (let i = 0; i < board.length; i++) {

                // Check rows 
                const allRowsEqual = board[i].every(value => value === (player1.marker || player2.marker))
                if(allRowsEqual) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)

                // Check columns
                } else if (board[0][i] && board[1][i] && board[2][i] === (player1.marker || player2.marker)) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                
                //Check diagonals
                } else if (board[0][0] && board[1][1] && board[2][2] || board[0][2] && board[1][1] && board[2][0] === (player1.marker || player2.marker)) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                }    
            }
        }
        
    return {
       getActivePlayer,
       playRound,
       checkWinningConditions
    }
}



// Take player inputs
// Flow of a game

