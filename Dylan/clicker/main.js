var coinText = document.getElementById("coinText");
var character = document.getElementById("character");
var coin = 10000000;
var coinPerClick = 1;
var audioList = ["Bright Skies - Audio Hertz.mp3", "Luck Witch - Audio Hertz.mp3", "Late Truth - Audio Hertz.mp3", "Where The Trap Is - Audio Hertz.mp3", "Yellow Jello - Audio Hertz.mp3"];
var audio = new Audio("Late Truth - Audio Hertz.mp3");
var isStarted = false;
var volumeInput = document.getElementById("volumeInput");
var nowPlaying = 0;

function coinEarn(){
    if(isStarted == false){
        audio.volume = 0.1;
        audioPlay();
        isStarted = true;
    }
    coin = coin + coinPerClick;

    coinText.innerHTML = coin.toLocaleString();
}

function volumeControl(){
    audio.volume = volumeInput.value / 100;
}

function audioPlay(){
    audio.pause();
    audio = new Audio(audioList[nowPlaying]);
    nowPlaying = nowPlaying + 1;
    nowPlaying = nowPlaying % audioList.length;
    audio.play();
    volumeControl();
}

function audioShuffle(){
    audioList = audioList.sort(() => Math.random() - 0.5);
}

function buyItem1(){
    if(coin < 1000) return;
    if(coinPerClick >= 5) return;
    coin = coin - 1000;
    coinPerClick = 5;
    character.className = "level1";
    coinText.innerHTML = coin;
}
function buyItem2(){
    buyItem1();
    if(coin < 5000) return;
    if(coinPerClick >= 10) return;
    coin = coin - 5000;
    coinPerClick = 10;
    character.className = "level2";
    coinText.innerHTML = coin;
}
function buyItem3(){
    buyItem2();
    if(coin < 10000) return;
    if(coinPerClick >= 50) return;
    coin = coin - 10000;
    coinPerClick = 50;
    character.className = "level3";
    coinText.innerHTML = coin;
}
function buyItem4(){
    buyItem3();
    if(coin < 50000) return;
    if(coinPerClick >= 100) return;
    coin = coin - 50000;
    coinPerClick = 100;
    character.className = "level4";
    coinText.innerHTML = coin;
}
function buyItem5(){
    buyItem4();
    if(coin < 100000) return;
    if(coinPerClick >= 500) return;
    coin = coin - 100000;
    coinPerClick = 500;
    character.className = "level5";
    coinText.innerHTML = coin;
}
function buyItem6(){
    buyItem5();
    if(coin < 500000) return;
    if(coinPerClick >= 1000) return;
    coin = coin - 500000;
    coinPerClick = 1000;
    character.className = "level6";
    coinText.innerHTML = coin;
}
function winEvent(){
    buyItem6();
    if(coin < 1000000) return;
    if(coinPerClick >= 10000) return;
    coin = coin - 1000000;
    character.className = "level7";
    coinText.innerHTML = coin;
    document.getElementById("winPopup").classList.add("visible");
}
function closeWinPopUp(){
    document.getElementById("winPopup").classList.remove("visible");
}

character.addEventListener("click", coinEarn);
volumeInput.addEventListener("change", volumeControl);