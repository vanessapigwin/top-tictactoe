const gameController = () => {
    let player1;
    let player2;
    let currentPlayer;
    let inactivePlayer;

    const board = gameBoard();

    const createPlayers = (name1, name2) => {
        player1 = Player(name1, 'x');
        player2 = Player(name2, 'o');
        currentPlayer = player1;
    }
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

    return {
        createPlayers,
        getCurrentPlayer,
        getInactivePlayer,
        getWinner,
        switchPlayer,
        playRound,
    }
}

const displayController = (()=> {

    let game = gameController();
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
        document.querySelector('#restart').addEventListener('click', resetGame);
        gameAreaButtons.forEach((button) => button.addEventListener('click', watchEvents, {once: true}));
        assignLocations();
        updateDisplay();

        e.preventDefault();
    };

    const assignLocations = () => {
        for (let i = 0; i < 9; i++) {
            gameAreaButtons[i].dataset.index = i;
        }
    }

    const updateDisplay = (index, winner) => {
        statusDisplay.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
        if (index !== undefined) {
            gameAreaButtons[index].textContent = game.getInactivePlayer().getMarker();
        }

        const statusText = (winner === undefined) ?
            `${game.getCurrentPlayer().getName()}'s turn`:
            `${game.getInactivePlayer().getName()} wins!`;

        statusDisplay.textContent = statusText;
    }

    const watchEvents = (e) => {
        let winner;
        if (e.target.dataset &&  winner === undefined) {
            let index = Number(e.target.dataset.index);
            game.playRound(index);
            winner = game.getWinner();
            updateDisplay(index, winner);
        } 
        if (winner) {
            gameAreaButtons.forEach((button) => button.removeEventListener('click', watchEvents))
        }
    }

    const resetGame = () => {
        gameAreaButtons.forEach((button) => button.addEventListener('click', watchEvents, {once: true}))
        gameAreaButtons.forEach(button => button.textContent = '');
        statusDisplay.textContent = `${game.getCurrentPlayer().getName()}'s turn`;
    }
    
    initGame();
})();
