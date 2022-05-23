const displayController = (function() {
    const _gridDisplay = document.querySelectorAll(".space");
    const _playerDisplay = document.querySelector("player-display");

    _gridDisplay.forEach((element) => {
        element.addEventListener('click', () => {
            element.getAttribute("data-attribute");
        });
    });

    const _updateGrid = (currentGrid) => {
        for (let i = 0; i < _gridDisplay.length; i++) {
            _gridDisplay[i].textContent = currentGrid[i];
        }
    };

    const _updatePlayer = (currentPlayer) => {
        _playerDisplay.textContent = `Player ${currentPlayer.number}'s turn, (${currentPlayer.mark})`
        //make an element's textContent say "Player 1's turn (X)" or opposite
    };

    const updateDisplay = () => {
        _updateGrid(gameBoard.returnGrid());
        _updatePlayer("????");
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
        returnGrid
    };
})();

const Player = function(name, number, mark) {

    return {
        name,
        number,
        mark,
    };
};

// displayController.updateDisplay()