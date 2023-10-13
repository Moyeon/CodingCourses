var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var bg1 = document.getElementById('bg1');
var bg2 = document.getElementById('bg2');
var gb = document.getElementById('gameBoard');
var scoreText = document.getElementById('score');

var jumpBtn = document.getElementById('jump');
var slideBtn = document.getElementById('slide');

var defaultPos = [100, 288];
var unit = 100;

var beforeEnemyId = 0;

// window.innerWidth
if(window.innerWidth >= 960){
    canvas.width = 960;
    canvas.height = 540;
}else if(window.innerWidth <= 500){
    var h = window.innerWidth * 0.8;
    var w = window.innerWidth * 16 / 9 * 0.8;

    canvas.height = h;
    canvas.width = w;
    bg1.style.width = w + "px";
    bg1.style.height = h + "px";
    bg2.style.width = w + "px";
    bg2.style.height = h + "px";
    bg2.style.left = w + "px";

    gb.style.width = w + "px";
    gb.style.height = h + "px";

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
    gb.style.width = window.innerWidth + "px";
    gb.style.height = window.innerWidth * 9 / 16 + "px";

    defaultPos[0] = defaultPos[0] / 960 * window.innerWidth;
    defaultPos[1] = defaultPos[1] / 960 * window.innerWidth;
    unit = unit / 960 * window.innerWidth;
    jumpBtn.style.transform = 'scale(' + unit/100 + ')';
    slideBtn.style.transform = 'scale(' + unit/100 + ')';
}
var p = unit / 100;


var runnerImg = new Image();
runnerImg.src = "./idle.png";

var runnerJumpImg = new Image();
runnerJumpImg.src = "./jump.png";

var runnerDownImg = new Image();
runnerDownImg.src = "./down.png";

var baseballImg = new Image();
baseballImg.src = "./baseball.png";

var gorillaImg = new Image();
gorillaImg.src = "./gorilla.png";

var hankeyImg = new Image();
hankeyImg.src = "./hankey.png";

runnerImg.onload = ()=>{
    ctx.drawImage(runnerImg, defaultPos[0], defaultPos[1], unit, unit);
};


class Enemy {
    name; //baseball 1, hankey 2, gorilla 3
    id;
    posX;
    posY; // baseball일 때만 사용
    speed; // baseball일 때 다름
    size; //baseball 0.5unit hankey 1unit gorilla 1.5unit

    constructor(id){
        this.id = id
        if(id == 1){
            this.name = "baseball";
            this.speed = 15 * p;
            this.size = 0.5 * unit;
            this.posX = canvas.width;
        }
        if(id == 2){
            this.name = "hankey";
            this.speed = 8 *p;
            this.size = unit;
            this.posX = canvas.width;
        }
        if(id == 3){
            this.name = "gorilla";
            this.speed = 8 *p;
            this.size = 1.5 * unit;
            this.posX = canvas.width;
        }
        this.posY = defaultPos[1] - this.size + unit;
        if(id == 1){
            var y = Math.floor(Math.random() * 3); //0, 1, 2
            if(beforeEnemyId == 2){
                y = 2;
            }
            this.posY = defaultPos[1] - this.size + unit * y * 0.5;
            if(y == 0){
                this.posY += 0.3 * unit;
            }
        }

        this.posX = canvas.width - this.size; //임시
        beforeEnemyId = id;
    }

    draw(){
        if(this.id == 1){
            ctx.drawImage(baseballImg, this.posX, this.posY, this.size, this.size);
        }
        if(this.id == 2){
            ctx.drawImage(hankeyImg, this.posX, this.posY, this.size, this.size);
        }
        if(this.id == 3){
            ctx.drawImage(gorillaImg, this.posX, this.posY, this.size, this.size);
        }
    }

    move(){
        this.posX -= this.speed;
    }
}

class Player {
    posY;
    status; //1 idle - 2 jump - 3 down
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
        if(this.status == 1){ // idle
            this.sizeY = unit;
            this.posY = defaultPos[1];
        }
        if(this.status == 2){ //jump
            this.sizeY = unit;
            this.posY = defaultPos[1] - unit * 0.5;
        }
        if(this.status == 3){ //down
            this.sizeY = unit * 0.5;
            this.posY = defaultPos[1] + unit * 0.5;
        }
    }

    draw(){
        if(this.status == 1){ // idle
            ctx.drawImage(runnerImg, defaultPos[0], this.posY, unit, this.sizeY);
        }
        if(this.status == 2){ //jump
            ctx.drawImage(runnerJumpImg, defaultPos[0], this.posY, unit, this.sizeY + unit*0.5);
        }
        if(this.status == 3){ //down
            ctx.drawImage(runnerDownImg, defaultPos[0], this.posY, unit, this.sizeY);
        }

        for(var i = 0; i<this.enemies.length; i++){
            this.enemies[i].draw();
        }
    }

    isTouching(enemy){
        if(enemy.posX < defaultPos[0] + unit - (unit * 0.1) && 
            enemy.posX > defaultPos[0] - enemy.size + (unit * 0.1)){
            if(this.posY < enemy.posY + enemy.size - unit * 0.1 &&
                enemy.posY < this.posY + this.sizeY - unit * 0.1){
                    gameOver();
                }
        }
    }

    scoreUpdate(){
        this.score += 1;
        scoreText.innerHTML = this.score;
    }

    move(){
        if(this.isJumping){
            this.posY += this.speedY;
            this.speedY += 0.7 *p;
            if(this.posY > defaultPos[1]){
                console.log('check');
                this.speedY = 0;
                this.posY = defaultPos[1];
                this.status = 1;
                this.statusCheck();
                this.isJumping = false;
            }
        }

        for(var i = 0; i<this.enemies.length; i++){
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
    console.log('Game Over!');
}

var enemy1 = new Enemy(2);
var player = new Player();
player.enemies.push(enemy1);

var isGaming = false;

var requestId;
var latestSpawn = 0;
var scoreUpdate = 0;
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


window.addEventListener('keydown', (event) => {
    //jump = 32, 38, 87
    //down = 40, 83, 16
    var e = event.keyCode;
    if(!isGaming){
        if(e == 32 || e == 38 || e == 87 || e == 40 || e == 83 || e == 16){
            gameStart();
        }
    }

    if(e == 32 || e == 38 || e == 87){
        if(player.isJumping) return;
        player.status = 2;
        player.isJumping = true;
        player.speedY = -18 *p;
        player.statusCheck();
    }
    if(e == 40 || e == 83 || e == 16){
        player.status = 3;
        player.statusCheck();
    }
});

window.addEventListener('keyup', (event) => {
    var e = event.keyCode;
    if(e == 40 || e == 83 || e == 16){
        player.status = 1;
        player.statusCheck();
    }
});

jumpBtn.addEventListener('touchstart', ()=>{
    if(!isGaming){
        gameStart();
    }
    if(player.isJumping) return;
    player.status = 2;
    player.isJumping = true;
    player.speedY = -18 * p;
    player.statusCheck();
});

slideBtn.addEventListener('touchstart', () => {
    if(!isGaming){
        gameStart();
    }
    player.status = 3;
    player.statusCheck();
});

slideBtn.addEventListener('touchend', () => {
    player.status = 1;
    player.statusCheck();
});

jumpBtn.addEventListener('mousedown', ()=>{
    if(!isGaming){
        gameStart();
    }
    if(player.isJumping) return;
    player.status = 2;
    player.isJumping = true;
    player.speedY = -18 * p;
    player.statusCheck();
});

slideBtn.addEventListener('mousedown', () => {
    if(!isGaming){
        gameStart();
    }
    player.status = 3;
    player.statusCheck();
});

slideBtn.addEventListener('mouseup', () => {
    player.status = 1;
    player.statusCheck();
});