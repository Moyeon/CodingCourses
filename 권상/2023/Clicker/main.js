var mainTab = document.getElementById('mainTab');
var upgradeTab = document.getElementById('upgradeTab');
var casinoTab = document.getElementById('casinoTab');

var mainBtn = document.getElementById('mainBtn');
var upgradeBtn = document.getElementById('upgradeBtn');
var casinoBtn = document.getElementById('casinoBtn');
var money = 0;
var moneyBoost = 1;

var moneyAmount = document.getElementById('moneyAmount');
var statusMsg = document.getElementById('statusMsg');

var messageBox = document.getElementById('messageBox');
var itemMsg = document.getElementById('itemMsg');
var itemIsSold = [];
for(var i = 0; i < ITEMS.length; i++) itemIsSold.push(false);


var activeTab = 'M';

function changeActiveTab(){
    if(activeTab == 'M'){
        mainTab.style.visibility = 'visible';
        upgradeTab.style.visibility = 'hidden';
        casinoTab.style.visibility = 'hidden';
    }else if(activeTab == 'U'){
        mainTab.style.visibility = 'hidden';
        upgradeTab.style.visibility = 'visible';
        casinoTab.style.visibility = 'hidden';
    }else if(activeTab == 'C'){
        mainTab.style.visibility = 'hidden';
        upgradeTab.style.visibility = 'hidden';
        casinoTab.style.visibility = 'visible';
    }
}

mainBtn.addEventListener('click', ()=>{
    activeTab = 'M';
    changeActiveTab();
});
upgradeBtn.addEventListener('click', ()=>{
    activeTab = 'U';
    changeActiveTab();
});
casinoBtn.addEventListener('click', ()=>{
    activeTab = 'C';
    changeActiveTab();
});

changeActiveTab();

function updateMoney(){
    moneyAmount.innerHTML = "$" + money;
}

function updateStatus(){
    for(var i = 1; i < MESSAGE.length; i++){
        if(money < MESSAGE[i].money){
            statusMsg.innerHTML = MESSAGE[i-1].text;
            return;
        }
    }
    statusMsg.innerHTML = MESSAGE[MESSAGE.length-1].text;
}

function updateItemMsg(){
    for(var i = 0; i < ITEMS.length; i++){
        if(itemIsSold[i] == false && money >= ITEMS[i].money){
            itemMsg.innerHTML = ITEMS[i].msg;
            messageBox.style.visibility = 'visible';
            messageBox.style.height = 'fit-content';
            return;
        }
    }
}

function earnMoney(){
    money = money + 5;
    updateMoney();
    updateStatus()
    updateItemMsg();
}

