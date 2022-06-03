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

    const checkWin = () => {
        // Check horizontal win (%1)
        // Check vertcal win (%3)
        // Check diagonal win (special cases) 

    }

    return {
        playMove,
        returnGrid,
        checkWin,
    };
})();

const turnHandler = (function() {
    const _gridElements = document.querySelectorAll(".space");
    let _currentPlayer = {};
    let _nextPlayer = {};

    // Event listener for when a turn is played, update model, then display
    const playTurn = function (event) {
            let playedSpace = event.target.getAttribute("data-attribute");

            //Check space is empty before playing turn
            if (gameBoard.returnGrid()[playedSpace] === undefined) {
                gameBoard.playMove(_currentPlayer, playedSpace);
                // Update current and next players
                let tempPlayer = _currentPlayer;
                _currentPlayer = _nextPlayer;
                _nextPlayer = tempPlayer;

                // Update display
                displayController.updateDisplay()

            //Then check win

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