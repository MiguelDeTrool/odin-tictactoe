// TO DO
// Add pre-game player setup modal
// Add restart button
// Add after game play again modal


const displayController = (function() {
    const _gridDisplay = document.querySelectorAll(".space");
    const _playerDisplay = document.querySelector(".player-display");

    const _updateGrid = (currentGrid) => {
        for (let i = 0; i < currentGrid.length; i++) {
            _gridDisplay[i].textContent = currentGrid[i];
        };
    };

    const _updatePlayer = (currentPlayer) => {
        _playerDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
    };

    const updateDisplay = () => {
        _updateGrid(gameBoard.returnGrid());
        _updatePlayer(turnHandler.returnCurrentPlayer());
    };

    return {
        updateDisplay,
    };
})();

const gameBoard = (function() {
    let _grid = new Array(9);
    // const _grid = ["O", "X", "O", "X", "O", "O", "X", "O", "X",];

    const playMove = (player, space) => {
        let currentMark = player.mark;
        _grid[space] = currentMark;
    };

    const resetGrid = () => {
        _grid = new Array(9);
    };

    const returnGrid = () => {
        return _grid;
    };

    return {
        playMove,
        returnGrid,
        resetGrid,
    };
})();

const turnHandler = (function() {
    const _gridElements = document.querySelectorAll(".space");

    let _currentPlayer = {};
    let _nextPlayer = {};

    const _checkWin = () => {
        let grid = gameBoard.returnGrid();

        // Check horizontal win (%1)
        for (let i = 0; i < 7; i = i + 3) { // Increment by one to check each column
            if (grid[i] != undefined && grid[i] === grid[i + 1] && grid[i] === grid[i + 2]) { // Checks the first space of the row isn't empty, then checks the other spaces in the row are filled with the same mark
                return true;
            }
        }

        // Check vertical win (%3)
        for (let i = 0; i < 3; i++) { // Increment by one to check each column
            if (grid[i] != undefined && grid[i] === grid[i + 3] && grid[i] === grid[i + 6]) { // Checks the first space of the column isn't empty, then checks the other spaces in the column are fllled with the same mark
                return true;
            }
        }

        // Check diagonal win (special cases) 
        if (grid[0] != undefined && grid[0] === grid[4] && grid[0] === grid[8]) {
            return true;
        }

        if (grid[2] != undefined && grid[2] === grid[4] && grid[2] === grid[6]) {
            return true;
        }
    }

    const _handleWin = () => {
        displayController.updateDisplay();
        modals.displayPostGameModal(_currentPlayer.name);
    }

    // Event listener for when a turn is played, update model, then display
    const playTurn = function (event) {
            let playedSpace = event.target.getAttribute("data-attribute");

            //Check space is empty before playing move
            if (gameBoard.returnGrid()[playedSpace] === undefined) {
                gameBoard.playMove(_currentPlayer, playedSpace);

                // Check win
                if (_checkWin() === true) {
                    _handleWin();
                    return;
                }

                // Update current and next players
                let tempPlayer = _currentPlayer;
                _currentPlayer = _nextPlayer;
                _nextPlayer = tempPlayer;

                // Update display
                displayController.updateDisplay();

                //Then check if any more spaces to determine draw

            } else {
                alert("Space not free");
            }

    };

    _gridElements.forEach((element) => {element.addEventListener('click', playTurn)});

    const getPlayers = (player1, player2) => {
        _currentPlayer = player1;
        _nextPlayer = player2;
    }

    const returnCurrentPlayer = () => {
        return _currentPlayer
    };

    return {
        returnCurrentPlayer,
        getPlayers,
    };
})();

const Player = function(name, number, mark) {
    return {
        name,
        number,
        mark,
    };
};

const modals = (function () {
    let _preGameModal = document.querySelector(".pre-game-modal-container>form");

    let _postGameModal = document.querySelector(".post-game-modal-container");

    let _postGameModalTextDisplay = document.querySelector(".post-game-modal-container p")

    let _playAgainButton = document.querySelector(".play-again-button");

    _preGameModal.addEventListener("submit", function (e) {
        e.preventDefault(); // I think this is redundant because the form's action is javascript:void(0)
        let player1name = _preGameModal.elements["player-1-name"].value;
        let player2name = _preGameModal.elements["player-2-name"].value;
        player1name.toString(player1name);
        player2name.toString(player2name);

        let player1 = Player(player1name, 1, "X");
        let player2 = Player(player2name, 2, "O");

        turnHandler.getPlayers(player1, player2);

        _preGameModal.parentNode.style.display = "none";

        //Initialize screen
        displayController.updateDisplay();
    });

    _playAgainButton.addEventListener("click", function (e) {
        gameBoard.resetGrid();

        displayController.updateDisplay();

        _postGameModal.style.display = "none";
        _preGameModal.parentNode.style.display = "flex";
    });

    const displayPostGameModal = (winningPlayerName) => {
        _postGameModalTextDisplay.textContent = `${winningPlayerName} has won!`; // Don't have to use two .firstChild method's to go down two levels, empty div doesn't seem to count
        _postGameModal.style.display = "flex";
    }

    return {
        displayPostGameModal,
    }
})();