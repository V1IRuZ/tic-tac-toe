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

    const setMarker = (player, row, column) => {
        gameBoard[row][column] = player.marker;
    }

    const resetGameBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                gameBoard[i][j] = "";
            }
         }
    }

    return {
        getGameBoard,
        setMarker,
        resetGameBoard
    }
})();


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

    const game = {
        running: true,
        activePlayer: playerOne
    }

    const switchPlayer = () => {
        game.activePlayer = game.activePlayer === playerOne ? playerTwo : playerOne;
        console.log(game.activePlayer);
    }

    const getActivePlayer = () => game.activePlayer;

    const getGameRunning = () => game.running;

    const {getGameBoard, resetGameBoard} = Gameboard;
    
    const playRound = () => {
        if (game.running) {
        checkWinningConditions();
        switchPlayer();
        console.log(Gameboard.getGameBoard());
        } else {
            console.log("Game over.")
        }     
    }

    const board = getGameBoard();

    const checkWinningConditions = () => {
            for (let i = 0; i < board.length; i++) {
                // Check rows 
                const allRowsEqual = board[i].every(value => value === game.activePlayer.marker)
                if(allRowsEqual) {
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }

                // Check columns
                let columns = []
                columns.push(board[0][i], board[1][i], board[2][i])
                const allColumnsEqual = columns.every(value => value === game.activePlayer.marker)
                if (allColumnsEqual) {
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }
                // Reset array for next column check
                columns = []
                
                // Check diagonals
                if (board[0][0] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][2] === game.activePlayer.marker || 
                    board[0][2] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][0] === game.activePlayer.marker) {
                    
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }

                // Check if there is space on the game board / Its tie
                const spaceOnTheBoard = board.some(row => row.includes(""));
                if (!spaceOnTheBoard) {
                    game.running = false;
                    return console.log("Its tie!");
                }
            }
        }
        
    return {
       getActivePlayer,
       playRound,
       getGameRunning
    }
}
// Printtaa pelilauta array näytölle
// pelaa kierros 
const DisplayController = (function() {
    const squares = document.querySelectorAll(".square");

    const board = Gameboard.getGameBoard();
    const {getActivePlayer, playRound, getGameRunning} = Gamecontroller();

    let row;
    let column;
    
    // Ensikerralla Korjaa, ettei pelietene, jos pelaaja valitsee käytetyn paikan.
    const render = () => {
        squares.forEach(square => {
            square.addEventListener("click", (e) => {
                square.textContent = `${getActivePlayer().marker}`;
                row = e.target.getAttribute("data-row");
                column = e.target.getAttribute("data-column");
                const activePlayer = getActivePlayer();
                const gameRunning = getGameRunning();


                if (!board[row][column] && gameRunning) {
                    setMarker(activePlayer, row, column);
                    playRound();
                }                 
                
            } )    
    })
    }

    const {setMarker} = Gameboard

    
    render()


})();

const game = Gamecontroller();


