const Player = (playerName, marker) => {
    const getName = () => playerName;
    const getMarker = () => marker;
    return {
        getName,
        getMarker
    }
};

const Card = () => {
    let value;
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
    const getEmptyCards = () => gameBoard.filter((card) => (!card.getValue()));
    const updateBoard = (index, currentPlayer) => gameBoard[index].updateValue(currentPlayer);

    const getWinner = () => {
        //
    }

    for (let i = 0; i < 9; i++) {
        gameBoard[i] = Card();
    }

    return {
        getBoard,
        getEmptyCards,
        getWinner,
        updateBoard
    }
};

