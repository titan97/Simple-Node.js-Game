const prompt = require('prompt-sync')({sigint: true});



const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.playerPosition = [0, 0];
        this.moveSet = "URDL";
    }

    print() {
        let str = '';
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++)  {
                str += this.field[i][j];
            }
            console.log(str);
            str = '';
        }
    }

    move(direction) {
        if (this.moveSet.includes(direction)) {
            let newPosition = this.playerPosition;
            if (direction === 'U') {
                newPosition[0] -= 1;
            } else if (direction === 'R') {
                newPosition[1] += 1;
            } else if (direction === 'D') {
                newPosition[0] += 1;
            } else if (direction === 'L') {
                newPosition[1] -= 1;
            } 
            if (this.checkValidMove(newPosition) === true) {
                if (this.isWinner(newPosition) === true) {
                    console.log('You found the hat!');
                } else {
                    this.field[newPosition[0]][newPosition[1]] = '*';
                    this.playerPosition = newPosition;
                }
            }
        } else {
            console.log('invalid direction input. Please use the following:\n Up: U\n Right: R\n Down: D\n Left: L');
        }
    }

    isWinner(position) {
        return this.field[position[0]][position[1]] === '^' || this.field[position[0]][position[1]] === 'O';
    }

    isHole(position) {
    }

    checkValidMove(position) {
        if (position[0] > this.field.length - 1 || position[0] < 0 ||
            position[1] > this.field[0].length - 1 || position[1] < 0) {
            return false;
        } 
        return true;
    }
}

const start = new Field([['*', '░', '░', '░'], 
                         ['░', '░', '░', '░'], 
                         ['░', 'O', '░', '░'], 
                         ['░', '░', '░', '^']]);

let move = '';
let gameWon = false;
while (gameWon != true) {
    start.print();
    move = prompt('What is your move?');
    start.move(move);
    gameWon = start.isWinner(start.playerPosition);
    console.log(start.playerPosition);
    console.log(start.isWinner(start.playerPosition));
}