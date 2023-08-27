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
        if (getEmptyCards().length === 0) {
            return 'tie'
        }
        else if (getEmptyCards === 9) {
            return
        }
        else {
            let winner;
            const row1 = [gameBoard[0], gameBoard[1], gameBoard[2]].map(card => card.getValue());
            const row2 = [gameBoard[3], gameBoard[4], gameBoard[5]].map(card => card.getValue());
            const row3 = [gameBoard[6], gameBoard[7], gameBoard[8]].map(card => card.getValue());
            const col1 = [gameBoard[0], gameBoard[3], gameBoard[6]].map(card => card.getValue());
            const col2 = [gameBoard[1], gameBoard[4], gameBoard[7]].map(card => card.getValue());
            const col3 = [gameBoard[2], gameBoard[5], gameBoard[8]].map(card => card.getValue());
            const diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]].map(card => card.getValue());
            const diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]].map(card => card.getValue());
        }
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

