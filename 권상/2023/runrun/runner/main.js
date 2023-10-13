var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bg1 = document.getElementById("bg1");
var bg2 = document.getElementById("bg2");
var gameboard = document.getElementById("gameboard");
var scoreText = document.getElementById("score");

var jumpBtn = document.getElementById("jumpBtn");
var slideBtn = document.getElementById("slideBtn");

var defaultPos = [100, 295];
var unit = 100;

if(window.innerWidth >= 960){
    canvas.width = 960;
    canvas.height = 540;
}else if(window.innerWidth <= 500){
    var h = window.innerWidth * 0.8;
    var w = window.innerWidth * 0.8 * 16 / 9;

    canvas.height = h;
    canvas.width = w;
    bg1.style.width = w + "px";
    bg1.style.height = h + "px";
    bg2.style.width = w + "px";
    bg2.style.height = h + "px";
    bg2.style.left = w + "px";

    gameboard.style.width = w + "px";
    gameboard.style.height = h + "px";
    // gameboard.style.top = window.innerHeight / 2 + "px";
    // gameboard.style.left = window.innerWidth / 2 - h / 10 + "px";

    defaultPos[0] = defaultPos[0] / 960 * w;
    defaultPos[1] = defaultPos[1] / 960 * w;

    unit = unit / 960 * w;
    jumpBtn.style.transform = 'scale(' + unit/100 + ')';
    slideBtn.style.transform = 'scale(' + unit/100 + ')';
}else{
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * 9 / 16;
    bg1.style.width = window.innerWidth + "px";
    bg1.style.height = window.innerWidth * 9 / 16 + "px";
    bg2.style.width = window.innerWidth + "px";
    bg2.style.height = window.innerWidth * 9 / 16 + "px";
    bg2.style.left = window.innerWidth + "px";
    gameboard.style.width = window.innerWidth + "px";
    gameboard.style.height = window.innerWidth * 9 / 16 + "px";

    defaultPos[0] = defaultPos[0] / 960 * window.innerWidth;
    defaultPos[1] = defaultPos[1] / 960 * window.innerWidth;
    unit = unit / 960 * window.innerWidth;
    jumpBtn.style.transform = 'scale(' + unit/100 + ')';
    slideBtn.style.transform = 'scale(' + unit/100 + ')';
}
var p =  unit / 100;

var runnerImg = new Image();
runnerImg.src = "./main1.png";

var runnerJumpImg = new Image();
runnerJumpImg.src = "./main3.png";

var runnerDownImg = new Image();
runnerDownImg.src = "./main2.png";

var poopImg = new Image();
poopImg.src = "./poop.png";

var shrekImg = new Image();
shrekImg.src = "./shrek.png";

var baseballImg = new Image();
baseballImg.src = "./baseball.png";

runnerImg.onload = ()=>{
    ctx.drawImage(runnerImg, defaultPos[0], defaultPos[1], unit, unit);
};


class Enemy {
    name; //baseball id1 - poop id2 - shrek id3
    id;
    posX;
    posY; //baseball
    speed;
    size; //baseball0.5 - poop1 - shrek1.5
    constructor(id){
        this.id = id;
        if(id == 1){
            this.name = "baseball";
            this.speed = 8 * p;
            this.size = 0.5 * unit;
            this.posX = canvas.width;
            this.posY
        }
        if(id == 2){
            this.name = "poop";
            this.speed = 4 * p;
            this.size = unit;
            this.posX = canvas.width;
        }
        if(id == 3){
            this.name = "shrek";
            this.speed = 10 * p;
            this.size = 1.5 * unit;
            this.posX = canvas.width;
        }
        this.posY = defaultPos[1] - this.size + unit;
        if(id == 1){
            var y = Math.floor(Math.random() * 3);
            this.posY = defaultPos[1] - this.size + unit * y * 0.5;
        }
        this.posX = canvas.width - this.size;
    }
    draw(){
        if(this.id == 1){
            ctx.drawImage(baseballImg, this.posX, this.posY, this.size, this.size);
        }
        if(this.id == 2){
            ctx.drawImage(poopImg, this.posX, this.posY, this.size, this.size);
        }
        if(this.id == 3){
            ctx.drawImage(shrekImg, this.posX, this.posY, this.size, this.size);
        }
    }

    move(){
        this.posX -= this.speed;
    }
    
}

class Player {
    posY;
    status; //1 idle 2 jump 3 down
    sizeY;
    enemies;
    isJumping;
    speedY;
    score;
    

    constructor(){
        this.posY = defaultPos[1];
        this.status = 1;
        this.sizeY = unit;
        this.enemies = [];
        this.isJumping = false;
        this.speedY = 0;
        this.score = 0;
    }

    statusCheck(){
        if(this.status == 1){ //IDLE
            this.sizeY = unit;
            this.posY = defaultPos[1];
        }
        if(this.status == 2){ //JUMP
            this.sizeY = unit;
            this.posY = defaultPos[1] - unit * 0.5;
        }
        if(this.status == 3){ //DOWN
            this.sizeY = unit * 0.5;
            this.posY = defaultPos[1] + unit * 0.5;
        }
    }

    draw(){
        if(this.status == 1){ //IDLE
            ctx.drawImage(runnerImg, defaultPos[0], this.posY, unit, this.sizeY);
        }
        if(this.status == 2){ //JUMP
            ctx.drawImage(runnerJumpImg, defaultPos[0], this.posY, unit, this.sizeY + unit * 0.5);
        }
        if(this.status == 3){ //DOWN
            ctx.drawImage(runnerDownImg, defaultPos[0], this.posY, unit, this.sizeY);
        }
        for(var i = 0; i < this.enemies.length; i++){
            this.enemies[i].draw();
        }
    }

    isTouching(enemy){
        if(enemy.posX < defaultPos[0] + unit - (unit * 0.1) && enemy.posX > defaultPos[0] - enemy.size + (unit * 0.1)){
            if(this.posY < enemy.posY + enemy.size && enemy.posY < this.posY + this.sizeY){
                gameOver();
            }
        }
    }

    scoreUpdate(){
        this.score += 1
        scoreText.innerHTML = this.score;
    }

    move(){
        if(this.isJumping){
            this.posY += this.speedY;
            this.speedY += 0.6 * p;
            if(this.posY > defaultPos[1]){
                this.speedY = 0;
                this.posY = defaultPos[1];
                this.status = 1;
                this.isJumping = false;
                this.statusCheck();
            }
        }

        
        
        

        for(var i = 0; i < this.enemies.length; i++){
            this.enemies[i].move();
            this.isTouching(this.enemies[i]);
        }
    }

    spawn(){
        var id = Math.floor(Math.random() * 3) + 1;
        var enemy = new Enemy(id);
        this.enemies.push(enemy);
    }
}


function gameOver(){
    isGaming = false;
    console.log("Game Over");
}

var enemy1 = new Enemy(2);
var player = new Player;
player.enemies.push(enemy1);

var isGaming = false;

var requestId;
var scoreUpdate = 0;
var latestSpawn = 0;


function animate(now = 0){
    if(!isGaming) return;
    if(now - latestSpawn > 1000 * 2000 / (1000 + player.score)){
        player.spawn();
        latestSpawn = now;
    }
    if(now - scoreUpdate > 100){
        player.scoreUpdate();
        scoreUpdate = now;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    player.draw();

    requestId = requestAnimationFrame(animate);
}



function gameStart(){
    if(isGaming) return;

    player = new Player();
    isGaming = true;
    animate();
}

gameStart();

window.addEventListener("keydown", (event) => {
    console.log(event.keyCode);
    var e = event.keyCode;
    if(!isGaming){
        if(e == 87 || e == 32 || e == 38 || e == 83 || e == 16 || e == 40){
            gameStart();
        }
    }

    if(e == 87 || e == 32 || e == 38){
        if(player.isJumping) return;
        player.status = 2;
        player.isJumping = true;
        player.speedY = -18 * p;
        player.statusCheck();
    }
    if(e == 83 || e == 16 || e == 40){
        player.status = 3;
        player.statusCheck();
    }
});

//87 32    38
//W  Space Up

//83 16        40
//S  LeftShift down
window.addEventListener("keyup", (event) => {
    var e = event.keyCode;
    if(e == 83 || e == 16 || e == 40){
        player.status = 1;
        player.statusCheck();
    }
});

jumpBtn.addEventListener("mousedown", ()=>{
    if(!isGaming){
        gameStart();
    }
        

    if(player.isJumping) return;
    player.status = 2;
    player.isJumping = true;
    player.speedY = -18 * p;
    player.statusCheck();
});
slideBtn.addEventListener("mousedown", ()=>{
    if(!isGaming){
        gameStart();
    }

    player.status = 3;
    player.statusCheck();
});
slideBtn.addEventListener("mouseup", ()=>{
    player.status = 1;
    player.statusCheck();
});
