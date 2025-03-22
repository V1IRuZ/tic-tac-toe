const gameBoard = (function () {

    const boardArray = [['', '', ''],
                       ['', '', ''],
                       ['', '', '']];

    const getGameBoard = () => boardArray;

    // Update game board array
    const setMarker = (player, row, column) => {
        boardArray[row][column] = player.marker;
    }

    const resetGameBoard = (obj) => {
        // If the game is not in active mode, we reset the game board
        if (!obj.running) {
            for (let i = 0; i < boardArray.length; i++) {
                for (let j = 0; j < boardArray[i].length; j++) {
                    boardArray[i][j] = "";
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

function gameController () {

    const {getGameBoard, resetGameBoard} = gameBoard
    const board = getGameBoard();

    let players = [
        {
            name: "Player 1",
            marker: "X",
            score: 0
        },
        {
            name: "Player 2",
            marker: "O",
            score: 0
        }
    ];

    const game = {
        running: false,
        activePlayer: players[0]
    }
    
    const startNewGame = (playerOneName, playerTwoName) => {
        const {enableNextRoundBtn} = DisplayController;

        game.running = false;
        resetGameBoard(game);
        enableNextRoundBtn(game);

        // By default, player 1 starts a new game
        game.activePlayer = players[0];

        // Player 1
        players[0].score = 0;
        players[0].name = playerOneName;

        // Player 2
        players[1].score = 0;
        players[1].name = playerTwoName;
    }
  
    const switchPlayerTurn = () => {
        game.activePlayer = game.activePlayer === players[0] ? players[1] : players[0];
    }

    const getPlayerOne = () => players[0];

    const getPlayerTwo = () => players[1];

    const getActivePlayer = () => game.activePlayer;

    const getGameRunning = () => game.running;

    const continueGame = (value) => {
        game.running = value};

    const checkWinningConditions = () => {
        // Extract winner modal
        const {getWinner} = DisplayController;

            for (let i = 0; i < board.length; i++) {
                // For a win, we add a point to the active player, provide a modal notification of the round win, and deactivate the game.

                // 1. Check rows 
                const allRowsEqual = board[i].every(value => value === game.activePlayer.marker)

                if(allRowsEqual && game.running) {
                    game.activePlayer.score++
                    getWinner(`${game.activePlayer.name} wins the round!`);
                    game.running = false
                }

                // 2. Check columns
                let columns = []

                // For each iteration of the loop, we add column values ​​to the array and check for the possible win.
                columns.push(board[0][i], board[1][i], board[2][i])

                const allColumnsEqual = columns.every(value => value === game.activePlayer.marker)

                if (allColumnsEqual && game.running) {
                    game.activePlayer.score++
                    getWinner(`${game.activePlayer.name} wins the round!`);
                    game.running = false
                }

                // Reset array for next column check
                columns = []
            }

            // 3. Check diagonals
            if (board[0][0] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][2] === game.activePlayer.marker && game.running || 
                board[0][2] === game.activePlayer.marker && board[1][1] === game.activePlayer.marker && board[2][0] === game.activePlayer.marker && game.running) {
                
                game.activePlayer.score++
                getWinner(`${game.activePlayer.name} wins the round!`);
                game.running = false
                console.log("diagonals: true");
                console.log(game.activePlayer.score);
            }

            // 4. Check if there is space on the game board / In other words, if it's a draw.
            // No points are awarded for a draw.
            const spaceOnTheBoard = board.some(row => row.includes(""));

            if (!spaceOnTheBoard && game.running) {
                getWinner("Draw!");
                game.running = false;
                console.log("Draw");
            }
        }

    const playRound = () => {
        const {enableNextRoundBtn} = DisplayController;

        if (game.running) {
        checkWinningConditions();
        switchPlayerTurn();
        }

        // Once a winner has been found, the game board must be reset and the next round button must be enabled.
        enableNextRoundBtn(game); 
        resetGameBoard(game);
    }

    return {
       getPlayerOne,
       getPlayerTwo,
       getActivePlayer,
       getGameRunning,
       continueGame,
       playRound,
       startNewGame
    }
}

const DisplayController = (function() {
    const squares = document.querySelectorAll(".square");
    const p1Name = document.querySelector(".player1-name>p");
    const p1Score = document.querySelector(".player1-score>p");
    const p2Name = document.querySelector(".player2-name>p");
    const p2Score = document.querySelector(".player2-score>p");
    const playerTurn = document.querySelector(".player-turn>p");
    const newGameBtn = document.querySelector(".start-game");
    const nextRoundBtn = document.querySelector(".next-round");
    const playersModal = document.querySelector(".players-modal");
    const closeBtn = document.querySelector(".close");
    const form = document.querySelector("form");
    const winnerModal = document.querySelector(".winner-modal");
    const closeWinnerModal = document.querySelector(".close-winner-modal");
    const winnerText = document.querySelector(".winner-modal>p");

    // Extract functions from Gameboard.
    const {getGameBoard, setMarker} = gameBoard
    const board = getGameBoard();

    // Extract functions from Gamecontroller.
    const {getPlayerOne, getPlayerTwo, getActivePlayer, playRound, getGameRunning, continueGame, startNewGame} = gameController();
    const player1 = getPlayerOne();
    const player2 = getPlayerTwo();
    
    const displayScore = () => {
        p1Name.textContent = `${player1.name}`;
        p1Score.textContent = `${player1.score}`;
        p2Name.textContent = `${player2.name}`;
        p2Score.textContent = `${player2.score}`;
        playerTurn.textContent = `${getActivePlayer().name}'s turn (${getActivePlayer().marker})`;
    } 

    squares.forEach(square => {
        square.addEventListener("click", (e) => {

            // Take the location values ​​from the attributes into the 2D array of the game board.
            const row = e.target.getAttribute("data-row");
            const column = e.target.getAttribute("data-column");

            const activePlayer = getActivePlayer();
            const gameRunning = getGameRunning();
            
            if (gameRunning) {
                // nextRoundBtn.disabled = true;
                // Check if the square on the game board is marked.
                if (!board[row][column]) {
                    square.textContent = `${activePlayer.marker}`;
                    // Update game board array
                    setMarker(activePlayer, row, column);
                    playRound();
                }
            }

            // Display scoreboard
            displayScore();
        })    
    })

    nextRoundBtn.disabled = true;

    const resetDomBoard = () => {
        squares.forEach(square => square.textContent = "");
    }

    // Winner modal
    const getWinner = (text) => {
        winnerText.textContent = `${text}`;
        winnerModal.showModal();
    }

    closeWinnerModal.addEventListener("click", (e) => {
        winnerModal.close();
        e.preventDefault();
    })

    // Add players / start new game modal
    newGameBtn.addEventListener("click", () => {
        playersModal.showModal();
    })

    form.addEventListener("submit", (e) => {
        let player1Name = document.querySelector("#player1").value;
        let player2Name = document.querySelector("#player2").value;

        // Enter default values ​​if no input values ​​were given.
        if (!player1Name) {
            player1Name = "Player 1";
        }

        if (!player2Name) {
            player2Name = "Player 2";
        }

        startNewGame(player1Name, player2Name);

        // Reset "DOM gameboard", update names and scores in the scoreboard and activate the game"
        resetDomBoard();
        displayScore();
        continueGame(true);

        // Prevent form submission to server, reset form inputs and close modal
        e.preventDefault();
        form.reset();
        playersModal.close();
    })

    closeBtn.addEventListener("click", (e) => {
        playersModal.close();
        e.preventDefault();
    })
    
    nextRoundBtn.addEventListener("click", () => {
        resetDomBoard();
        continueGame(true);
    })

    // Function, controls when the next round can be activated. When the results of the current game round are obtained, the next round button is activated.
    const enableNextRoundBtn = (obj) => {
        if (obj.running) {
            nextRoundBtn.disabled = true;
        } else {
            nextRoundBtn.disabled = false;
        }
    }

    return  {
        enableNextRoundBtn,
        getWinner
    }

})();

