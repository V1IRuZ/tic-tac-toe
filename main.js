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
                const allRowsEqual = board[i].every(value => value === (playerOne.marker || playerTwo.marker))
                if(allRowsEqual) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)

                // Check columns
                } else if (board[0][i] && board[1][i] && board[2][i] === (playerOne.marker || playerTwo.marker)) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                
                //Check diagonals
                } else if (board[0][0] && board[1][1] && board[2][2] || board[0][2] && board[1][1] && board[2][0] === (playerOne.marker || playerTwo.marker)) {
                    gameRunning = false
                    return console.log(`${activePlayer.name} is winner!`)
                }    
            }
            console.log("No winner found")
        }
        
    return {
       getActivePlayer,
       playRound
    }
}

const game = Gamecontroller();


// Take player inputs
// Flow of a game

