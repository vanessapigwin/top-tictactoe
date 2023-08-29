const ai = (()=>{
    const findBestMove = (board, player, opponent) => {
        let bestValue = -1000;
        let bestRow = -1;

        for (let i = 0; i < 9; i++) {
            if (!board.getBoard()[i].getValue()) {
                board.updateBoard(i, player);
                let moveValue = minimax(board, 0, false, player, opponent);
                board.getBoard()[i] = Card();

                if (moveValue > bestValue) {
                    bestValue = moveValue;
                    bestRow = i;
                }
            }
        }
        return bestRow;
    }

    const minimax = (board, depth, isMax, player, opponent) => {
        let best;
        let winner = board.getWinner();

        if (winner === player.getMarker()) {
            return 10;
        }
        else if (winner === opponent.getMarker()) {
            return -10
        }
        else if (board.getEmptyCards().length === 0) {
            return 0
        } 
        else {
            if (isMax) {
                best = -1000;
    
                for (let i = 0; i < 9; i++) {
                    if (!board.getBoard()[i].getValue()) {
                        board.updateBoard(i, player);
                        best = Math.max(best, minimax(board, depth+1, !isMax, player, opponent));
                        board.getBoard()[i] = Card();
                    }
                }
                return best
            }
            else {
                best = 1000;
    
                for (let i = 0; i < 9; i++) {
                    if (!board.getBoard()[i].getValue()) {
                        board.updateBoard(i, opponent);
                        best = Math.min(best, minimax(board, depth+1, !isMax, player, opponent));
                        board.getBoard()[i] = Card();
                    }
                }
                return best
            }
        }
    }

    return {
        findBestMove,
    }
})();