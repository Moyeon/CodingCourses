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

var nowHolding = -1; //holdBox 안의 테트로미노
var didHolding = false; //지금 hold를 했었는지

function holdBoxLoadTetromino(num){
    holdBox.innerHTML = "";
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


class NextTetromino {
    arr;
    group;

    constructor(){
        this.arr = [];
        this.group = [];
        this.fillGroup();
        this.nextBoxFirstLoad();
    }

    getFirstTetromino(){
        var first = this.arr[0];
        this.arr = this.arr.slice(1);
        if(this.arr.length < 5){
            this.fillGroup();
        }
        this.nextBoxLoad();
        return first;
    }

    fillGroup(){
        if(this.group.length < 7){
            this.group = [0, 1, 2, 3, 4, 5, 6];
            this.group.sort(() => Math.random() - 0.5);
        }
        Array.prototype.push.apply(this.arr, this.group);
    }

    nextBoxLoadTetromino(num){
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

    nextBoxFirstLoad(){
        for(var i = 0; i < 5; i++){
            this.nextBoxLoadTetromino(this.arr[i]);
        }
    }

    nextBoxLoad(){
        nextBox.removeChild(nextBox.firstChild);
        this.nextBoxLoadTetromino(this.arr[4]);
    }

}
var nextTetromino = new NextTetromino();

var gameGrid = document.getElementById("gameGrid");

class Tetromino {
    type; // 0~6
    x;
    y;
    shape; //size*size array
    divArray;
    spinState;
    shadow;

    constructor(num = -1){
        this.spinState = 0;
        if (num == -1){
            this.type = nextTetromino.getFirstTetromino();
            didHolding = false;
            holdBox.style.filter = "";
        }
        else{
            this.type = num;
        }
        
        this.shape = JSON.parse(JSON.stringify(TETROMINO[this.type].shape));
        this.x = 3;
        this.y = 0;
        this.divArray = [];
        this.shadow = [];
        if(this.type == 6){
            this.x = 4;
        }
        if(this.type == 5){
            this.y = -1;
        }
        for(var i = 0; i < this.shape.length; i++){
            for(var j = 0; j < this.shape.length; j++){
                if(this.shape[i][j] > 0){
                    const block = document.createElement("div");
                    block.classList.add('block');
                    block.classList.add(TETROMINO[this.type].color);
                    block.classList.add("x" + (this.x + j));
                    block.classList.add("y" + (this.y + i));

                    gameGrid.appendChild(block);
                    this.divArray.push(block);

                    const sblock = document.createElement("div");
                    sblock.classList.add('block');
                    sblock.classList.add('shadow');
                    sblock.classList.add("x" + (this.x + j));
                    sblock.classList.add("y" + (this.y + i));

                    gameGrid.appendChild(sblock);
                    this.shadow.push(sblock);
                }
            }
        }
        this.shadowUpdate();
    }

    shadowUpdate(){
        var num = this.y;
        for(var y = this.y; y < 20; y++){
            if(this.canMove(this.x, y, this.shape)){
                num = y;
            }else{
                break;
            }
        }

        var block = 0;
        for(var i = 0; i < this.shape.length; i++){
            for(var j = 0; j < this.shape.length; j++){
                if(this.shape[i][j] > 0){
                    var b = this.shadow[block];
                    var newYPos = num + i;
                    var newXPos = this.x + j;
                    b.classList.replace(b.classList[3], "y" + newYPos);
                    b.classList.replace(b.classList[2], "x" + newXPos);
                    block++;
                }
            }
        }
    }

    shadowDelete(){
        for(var i = 0; i < 4; i++){
            gameGrid.removeChild(this.shadow[i]);
        }
    }

    moveDown(){
        //canmove?
        if(this.canMove(this.x, this.y + 1)){
            this.y++;
            for(var i = 0; i < 4; i++){
                var block = this.divArray[i];
                var yPos = block.classList[3];
                var newYPos = Number(yPos.slice(1)) + 1;
                block.classList.replace(yPos, "y" + newYPos);
            }
            return true;
        }
        return false;
    }

    moveLeft(){
        if(this.canMove(this.x - 1, this.y)){
            this.x = this.x - 1;
            for(var i = 0; i < 4; i++){
                var block = this.divArray[i];
                var xPos = block.classList[2];
                var newXPos = Number(xPos.slice(1)) - 1;
                block.classList.replace(xPos, "x" + newXPos);
            }
        }
        this.shadowUpdate();
    }

    moveRight(){
        if(this.canMove(this.x + 1, this.y)){
            this.x = this.x + 1;
            for(var i = 0; i < 4; i++){
                var block = this.divArray[i];
                var xPos = block.classList[2];
                var newXPos = Number(xPos.slice(1)) + 1;
                block.classList.replace(xPos, "x" + newXPos);
            }
        }
        this.shadowUpdate();
    }

    spinClock(){
        var p = JSON.parse(JSON.stringify(this.shape));

        for(var i = 0; i < p.length; i++){
            for(var j = 0; j < i; j++){
                [p[i][j], p[j][i]] = [p[j][i], p[i][j]];
            }
        }
        p.forEach((row) => row.reverse());
        p.forEach((row) => console.log(row));

        for(var i = 0; i < 5; i++){
            var newX = this.x;
            var newY = this.y;
            if(this.type < 5){
                newX = newX + JLTSZ[this.spinState].clockwise[i][0];
                newY = newY + JLTSZ[this.spinState].clockwise[i][1];
            }if(this.type == 5){
                newX = newX + I_SPIN[this.spinState].clockwise[i][0];
                newY = newY + I_SPIN[this.spinState].clockwise[i][1];
            }

            if(!this.canMove(newX, newY, p)){
                continue;
            }
            
            this.shape = p;
            this.spinState = (this.spinState + 1) % 4;

            for(var i = 0; i < 4; i++){
                var block = this.divArray[i];
                var xPos = block.classList[2];
                var yPos = block.classList[3];
                var newXPos = this.shape.length - 1 - (yPos.slice(1) - this.y) + newX;
                var newYPos = (xPos.slice(1) - this.x) + newY;

                block.classList.replace(xPos, "x" + newXPos);
                block.classList.replace(yPos, "y" + newYPos);
            }
            this.x = newX;
            this.y = newY;
        }
        this.shadowUpdate();
    }

    spinCounter(){
        var p = JSON.parse(JSON.stringify(this.shape));

        for(var i = 0; i < p.length; i++){
            for(var j = 0; j < i; j++){
                [p[i][j], p[j][i]] = [p[j][i], p[i][j]];
            }
        }
        p = p.reverse();
        p.forEach((row) => console.log(row));

        for(var i = 0; i < 5; i++){
            var newX = this.x;
            var newY = this.y;
            if(this.type < 5){
                newX = newX + JLTSZ[this.spinState].counter[i][0];
                newY = newY + JLTSZ[this.spinState].counter[i][1];
            }if(this.type == 5){
                newX = newX + I_SPIN[this.spinState].counter[i][0];
                newY = newY + I_SPIN[this.spinState].counter[i][1];
            }

            if(!this.canMove(newX, newY, p)){
                continue;
            }
            
            this.shape = p;
            this.spinState = (this.spinState + 3) % 4;

            for(var i = 0; i < 4; i++){
                var block = this.divArray[i];
                var xPos = block.classList[2];
                var yPos = block.classList[3];
                var newXPos = (yPos.slice(1) - this.y) + newX;
                var newYPos = this.shape.length - 1 - (xPos.slice(1) - this.x) + newY;
    
                block.classList.replace(xPos, "x" + newXPos);
                block.classList.replace(yPos, "y" + newYPos);
            }
            this.x = newX;
            this.y = newY;
        }
        this.shadowUpdate();
    }

    canMove(x, y, p = this.shape){
        //wall? map check
        for(var i = 0; i < p.length; i++){
            for(var j = 0; j < p.length; j++){
                if(p[i][j] > 0){
                    if(x + j >= 10 || y + i >= 20 || x + j < 0){
                        return false;
                    }
                    if(gameBoard.map[y + i][x + j] > 0){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    hold(){
        //todo : put current tetromino inside the holdBox
        //       and return current id.
        if (didHolding) return -2;
        didHolding = true;
        holdBox.style.filter = "grayscale(1)";
        var holded = nowHolding;
        holdBoxLoadTetromino(this.type);
        nowHolding = this.type;
        for(var i=0; i<4; i++){
            gameGrid.removeChild(this.divArray[i]);
        }
        return holded;
    }
}

class GameBoard {
    map = [];
    divMap;

    constructor(){
        this.map = [];
        for(var i = 0; i < 20; i++){
            this.map.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
        }
        this.divMap = [];
        for(var i = 0; i < 20; i++){
            this.divMap.push([null, null, null, null, null,
                            null, null, null, null, null]);
        }
        console.log(this.divMap);
    }

    appendDiv(tetro){
        // type; x; y; shape; divArray;
        var l = tetro.shape.length;
        for(var i = 0; i < l; i++){
            for(var j = 0; j < l; j++){
                if(tetro.shape[i][j] > 0){
                    this.map[i + tetro.y][j + tetro.x] = tetro.shape[i][j];
                }
            }
        }

        for(var i = 0; i < 4; i++){
            const block = tetro.divArray[i];
            var xPos = block.classList[2].slice(1);
            var yPos = block.classList[3].slice(1);

            this.divMap[yPos][xPos] = block;

        }

        this.clearLines();
    }

    clearLines(){
        var lines = 0;
        for(var row = 19; row >= 0; row--){
            var clear = true;
            for(var j = 0; j<10; j++){
                if(this.map[row][j] == -1){
                    clear = false;
                }
            }

            if(clear){
                lines++;
                for(var j = 0; j < 10; j++){
                    gameGrid.removeChild(this.divMap[row][j]);
                }
                this.divMap.splice(row, 1);
                this.divMap.unshift([null, null, null, null, null,
                                    null, null, null, null, null]);
                this.map.splice(row, 1);
                this.map.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);

                row++;
            }
        }
        if(lines == 0){
            return;
        }

        for(var row = 0; row < 20; row++){
            for(var col = 0; col < 10; col++){
                if(this.divMap[row][col] != null){
                    var xpos = this.divMap[row][col].classList[2];
                    var ypos = this.divMap[row][col].classList[3];
                    this.divMap[row][col].classList.replace(xpos, "x" + col);
                    this.divMap[row][col].classList.replace(ypos, "y" + row);
                }
            }
        }
    }
}
var gameBoard = new GameBoard();

function keyMoveLeft(){
    current.moveLeft();
}
function keyMoveRight(){
    current.moveRight();
}
function keyMoveDown(){
    if(!current.moveDown()){
        gameBoard.appendDiv(current);
        current.shadowDelete();
        current = new Tetromino();
    }
}
function keySpinClock(){
    current.spinClock();
}
function keySpinCounter(){
    current.spinCounter();
}
function keyHold(){
    var holded = current.hold();
    if(holded == -2) return;
    current.shadowDelete();
    current = new Tetromino(holded);
}
function keyHardDrop(){
    while(current.moveDown()){
        continue;
    }
    gameBoard.appendDiv(current);
    current.shadowDelete();
    current = new Tetromino();
}

var pressedKeyList = [];

window.addEventListener("keydown", (event) => {
    event.preventDefault();

    if(event.keyCode == KEYSETTING[5].keyCode){
        keySpinClock();
    }
    if(event.keyCode == KEYSETTING[7].keyCode){
        keyHold();
    }
    if(event.keyCode == KEYSETTING[3].keyCode){
        keyHardDrop();
    }
    if(event.keyCode == KEYSETTING[4].keyCode){
        keySpinCounter();
    }
    if(event.keyCode == KEYSETTING[6].keyCode){
        keySpinClock();
        keySpinClock();
    }
    
    pressedKeyList[event.keyCode] = true;
});

window.addEventListener("keyup", (event)=>{
    pressedKeyList[event.keyCode] = false;
});

var current = new Tetromino();
var animateTime = 0;
var arrTime = 0; //keyDelay
var dasTime = -2; //keyHoldDelay, -1 = allowed, -2 = not pressed yet
var sdfTime = 0; //softDrop

function animate(now = 0){
    if(dasTime == -2){
        if(pressedKeyList[KEYSETTING[0].keyCode] ||
            pressedKeyList[KEYSETTING[1].keyCode] ||
            pressedKeyList[KEYSETTING[2].keyCode]){
                dasTime = now + Number(SETTING.keyHoldDelay);
            }
    }
    else if(dasTime == -1 || dasTime < now){
        if(now - arrTime > SETTING.keyDelay){
            if(pressedKeyList[KEYSETTING[0].keyCode]){
                keyMoveLeft();
                arrTime = now;
            }
            if(pressedKeyList[KEYSETTING[1].keyCode]){
                keyMoveRight();
                arrTime = now;
            }
            if(!(pressedKeyList[KEYSETTING[0].keyCode] ||
                pressedKeyList[KEYSETTING[1].keyCode] ||
                pressedKeyList[KEYSETTING[2].keyCode])){
                dasTime = -2;
            }
        }
        if(now - sdfTime > SETTING.softDrop){
            if(pressedKeyList[KEYSETTING[2].keyCode]){
                keyMoveDown();
                sdfTime = now;
            }
            if(!(pressedKeyList[KEYSETTING[0].keyCode] ||
                pressedKeyList[KEYSETTING[1].keyCode] ||
                pressedKeyList[KEYSETTING[2].keyCode])){
                dasTime = -2;
            }
        }
        if(!(pressedKeyList[KEYSETTING[0].keyCode] ||
            pressedKeyList[KEYSETTING[1].keyCode] ||
            pressedKeyList[KEYSETTING[2].keyCode])){
            dasTime = -2;
        }
    }
    
    
    if(now - animateTime > 1000){
        if(!current.moveDown()){
            gameBoard.appendDiv(current);
            current.shadowDelete();
            current = new Tetromino();
        }
        animateTime = now;
    }

    requestAnimationFrame(animate);
}

function gameStart(){
    animate();
}

animate();