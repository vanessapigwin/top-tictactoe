const gameController = () => {
    let player1 = Player('winwin', 'x');
    let player2 = Player('Bart', 'o');
    let currentPlayer = player1;
    let inactivePlayer;

    const board = gameBoard();

    const getCurrentPlayer = () => currentPlayer;
    const getInactivePlayer = () => inactivePlayer;
    const getWinner = () => board.getWinner();

    const switchPlayer = () => {
        inactivePlayer = currentPlayer;
        currentPlayer = currentPlayer == player1? player2 : player1;
    }

    const playRound = (index) => {
        if (getWinner() === undefined) {
            board.updateBoard(index, currentPlayer);
            switchPlayer();
        }
    }

    const resetBoard = () => board.createBoard()

    return {
        getCurrentPlayer,
        getInactivePlayer,
        getWinner,
        switchPlayer,
        playRound,
        resetBoard,
    }
}

const displayController = (()=> {

    const game = gameController();
    const modal = document.querySelector('.my-modal');
    const gameScreen = document.querySelector('#game-screen');
    const gameAreaButtons = gameScreen.querySelectorAll('button');
    const statusDisplay  = gameScreen.querySelector('.game-status');

    const initGame = () => {
        const startButton = modal.querySelector('button');
        gameScreen.classList.add('inactive-screen');
        startButton.addEventListener('click', displayGame);
    }

    const displayGame = (e) => {
        const formElement = document.querySelector('form'); 
        const data = new FormData(formElement);
        const [playerName1, playerName2] = Array.from(data).map(entry => entry[1]);

        game.createPlayers(playerName1, playerName2);
        
        modal.classList.toggle('inactive-screen');
        gameScreen.classList.toggle('inactive-screen');
        // updateDisplay();
        e.preventDefault();
    };

    const assignLocations = () => {
        for (let i = 0; i < 9; i++) {
            gameAreaButtons[i].dataset.index = i;
        }
    }

    const updateDisplay = (index) => {
        let winner;
        statusDisplay.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
        if (index !== undefined) {
            gameAreaButtons[index].textContent = game.getInactivePlayer().getMarker();
        }

        const statusText = (winner === undefined) ?
            `${game.getCurrentPlayer().getName()}'s turn`:
            `${game.getInactivePlayer().getName()}' wins!`;

        statusDisplay.textContent = statusText;
    }

    const watchEvents = (e) => {
        let winner;
        if (e.target.dataset &&  winner === undefined) {
            let index = Number(e.target.dataset.index);
            game.playRound(index);
            updateDisplay(index);
        } else {
            statusDisplay.textContent = `${game.getInactivePlayer().getName()} wins!`
        }
        
    }
    
    initGame();
    assignLocations();
    updateDisplay();
    gameAreaButtons.forEach((button) => button.addEventListener('click', watchEvents, {once: true}))
    document.querySelector('#restart').addEventListener('click', displayGame);
})();
