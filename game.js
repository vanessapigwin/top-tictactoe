const Player = (playerName, marker) => {
    const getName = () => playerName;
    const getMarker = () => marker;
    return {
        getName,
        getMarker
    }
};

const Card = () => {
    let value = 'v';
    const getValue = () => value;
    const updateValue = (player) => {
        value = player.getMarker()
    }
    return {
        getValue,
        updateValue,
    }
}

const gameBoard = () => {
    const gameBoard = [];
    const getBoard = () => gameBoard;
    const makeBoard = () => {
        for (let i = 0; i < 3; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameBoard[i].push(Card())
            }
        }
    }
    makeBoard();
    return {
        getBoard
    }
};

