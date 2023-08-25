const gameController = () => {
    let player1 = Player('winwin', 'x');
    let player2 = Player('Bart', 'o');
    let currentPlayer = player1;

    const board = gameBoard();

    const getBoard = () => board;

    const switchPlayer = () => {
        currentPlayer = currentPlayer == player1? player2 : player1;
    }

    const playRound = (row, column) => {
        console.log(currentPlayer.getName(), row, column)
        // update game board data
        // update screen
        switchPlayer();
    }

    return {
        playRound,
        getBoard
    }
}

const displayController = (()=> {

    const game = gameController();
    const modal = document.querySelector('.my-modal');
    const gameScreen = document.querySelector('#game-screen');
    const gameArea = gameScreen.querySelector('#game-board');

    const initGame = () => {
        const startButton = modal.querySelector('button');
        gameScreen.classList.add('inactive-screen');
        startButton.addEventListener('click', displayGame);
    }

    const displayGame = () => {
        modal.classList.toggle('inactive-screen');
        gameScreen.classList.toggle('inactive-screen');
    };

    const assignLocations = () =>  {
        for (let i = 0; i < gameArea.childElementCount; i++) {
            let row =  gameArea.children[i];
            for (let j = 0; j < row.childElementCount; j++) {
                let button = row.children[j];
                button.dataset.row = i;
                button.dataset.column = j;
            }
        }
    }

    const updateScreen = () => {

    }

    const watchEvents = (e) => {
        if (e.target.dataset) {
            let row = e.target.dataset.row;
            let column = e.target.dataset.column;
            game.playRound(row, column);
            updateScreen();
        }
    }
    
    initGame();
    assignLocations();
    gameArea.addEventListener('click', watchEvents);
    
})();
