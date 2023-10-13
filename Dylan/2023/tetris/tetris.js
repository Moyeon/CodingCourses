var TETROMINO = [
    {
        color: "blue",
        shape: [[1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]]
    },{
        color: "orange",
        shape: [[0, 0, 2],
                [2, 2, 2],
                [0, 0, 0]]
    },{
        color: "red",
        shape: [[3, 3, 0],
                [0, 3, 3],
                [0, 0, 0]]
    },{
        color: "green",
        shape: [[0, 4, 4],
                [4, 4, 0],
                [0, 0, 0]]
    },{
        color: "pink",
        shape: [[0, 5, 0],
                [5, 5, 5],
                [0, 0, 0]]
    },{
        color: "mint",
        shape: [[0, 0, 0, 0],
                [6, 6, 6, 6],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
    },{
        color: "yellow",
        shape: [[7, 7],
                [7, 7]]
    }
];

var holdBox = document.getElementById("holdBox");
var nextBox = document.getElementById("nextBox");

function holdBoxLoadTetromino(num){
    var tetro = document.createElement("div");
    tetro.classList = "tetro";
    holdBox.appendChild(tetro);
    var l = TETROMINO[num].shape.length;

    for(var y = 0; y < l; y++){
        for(var x = 0; x < l; x++){
            if(TETROMINO[num].shape[y][x] > 0){
                var block1 = document.createElement("div");
                block1.classList = "block " + TETROMINO[num].color;
                block1.style.left = (x - l/2) * 30 + "px";
                if(num == 5){
                    block1.style.top = (y - 3/2) * 30 + "px";
                }else{
                    block1.style.top = (y - 1) * 30 + "px";
                }
                tetro.appendChild(block1);
            }
        }
    }
}
holdBoxLoadTetromino(6);



var nextTetromino = [4, 0, 5, 5, 3];

function nextBoxLoadTetromino(num){
    var tetro = document.createElement("div");
    tetro.classList = "tetro";
    nextBox.appendChild(tetro);
    var l = TETROMINO[num].shape.length;

    for(var y = 0; y < l; y++){
        for(var x = 0; x < l; x++){
            if(TETROMINO[num].shape[y][x] > 0){
                var block1 = document.createElement("div");
                block1.classList = "block " + TETROMINO[num].color;
                block1.style.left = (x - l/2) * 30 + "px";
                if(num == 5){
                    block1.style.top = (y - 3/2) * 30 + "px";
                }else{
                    block1.style.top = (y - 1) * 30 + "px";
                }
                tetro.appendChild(block1);
            }
        }
    }
}

for(var i = 0; i < nextTetromino.length; i++){
    nextBoxLoadTetromino(nextTetromino[i]);
}