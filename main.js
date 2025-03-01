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
        let rowValue;
        let columnValue;

            while(true) {
                rowValue = +prompt("Pick a row (between 0 - 2) ");
                columnValue = +prompt("Pick a columns between 0 - 2");
                if (!gameBoard[rowValue][columnValue]){
                    gameBoard[rowValue][columnValue] = player.marker;
                    break;  
                }
                console.log("Spot has been used")
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

    let activePlayer = playerOne;

    const switchPlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
        console.log(activePlayer);
    }

    const getActivePlayer = () => activePlayer;

    const {setMarker, getGameBoard} = Gameboard;
    
    const playRound = () => {
        setMarker(activePlayer);
        checkWinningConditions();
        switchPlayer();
    }

    const board = getGameBoard();

    let gameRunning = true

    const checkWinningConditions = () => {
            for (let i = 0; i < board.length; i++) {
                // Check rows 
                const allRowsEqual = board[i].every(value => value === activePlayer.marker)
                if(allRowsEqual) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                }

                // Check columns
                let columns = []
                columns.push(board[0][i], board[1][i], board[2][i])
                const allColumnsEqual = columns.every(value => value === activePlayer.marker)
                if (allColumnsEqual) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                }
                // Reset array for next column check
                columns = []
                
                // Check diagonals
                if (board[0][0] === activePlayer.marker && board[1][1] === activePlayer.marker && board[2][2] === activePlayer.marker || 
                    board[0][2] === activePlayer.marker && board[1][1] === activePlayer.marker && board[2][0] === activePlayer.marker) {
                    
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                }

                // Check if there is space on the game board / Its tie
                const spaceOnTheBoard = board.some(row => row.includes(""));
                if (!spaceOnTheBoard) {
                    return console.log("Its tie!");
                }
            }
        }
        
    return {
       getActivePlayer,
       playRound
    }
}

const game = Gamecontroller();


// Take player inputs
// Flow of a game

