var container = document.getElementById("container");
var cells = [0,0,0,0,0,0,0,0,0];
var board = document.getElementsByClassName("cell");
var isDragging = false;
var dragColor = 0;
var size = 3;
var isRunning = false;
var runInterval;

function reLoad(){
    container.innerHTML = "";
    for(var i=0; i<size*size ;i++){
        var newCell = document.createElement("div");
        newCell.classList.add("cell");
        newCell.id = "c"+i;
        newCell.style.width = 600 / size + 'px';
        newCell.style.height = 600 / size + 'px';
        container.appendChild(newCell);
    }
    board = document.getElementsByClassName("cell");
    cells = [];
    for(var i=0; i<size*size; i++){
        cells.push(0);
    }
    for(var i=0; i<board.length; i++){
        board[i].addEventListener("mousedown", fill);
        board[i].addEventListener("mouseenter", drag);
    }
}

function fill(event){
    var num = event.target.id.split("c")[1] * 1;
    isDragging = true;
    
    if(cells[num] == 0){
        cells[num] = 1;
        dragColor = 1;
        event.target.classList.add("live");
    }else{
        cells[num] = 0;
        dragColor = 0;
        event.target.classList.remove("live");
    }
}

function drag(event){
    if(isDragging){
        var num = event.target.id.split("c")[1] * 1;
        if(cells[num] == 0 && dragColor == 1){
            cells[num] = 1;
            event.target.classList.add("live");
        }else if(cells[num] == 1 && dragColor == 0){
            cells[num] = 0;
            event.target.classList.remove("live");
        }
    }
}

function stopDragging(){
    isDragging = false;
}

function sizeChange(event){
    if(event.keyCode == 187){
        size++;
    }else if(event.keyCode == 189){
        size--;
    }else{
        return;
    }
    reLoad();
}

window.addEventListener("mouseup", stopDragging);
reLoad();
window.addEventListener("keydown", sizeChange);


// 1. live cell neighbor : 2~3 => live
// 2. live cell neighbor : 1, 4~ => die
// 3. dead cell neighbor : 3 => live

function oneDay(){
    var nextCells = [];
    for (var i=0; i < size*size; i++){
        nextCells.push(0);
    }  
    for(var a=0; a<size; a++){
        for(var b=0; b<size; b++){
            var index = size * b + a;
            var neighbor = getNeighbor(a, b);
            if(getCell(a,b) == 1){ //live cell
                if(neighbor == 2 || neighbor == 3){
                    nextCells[index] = 1;
                }
            }else{ //dead cell
                if(neighbor == 3){
                    nextCells[index] = 1;
                }
            }
        }
    }
    cells = nextCells;
    loadCells();
}

function getCell(x, y){
    if(x < 0 || y < 0 || x >= size || y >=size){
        return 0;
    }
    return cells[x + y * size];
}

function getNeighbor(x, y){
    var neighbors = 0;
    for(var i=-1; i<=1; i++){
        for(var j=-1; j<=1; j++){
            if(i!=0 || j!=0){
                neighbors += getCell(x+i, y+j);
            }
        }
    }
    return neighbors;
}

function loadCells(){
    for(var i=0; i<size*size; i++){
        if(cells[i] == 1){
            if(!board[i].classList.contains("live")){
                board[i].classList.add("live");
            }
        }else{
            if(board[i].classList.contains("live")){
                board[i].classList.remove("live");
            }
        }
    }
}

function start(){
    runInterval = setInterval(oneDay, 100);
    isRunning = true;
}

function end(){
    clearInterval(runInterval);
    isRunning = false;
}

function space(event){
    if(event.keyCode == 32){
        if(isRunning == true){
            end()
        }else{
            start();
        }
    }
}

window.addEventListener("keydown", space);