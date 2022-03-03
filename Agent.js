class Agent {
    constructor(letter) {
        this.letter = letter;
    }
}
class OrdinaryAgent extends Agent {
    constructor(letter) {
        super(letter);
    }
    randomMove = (availableMove) => {
        return availableMove[Math.ceil(Math.random() * (availableMove.length - 1))];
    }
}

class SmartAgent extends OrdinaryAgent {
    constructor(letter) {
        super(letter);
    }

    move = (gameState) => {
        // random first move
        if (gameState.availableMove().length >= 8) return this.randomMove(gameState.availableMove());
        return this.minimax(gameState, this.letter)['position'];
    }
    minimax = (gameState, player) => {
        const max_player = this.letter;
        // console.log('current played', player)
        const agent = player == 'X' ? 'O' : 'X';

        if (gameState.winner == agent) {
            const emptySquares = gameState.availableMove().length;
            if (max_player == agent) {
                return { position: null, score: emptySquares * 1 };
            } else {
                return { position: null, score: emptySquares * -1 };
            }
        }
        // is there is no possible move
        else if (gameState.availableMove().length == 0) {
            return { position: null, score: 0 };
        }
        let best = { position: null, score: null };
        if (player == max_player) {
            best = { position: null, score: -Infinity };
        } else {
            best = { position: null, score: Infinity };
        }

        gameState.availableMove().forEach(possibleMove => {
            gameState.move(possibleMove, player);
            const simmulation = this.minimax(gameState, agent);
            // reset to previous game state
            gameState.board[possibleMove] = ' ';
            gameState.winner = null;
            simmulation['position'] = possibleMove;

            if (player == max_player) {
                if (simmulation['score'] > best['score']) best = simmulation;
            } else {
                if (simmulation['score'] < best['score']) best = simmulation;
            }
        });
        return best;
    }
}

module.exports = { OrdinaryAgent, SmartAgent };