const prompt = require('prompt-sync')({ sigint: true });

const Board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' ',
}

const winCondition = {
    row: {
        top: [1, 2, 3],
        middle: [4, 5, 6],
        bottom: [7, 8, 9]
    },
    col: {
        left: [1, 4, 7],
        middle: [2, 5, 8],
        right: [3, 6, 9]
    },
    diagonal: {
        first: [1, 5, 9],
        last: [3, 5, 7]
    }
}

class TicTacToe {
    constructor(player) {
        if (player === 'X') {
            this.player = 'X';
            this.agent = 'O';
        } else {
            this.player = 'O';
            this.agent = 'X';
        }
        this.board = Board;
        this.winCondition = winCondition;
        this.winner = null;
    }
    printBoard = () => {
        ;
        console.log(`
            ${this.board[1]}|${this.board[2]}|${this.board[3]}
            _____
            ${this.board[4]}|${this.board[5]}|${this.board[6]}
            -----
            ${this.board[7]}|${this.board[8]}|${this.board[9]}
        `)
    }

    static ask = () => {
        return prompt("Please input your position ");
    }

    move = (position, letter) => {
        if (this.board[position] !== ' ') return false;
        this.board[position] = letter;
        // check if current player win the game
        const checkWinner = this.checkWinner(letter);
        if (checkWinner) {
            // console.log(`Game end, ${letter} win the game 🏆!`);
            this.winner = letter;
            return true;
        }
        return false;
    }

    checkWinner = (letter) => {
        // check every row
        for (const [key, value] of Object.entries(this.winCondition.row)) {
            // console.log(key, value);
            const selectedElements = value.map(index => {
                return this.board[index];
            })
            if (selectedElements.every(value => value == letter)) return true;
        }
        // check every col
        for (const [key, value] of Object.entries(this.winCondition.col)) {
            // console.log(key, value);
            const selectedElements = value.map(index => {
                return this.board[index];
            })
            if (selectedElements.every(value => value == letter)) return true;
        }
        // check every diagonal
        for (const [key, value] of Object.entries(this.winCondition.diagonal)) {
            // console.log(key, value);
            const selectedElements = value.map(index => {
                return this.board[index];
            })
            if (selectedElements.every(value => value == letter)) return true;
        }
        return false;
    }

    availableMove = () => {
        const result = [];
        for (const key in Board) {
            if (Board[key] === ' ') result.push(key);
        }
        return result;
    }

}

module.exports = TicTacToe;