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
groundImg.onload = () => {
    ctx.drawImage(groundImg, -0.2 * unit, -0.2 * unit, unit * 16, 1.2 * unit);
    ctx.drawImage(groundImg, -0.2 * unit, canvas.height - unit, unit * 16, 1.2 * unit);
    console.log(ratio, unit);
}

spikeImg1.onload = () =>{
    ctx.drawImage(spikeImg1, unit * 3, unit, unit, unit);
}
spikeImg2.onload = () =>{
    ctx.drawImage(spikeImg2, unit * 5, unit, unit, unit * 2);
}
spikeImg3.onload = () =>{
    ctx.drawImage(spikeImg3, unit * 7, unit, unit, unit * 3);
}