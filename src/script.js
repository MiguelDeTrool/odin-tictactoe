const displayController = (function() {
    const _gridDisplay = document.querySelectorAll(".space");
    const _playerDisplay = document.querySelector(".player-display");

    const _updateGrid = (currentGrid) => {
        for (let i = 0; i < currentGrid.length; i++) {
            _gridDisplay[i].textContent = currentGrid[i];
        };
    };

    const _updatePlayer = (currentPlayer) => {
        _playerDisplay.textContent = `Player ${currentPlayer.number}'s turn, (${currentPlayer.mark})`
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
    // const _grid = new Array(9);
    const _grid = ["O", "X", "O", "X", "O", "O", "X", "O", "X",];

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

    // Event listener for when a turn is played, update model, then display
    _gridElements.forEach((element) => {
        element.addEventListener('click', () => {
            let playedSpace = element.getAttribute("data-attribute");
            gameBoard.playMove(_currentPlayer, playedSpace);
            displayController.updateDisplay()

            // Update current and next players
            let tempPlayer = _currentPlayer;
            _currentPlayer = _nextPlayer;
            _nextPlayer = tempPlayer;
        });
    });

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

displayController.updateDisplay();

// Test players, will be created by a pre-game modal
var player1 = Player("Andy", 1, "X");
let player2 = Player("Bobby", 2, "O");

turnHandler.getPlayers(player1, player2);