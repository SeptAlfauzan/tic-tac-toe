const TicTacToe = require('./TicTacToe');
const { OrdinaryAgent, SmartAgent } = require('./Agent');

const prompt = require('prompt-sync')({ sigint: true });

// const playerChoose = prompt('Choose between X/O ?');
const Game = new TicTacToe('X');
// const ordinaryAgent = new OrdinaryAgent('O');
const smartAgent = new SmartAgent('O');
// Game.move(8, 'X');
// console.log(smartAgent.move(Game));
// return;
const initGame = () => {
    // print rule
    console.log(`
        =====================================
        Your position base of input you type

            1|2|3
            _____
            4|5|6
            -----
            7|8|9

        Let's play the game 😃
        =====================================
        `);

    let step = 0;
    while (step < 9) {
        Game.printBoard();
        // Player turn
        const playerPosition = TicTacToe.ask();
        const isPlayerWin = Game.move(playerPosition, 'X');
        Game.printBoard();
        if (isPlayerWin) {
            Game.printBoard();
            console.log(`Game end, ${Game.winner} win the game 🏆!`);
            break;
        };
        // increment step
        step++;
        // Agent turn
        const availableMove = Game.availableMove();
        const agentMove = smartAgent.move(Game);
        const isAgentWin = Game.move(agentMove, smartAgent.letter);
        if (isAgentWin) {
            console.log(`Game end, ${Game.winner} win the game 🏆!`);
            Game.printBoard();
            break;
        }
        // increment step
        step++;
    }
}

initGame();