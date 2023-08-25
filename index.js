const gameController = (()=> {

    const gameScreen = document.querySelector('#game-screen');
    const modal = document.querySelector('.my-modal');

    const initGame = () => {
        const startButton = modal.querySelector('button');
        gameScreen.classList.add('inactive-screen');
        startButton.addEventListener('click', displayGame);
    }

    const displayGame = () => {
        modal.classList.toggle('inactive-screen');
        gameScreen.classList.toggle('inactive-screen');
    };

    return {
        initGame
    }

})();

gameController.initGame();