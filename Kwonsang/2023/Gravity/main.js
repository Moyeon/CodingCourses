const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var gameBoard = document.getElementById('gameBoard');

var unit = 80;
var ratio = 1;

if(window.innerWidth <= 960){
    ratio = window.innerWidth / 960;
    unit = unit * ratio;
    canvas.width = 960 * ratio;
    canvas.height = 540 * ratio;
    gameBoard.style.width = 960 * ratio + "px";
    gameBoard.style.height = 540 * ratio + "px";

}else{
    canvas.width = 960;
    canvas.height = 540;
}

var playerImg = new Image();
playerImg.src = "./player.svg";

var groundImg = new Image();
groundImg.src = "./ground.svg";

var spikeImg1 = new Image();
spikeImg1.src = "./spike1.svg";

var spikeImg2 = new Image();
spikeImg2.src = "./spike2.svg";

var spikeImg3 = new Image();
spikeImg3.src = "./spike3.svg";

var spikeTopImg1 = new Image();
spikeTopImg1.src = "./spikeTop1.svg";

var spikeTopImg2 = new Image();
spikeTopImg2.src = "./spikeTop2.svg";

var spikeTopImg3 = new Image();
spikeTopImg3.src = "./spikeTop3.svg";

playerImg.onload = () => {
    ctx.drawImage(playerImg, unit, unit, unit, unit);
}
function drawGround(){
    ctx.drawImage(groundImg, -0.2 * unit, -0.2 * unit, unit * 16, 1.2 * unit);
    ctx.drawImage(groundImg, -0.2 * unit, canvas.height - unit, unit * 16, 1.2 * unit);
}

const FLOOR_Y = 5.75 * unit;
const CEIL_Y = unit;

const SPEED_X = -3;
const START_X = canvas.width;

class Obstacle { //combined spikes
    type;
    spikes;

    constructor(){
        this.type = Math.floor(Math.random() * 9) + 1;
        this.spikes = [];
        // 1 ~ 3
        if(this.type <= 3){
            this.spikes.push(new Spike(this.type, -1, START_X));
        }
        // 4 ~ 6
        else if (this.type <= 6){
            this.spikes.push(new Spike(this.type - 3, 1, START_X));
        }
        // 7 ~ 9
        else if (this.type == 7){
            this.spikes.push(new Spike(1, -1, START_X));
            this.spikes.push(new Spike(1, 1, START_X));
        }
        else if (this.type == 8){
            this.spikes.push(new Spike(2, -1, START_X));
            this.spikes.push(new Spike(1, 1, START_X));
        }
        else if (this.type == 9){
            this.spikes.push(new Spike(1, -1, START_X));
            this.spikes.push(new Spike(2, 1, START_X));
        }
    }

    move(){
        for(var i = 0; i < this.spikes.length; i++){
            this.spikes[i].move();
        }
    }
    draw(){
        for(var i = 0; i < this.spikes.length; i++){
            this.spikes[i].draw();
        }
    }
}

class Spike { //single spike
    height; // 1 2 3
    direction; // -1 -> ceiling, 1 -> floor
    xPos;

    constructor(height, direction, xPos){
        this.height = height;
        this.direction = direction;
        this.xPos = xPos;
    }

    move(){
        this.xPos += SPEED_X;
    }
    draw(){
        if(this.direction == 1){
            if(this.height == 1){
                ctx.drawImage(spikeImg1, this.xPos, FLOOR_Y - unit, unit, unit);
            }else if(this.height == 2){
                ctx.drawImage(spikeImg2, this.xPos, FLOOR_Y - 2 * unit, unit, unit * 2);
            }else{
                ctx.drawImage(spikeImg3, this.xPos, FLOOR_Y - 3 * unit, unit, unit * 3);
            }
        }
        else{
            if(this.height == 1){
                ctx.drawImage(spikeTopImg1, this.xPos, CEIL_Y, unit, unit);
            }else if(this.height == 2){
                ctx.drawImage(spikeTopImg2, this.xPos, CEIL_Y, unit, unit * 2);
            }else{
                ctx.drawImage(spikeTopImg3, this.xPos, CEIL_Y, unit, unit * 3);
            }
        }
    }


}



//player movement
class Player {
    yPos;
    xPos;
    ySpeed;
    direction; // -1 -> going up, 1 -> going down

    constructor(){
        this.yPos = FLOOR_Y - unit;
        this.xPos = unit;
        this.ySpeed = 0;
        this.direction = 1;
    }

    draw(){
        ctx.drawImage(playerImg, this.xPos, this.yPos, unit, unit);
    }
    move(){
        if(this.yPos == FLOOR_Y - unit && this.direction == 1){
            //dont move
        }else if(this.yPos == CEIL_Y && this.direction == -1){
            //don't move
        }else{
            this.yPos += this.ySpeed;
            this.ySpeed += this.direction;
            if(this.yPos > FLOOR_Y - unit){
                this.yPos = FLOOR_Y - unit;
                this.ySpeed = 0;
            }else if(this.yPos < CEIL_Y){
                this.yPos = CEIL_Y;
                this.ySpeed = 0;
            }
        }
    }
    reverse(){
        this.direction = - this.direction;
        this.ySpeed = this.direction * 1;
    }
}

var player = new Player();
function gameStart(){
    player = new Player();
    player.direction = -1;
    animate();
}

var animateTime = 0;
var respawnTime = 0;
var requestId = 0;

var obstacles = [];
function respawnObstacle(){
    obstacles.push(new Obstacle());
}
function deletePassedObstacle(){
    for(var i = 0; i < obstacles.length; i++){
        if(obstacles[i].spikes[0].xPos < - unit){
            obstacles.shift();
        }
    }
}

function animate(now = 0){
    if(now - respawnTime > 1000){
        respawnObstacle();
        deletePassedObstacle();
        respawnTime = now;
    }
    if(now - animateTime > 30){
        ctx.clearRect(0, 0, 960, 540);
        drawGround();

        player.move();
        player.draw();

        for(var o = 0; o < obstacles.length; o++){
            obstacles[o].move();
            obstacles[o].draw();
        }

        animateTime = now;
    }
    requestId = requestAnimationFrame(animate);
}

gameStart();



//event
window.addEventListener("keydown", (event)=>{
    console.log(event.keyCode);
    if(event.keyCode == 32){
        player.reverse();
    }
});