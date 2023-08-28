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
            const tests = [];

            // diags for testing
            const diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]].map(card => card.getValue());
            const diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]].map(card => card.getValue());
            tests.push(diag1);
            tests.push(diag2);

            // rows for testing
            for (let i = 0; i < 3; i++) {
                const rowArr = [];
                const colArr = [];
                for (let j = 0; j < 3; j++) {
                    rowArr.push(gameBoard[3 * i + j].getValue());
                    colArr.push(gameBoard[3 * j + i].getValue());
                }
                tests.push(rowArr);
                tests.push(colArr);
            }
            
            for (let test of tests) {
                if (test[0] === test[1] && test[1] === test[2] && test[0] !== undefined) {
                    winner = test[0];
                    break;
                }
            }
            return winner;
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard[i] = Card();
        }
    }

    resetBoard();

    return {
        getBoard,
        getEmptyCards,
        getWinner,
        updateBoard,
        resetBoard
    }
};

