const p1Screen = document.getElementById('player1');
const p2Screen = document.getElementById('player2');

const BOARDSIZE = 6000;
const PARTICLENUM = 400;

if(window.innerWidth < 900){
    p1Screen.width = window.innerWidth;
    p1Screen.height = window.innerHeight / 2;
    p2Screen.width = window.innerWidth;
    p2Screen.height = window.innerHeight / 2;
}else{
    p1Screen.width = window.innerWidth / 2;
    p1Screen.height = window.innerHeight;
    p2Screen.width = window.innerWidth / 2;
    p2Screen.height = window.innerHeight;
}

onresize = (event) => {
    if(window.innerWidth < 900){
        p1Screen.width = window.innerWidth;
        p1Screen.height = window.innerHeight / 2;
        p2Screen.width = window.innerWidth;
        p2Screen.height = window.innerHeight / 2;
    }else{
        p1Screen.width = window.innerWidth / 2;
        p1Screen.height = window.innerHeight;
        p2Screen.width = window.innerWidth / 2;
        p2Screen.height = window.innerHeight;
    }
};

const p1ctx = p1Screen.getContext('2d');
const p2ctx = p2Screen.getContext('2d');
const ctxArr = [0, p1ctx, p2ctx];

var colors = ["#8cbcff", "#bc91db", "#ffd817", "#ff9326", "#ffa6a6", "#bd5151", "#3dc2cc", "#75e699", "#268029", "#c973ba", "#cbc7ff"];

var particles = [];

class Particle {
    x;
    y;
    color;

    constructor(){
        this.x = Math.random() * BOARDSIZE;
        this.y = Math.random() * BOARDSIZE;
        var colorId = Math.floor(Math.random() * colors.length);
        this.color = colors[colorId];
    }
}

class Player {
    x;
    y;
    color;
    size;
    speed;
    id;
    xspeed;
    yspeed;

    constructor(id){
        var colorId = Math.floor(Math.random() * colors.length);
        this.color = colors[colorId];
        this.x = Math.random() * BOARDSIZE;
        this.y = Math.random() * BOARDSIZE;
        this.size = 50;
        this.speed = 10;
        this.id = id;
        this.xspeed = 0;
        this.yspeed = 0;
    }

    draw(){
        ctxArr[this.id].clearRect(0, 0, p1Screen.width, p1Screen.height);
        var width = p1Screen.width;
        var height = p1Screen.height;

        var widthpt = width * this.size / 50;
        var heightpt = height * this.size / 50;

        ctxArr[this.id].strokeStyle = 'black';
        ctxArr[this.id].lineWidth = 1;
        ctxArr[this.id].beginPath();
        for(var i = - (this.x - widthpt / 2) % 300; i < widthpt; i += 300){
            ctxArr[this.id].moveTo(i * 50 / this.size, 0);
            ctxArr[this.id].lineTo(i * 50 / this.size, height);
        }
        for(var i = - (this.y - heightpt / 2) % 300; i < heightpt; i += 300){
            ctxArr[this.id].moveTo(0, i * 50 / this.size);
            ctxArr[this.id].lineTo(width, i * 50 / this.size);
        }
        ctxArr[this.id].stroke();

        for(var i = 0; i < particles.length; i++){
            if(particles[i].x >= this.x - widthpt
                && particles[i].x <= this.x + widthpt
                && particles[i].y >= this.y - heightpt
                && particles[i].y <= this.y + heightpt){
                var px = (particles[i].x - (this.x - widthpt / 2)) * 50 / this.size;
                var py = (particles[i].y - (this.y - heightpt / 2)) * 50 / this.size;
                ctxArr[this.id].fillStyle = particles[i].color;
                ctxArr[this.id].beginPath();
                ctxArr[this.id].arc(px, py, 1000 / this.size, 0, 2 * Math.PI);
                ctxArr[this.id].fill();
            }
        }

        var otherplayer = players[2 - this.id];
        if(otherplayer.x >= this.x - widthpt
            && otherplayer.x <= this.x + widthpt
            && otherplayer.y >= this.y - heightpt
            && otherplayer.y <= this.y + heightpt){
            var px = (otherplayer.x - (this.x - widthpt / 2)) * 50 / this.size;
            var py = (otherplayer.y - (this.y - heightpt / 2)) * 50 / this.size;
            ctxArr[this.id].fillStyle = otherplayer.color;
            ctxArr[this.id].beginPath();
            ctxArr[this.id].arc(px, py, otherplayer.size * 50 / this.size, 0, 2 * Math.PI);
            ctxArr[this.id].fill();
        }

        ctxArr[this.id].fillStyle = this.color;
        ctxArr[this.id].beginPath();
        ctxArr[this.id].arc(width/2, height/2, 50, 0, 2 * Math.PI);
        ctxArr[this.id].fill();

        ctxArr[this.id].fillStyle = 'black';
        ctxArr[this.id].font = "24px arial";
        ctxArr[this.id].textAlign = "right";
        ctxArr[this.id].fillText("Eaten : " + eaten[this.id], p1Screen.width - 40, 50);
    }

    move(){
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x > BOARDSIZE) this.x = BOARDSIZE;
        if (this.y > BOARDSIZE) this.y = BOARDSIZE;

        for(var i = 0; i < particles.length; i++){
            var p = particles[i];
            var dx = this.x - p.x;
            var dy = this.y - p.y;
            if(dx * dx + dy * dy <= (this.size + 20) * (this.size + 20)){
                particles.splice(i, 1);
                i--;
                this.size += 0.4;
            }
        }

        var otherplayer = players[2 - this.id];
        var dx = this.x - otherplayer.x;
        var dy = this.y - otherplayer.y;
        if(dx * dx + dy * dy <= (this.size + otherplayer.size) * (this.size + otherplayer.size) / 3){
            if(this.size >= otherplayer.size * 1.2){
                this.size += otherplayer.size / 10;
                respawn(otherplayer.id);
            }
        }
        
        this.xspeed *= 0.96;
        this.yspeed *= 0.96;

        this.speed = 1500 / (this.size + 100);
    }
}

var p1 = new Player(1);
var p2 = new Player(2);
var players = [p1, p2];

function respawn(id){
    if(id == 1){
        p1 = new Player(1);
        console.log('p1 is respawned', p1.x);
        eaten[2]++;
    }else{
        p2 = new Player(2);
        console.log('p1 is respawned', p2.x);
        eaten[1]++;
    }
    players = [p1, p2];
}


var requestId;
function animate(now = 0){
    movement();
    p1.move();
    p1.draw();
    p2.move();
    p2.draw();
    if(particles.length < PARTICLENUM){
        for(var i = 0; i < PARTICLENUM - particles.length; i++){
            particles.push(new Particle());
        }
    }

    requestId = requestAnimationFrame(animate);
}

var keys = [];
for(var i = 0; i<200; i++){
    keys.push(false);
}

var eaten = [0, 0, 0];
function gameStart(){
    eaten = [0, 0, 0];
    animate();
}



window.addEventListener('keyup', () =>{
    keys[event.keyCode] = false;
});
window.addEventListener('keydown', () =>{
    keys[event.keyCode] = true;
});

function movement(){
    //w 87 a 65 s 83 d 68
    if(keys[87]){
        p1.yspeed -= p1.speed / 5;
        if(p1.yspeed < -p1.speed) p1.yspeed = -p1.speed;
    }else if(keys[83]){
        p1.yspeed += p1.speed / 5;
        if(p1.yspeed > p1.speed) p1.yspeed = p1.speed;
    }
    
    if(keys[65]){
        p1.xspeed -= p1.speed / 5;
        if(p1.xspeed < -p1.speed) p1.xspeed = -p1.speed;
    }else if(keys[68]){
        p1.xspeed += p1.speed / 5;
        if(p1.xspeed > p1.speed) p1.xspeed = p1.speed;
    }
    //up 38 left 37 down 40 right 39
    if(keys[38]){
        p2.yspeed -= p2.speed / 5;
        if(p2.yspeed < -p2.speed) p2.yspeed = -p2.speed;
    }else if(keys[40]){
        p2.yspeed += p2.speed / 5;
        if(p2.yspeed > p2.speed) p2.yspeed = p2.speed;
    }
    
    if(keys[37]){
        p2.xspeed -= p2.speed / 5;
        if(p2.xspeed < -p2.speed) p2.xspeed = -p2.speed;
    }else if(keys[39]){
        p2.xspeed += p2.speed / 5;
        if(p2.xspeed > p2.speed) p2.xspeed = p2.speed;
    }
}



gameStart();