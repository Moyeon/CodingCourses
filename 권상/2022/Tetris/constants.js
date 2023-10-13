const COLS = 10;
const ROWS = 20;
const BLOCKSIZE = 30;

const POINT = {
    SINGLE : 100,
    DOUBLE : 300,
    TRIPLE : 500,
    TETRIS : 800,
    SOFT_DROP : 1,
    HARD_DROP : 2
};

const LINES_PER_LEVEL = 10;
const LEVEL = {
    0 : 1000,
    1 : 900,
    2 : 800,
    3 : 720,
    4 : 630,
    5 : 550,
    6 : 490,
    7 : 460,
    8 : 440,
    9 : 430,
    10 : 420,
    11 : 400
};

const TETROMINO = [
    {
        shape: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
        color: 'orange'
    },{
        shape: [
                [0, 0, 0, 0],
                [2, 2, 2, 2],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
        color: 'cyan'
    },{
        shape: [
                [3, 0, 0],
                [3, 3, 3],
                [0, 0, 0]
            ],
        color: 'blue'
    },{
        shape: [
                [4, 4],
                [4, 4]
            ],
        color: 'yellow'
    },{
        shape: [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0]
            ],
        color: 'green'
    },{
        shape: [
                [0, 6, 0],
                [6, 6, 6],
                [0, 0, 0]
            ],
        color: 'purple'
    },{
        shape: [
                [7, 7, 0],
                [0, 7, 7],
                [0, 0, 0]
            ],
        color: 'red'
    }

];

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38,
    SPACE: 32
};