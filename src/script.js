const displayController = (function() {
    // let grid = document.querySelectorAll();  Need to define selector

    return {

    };
})();

const gameBoard = (function() {
    _grid = new Array(9);
    let playMove = function(player, space) {
        let currentMark = player.mark;
        _grid[space] = currentMark;
    };

    return {
        playMove,
    };
})();

const Player = function(name, mark) {

    return {

    };
};