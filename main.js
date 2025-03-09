const Gameboard = (function () {
    const rows = 3;
    const columns = 3;
    const gameBoard = [];

    // Create 2D gameboard array
    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < columns; j++) {
                gameBoard[i].push("");     
        }        
    }

    // A function that just reads the values ​​from the game board
    const getGameBoard = () => gameBoard;

    // Update game board array
    const setMarker = (player, row, column) => {
        gameBoard[row][column] = player.marker;
    }

    const resetGameBoard = () => {

        if (resetBoard) {
            for (let i = 0; i < gameBoard.length; i++) {
                for (let j = 0; j < gameBoard[i].length; j++) {
                    gameBoard[i][j] = "";
                }
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

    const {getGameBoard, resetGameBoard} = Gameboard
    const board = getGameBoard();
    
    const playerOne = {
        name: playerOneName,
        marker: "X",
        score: 0,
        color: "red"
    }

    const playerTwo = {
        name: playerTwoName,
        marker: "O",
        score: 0,
        color: "blue"
    }

    const game = {
        running: true,
        activePlayer: playerOne,
        rounds: 5
    }

    const switchPlayer = () => {
        game.activePlayer = game.activePlayer === playerOne ? playerTwo : playerOne;
    }

    const getPlayerOne = () => playerOne;

    const getPlayerTwo = () => playerTwo;

    const getActivePlayer = () => game.activePlayer;

    const getGameRunning = () => game.running;

    const continueGame = (value) => {game.running = value};

    const checkWinningConditions = () => {
            for (let i = 0; i < board.length; i++) {
                // Check rows 
                const allRowsEqual = board[i].every(value => value === game.activePlayer.marker)
                if(allRowsEqual) {
                    game.activePlayer.score++
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }

                // Check columns
                let columns = []
                columns.push(board[0][i], board[1][i], board[2][i])
                const allColumnsEqual = columns.every(value => value === game.activePlayer.marker)
                if (allColumnsEqual) {
                    game.activePlayer.score++
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }
                // Reset array for next column check
                columns = []
                
                // Check diagonals
                if (board[0][0] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][2] === game.activePlayer.marker || 
                    board[0][2] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][0] === game.activePlayer.marker) {
                    
                    game.activePlayer.score++
                    game.running = false
                    return console.log(`${game.activePlayer.name} is winner!`)
                }

                // Check if there is space on the game board / In other words, it's a draw.
                const spaceOnTheBoard = board.some(row => row.includes(""));
                if (!spaceOnTheBoard) {
                    game.running = false;
                    return console.log("Its tie!");
                }
            }
        }

    const playRound = () => {
        if (game.running) {
        checkWinningConditions();
        switchPlayer();
        console.log(Gameboard.getGameBoard());
        console.log(game.running);
        } 
        
        if (!game.running) {
            resetGameBoard();
        }
         
    }

    return {
       getPlayerOne,
       getPlayerTwo,
       getActivePlayer,
       getGameRunning,
       continueGame,
       playRound
    }
}

const DisplayController = (function() {
    const squares = document.querySelectorAll(".square");
    const player1Score = document.querySelector(".player1>p");
    const player2Score = document.querySelector(".player2>p");
    const nextRoundBtn = document.querySelector(".next-round");

    // Extract functions from Gameboard.
    const {getGameBoard, setMarker} = Gameboard
    const board = getGameBoard();

    // Extract functions from Gamecontroller.
    const {getPlayerOne, getPlayerTwo, getActivePlayer, playRound, getGameRunning, continueGame} = Gamecontroller();
    const player1 = getPlayerOne();
    const player2 = getPlayerTwo();

    // Display scoreboard

    squares.forEach(square => {
        square.addEventListener("click", (e) => {

            // Take the location values ​​from the attributes into the 2D array of the game board.
            const row = e.target.getAttribute("data-row");
            const column = e.target.getAttribute("data-column");

            const activePlayer = getActivePlayer();
            const gameRunning = getGameRunning();

            if (gameRunning) {
                nextRoundBtn.disabled = true;
                // Check if the square on the game board is marked.
                if (!board[row][column]) {
                    square.style.color = activePlayer.color;
                    square.textContent = `${activePlayer.marker}`;

                    // Update game board array
                    setMarker(activePlayer, row, column);
                    playRound()

                } else {
                    console.log("Spot has been used!");
                }
            }

            if (!gameRunning) {
                nextRoundBtn.disabled = false;
            }

            player1Score.textContent = `${player1.name} score: ${player1.score}`;
            player2Score.textContent = `${player2.name} score: ${player2.score}`;
        })    
    })

 
    nextRoundBtn.addEventListener("click", () => {
        squares.forEach(square => square.textContent = "");
        continueGame(true);
    })

})();

// 1. Luo scoreboard
//     - lisää pelaaja objekteihin pisteytys
//     -lisää pisteen aktiiviselle pelaajalle, voiton varmistettua
//     - nollaa pelilauta, kierroksen päätteeksi
//     - näytä pisteet  