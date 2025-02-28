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
    

 
    return {
       getActivePlayer,
       playRound
    }
}



// Take player inputs
// Flow of a game

