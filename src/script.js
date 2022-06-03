const displayController = (function() {
    const _gridDisplay = document.querySelectorAll(".space");
    const _playerDisplay = document.querySelector(".player-display");

    const _updateGrid = (currentGrid) => {
        for (let i = 0; i < currentGrid.length; i++) {
            _gridDisplay[i].textContent = currentGrid[i];
        };
    };

    const _updatePlayer = (currentPlayer) => {
        _playerDisplay.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`
        //make an element's textContent say "Player 1's turn (X)" or opposite
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
    const _grid = new Array(9);
    // const _grid = ["O", "X", "O", "X", "O", "O", "X", "O", "X",];

    const playMove = (player, space) => {
        let currentMark = player.mark;
        _grid[space] = currentMark;
    };

    const returnGrid = () => {
        return _grid;
    };


    return {
        playMove,
        returnGrid,
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

        if (grid[2] != undefined && grid[0] === grid[4] && grid[0] === grid[6]) {
            return true;
        }
    }

    // Event listener for when a turn is played, update model, then display
    const playTurn = function (event) {
            let playedSpace = event.target.getAttribute("data-attribute");

            //Check space is empty before playing move
            if (gameBoard.returnGrid()[playedSpace] === undefined) {
                gameBoard.playMove(_currentPlayer, playedSpace);

                // Check win
                if (_checkWin() === true) {
                    displayController.updateDisplay();
                    alert(`${_currentPlayer.name} has won!`);
                    // Modal needed to offer to play again
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


// Players will be created by a pre-game modal, these are tests
let player1 = Player("Andy", 1, "X");
let player2 = Player("Bobby", 2, "O");

turnHandler.getPlayers(player1, player2);

//Initialize screen
displayController.updateDisplay();