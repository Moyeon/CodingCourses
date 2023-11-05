var gameGridCanvas = document.getElementById('gameGridCanvas');
var ctx = gameGridCanvas.getContext('2d');

var dpr = window.devicePixelRatio;

gameGridCanvas.width = 300 * dpr;
gameGridCanvas.height = 600 * dpr;

ctx.strokeStyle = 'rgb(60,60,60)';

for(var i = 1; i <= 9; i++){
    ctx.beginPath();
    ctx.moveTo(Math.floor(30 * i * dpr)+0.5, 0);
    ctx.lineTo(Math.floor(30 * i * dpr)+0.5, Math.floor(600 * dpr)-2);
    ctx.stroke();
}

for(var i = 1; i <= 19; i++){
    ctx.beginPath();
    ctx.moveTo(0, Math.floor(30 * i * dpr)+0.5);
    ctx.lineTo(Math.floor(300 * dpr)-2, Math.floor(30 * i * dpr));
    ctx.stroke();
}




const SONGS = [
    "Island_Dream_-_Chris_Haugen.mp3",
    "On_the_Delta_-_John_Patitucci.mp3",
    "Poolside_Radio_-_Dyalla.mp3"
];

var bgmBtnPlay = document.getElementById('bgmPlay');
var bgmBtnLoop = document.getElementById('bgmLoop');
var bgmTitle = document.getElementById('bgmTitle');

var prefix = "./audio/";
var bgm = new Audio();
bgm.volume = 0.1;
bgm.currentTime = 0;
bgm.src = prefix + SONGS[0];

var nowPlaying = 0;
var isPlaying = false;
var isLoop = false;

function bgmTitleSet(){
    bgmTitle.innerHTML = SONGS[nowPlaying].split('_').join(' ');
}
bgmTitleSet();


// back, play/pause, next, loop
function bgmBack(){
    nowPlaying = (nowPlaying - 1 + SONGS.length) % SONGS.length;
    bgm.src = prefix + SONGS[nowPlaying];
    bgm.currentTime = 0;
    if(isPlaying){
        bgm.play();
    }
    bgmTitleSet();
}

function bgmPlayPause(){
    if(isPlaying == true){
        //pause
        bgm.pause();
        isPlaying = false;
        bgmBtnPlay.id = "bgmPlay";
    }else{
        //play
        bgm.play();
        isPlaying = true;
        bgmBtnPlay.id = "bgmPause";
    }
    
}

function bgmNext(){
    nowPlaying = (nowPlaying + 1) % SONGS.length;
    bgm.src = prefix + SONGS[nowPlaying];
    bgm.currentTime = 0;
    if(isPlaying){
        bgm.play();
    }
    bgmTitleSet();
}

function bgmLoop(){
    if(isLoop == true){
        isLoop = false;
        bgmBtnLoop.id = "bgmLoop";
        bgm.loop = false;
    }else{
        isLoop = true;
        bgmBtnLoop.id = "bgmLoopOn";
        bgm.loop = true;
    }
}

bgm.addEventListener("ended", () => {
    bgmNext();
});