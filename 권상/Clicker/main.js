var display = document.getElementById('display');
var jellyArr = [];
var cpc = 1;
var myCoin = 0;
var coinUI = document.getElementById('coin');
var cps = 0;

function loadData(){
    if(localStorage.getItem("myCoin") != null){
        myCoin = localStorage.getItem("myCoin");
        myCoin = myCoin * 1;
        cpc = localStorage.getItem("cpc");
        cpc = cpc * 1;
        cps = localStorage.getItem("cps");
        cps = cps * 1;
        ja = JSON.parse(localStorage.getItem("jellyStorage"));
        console.log(ja);
        for(var i=0; i<ja.length; i++){
            createJelly(ja[i]);
        }
    }else{
        createJelly('squ');
    }
}
function saveData(){
    localStorage.setItem("myCoin", myCoin);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("cps", cps);
    localStorage.setItem("jellyStorage", JSON.stringify(jellyArr));
}

function createJelly(className){
    var newJelly = document.createElement('div');
    newJelly.classList.add('jelly');
    newJelly.classList.add(className);
    display.appendChild(newJelly);
    jellyArr.push(className);
    newJelly.addEventListener('click', earnCoin);
}

function earnCoin(){
    myCoin += cpc;
    coinUI.innerHTML = myCoin;
    this.animate(
        [
            {transform: 'scale(1.1)'},
            {transform: 'scale(1)'}
        ],{
            fill: 'forwards',
            easing: 'ease',
            duration: 500
        }
    );
}

function cpcItem(price, cpcNum){
    if(myCoin < price) return;
    myCoin -= price;
    cpc += cpcNum;
    coinUI.innerHTML = myCoin;
}

function cpsItem(price, cpsNum){
    if(myCoin < price) return;
    myCoin -= price;
    cps += cpsNum;
    coinUI.innerHTML = myCoin;
}

var coinPerSec = setInterval(() => {
    myCoin += cps;
    coinUI.innerHTML = myCoin;
}, 1000);

function square(){
    if(jellyArr.length >= 8) return;
    if(myCoin < 10000) return;
    myCoin -= 10000;
    cpc = cpc * 2;
    cps = cps * 2;
    coinUI.innerHTML = myCoin;
    createJelly('squ');
}

function circle(){
    if(jellyArr.length >= 8) return;
    if(myCoin < 30000) return;
    myCoin -= 30000;
    
    clearInterval(coinPerSec);
    coinPerSec = setInterval(() => {
        myCoin += cps;
        coinUI.innerHTML = myCoin;
    }, 500);

    coinUI.innerHTML = myCoin;
    createJelly('cir');
}

function triangle(){
    if(jellyArr.length >= 8) return;
    if(myCoin < 50000) return;
    myCoin -= 50000;
    
    myCoin = myCoin * 3;

    coinUI.innerHTML = myCoin;
    createJelly('tri');
}

loadData();
