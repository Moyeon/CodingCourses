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
var currentItem = 0;


var ibBtn = document.getElementById('ibBtn');
var bcBtn = document.getElementById('bcBtn');
var incomeBoost = 1;
var bonusClick = 0;
var currentIB = 0;
var currentBC = 0;

var bcAmountTxt = document.getElementById('bcAmount');
var bcRateTxt = document.getElementById('bcRate');
var bcAmount = 0;

var moneyWrap = document.getElementById("moneyWrap");
var moneyVal = document.getElementById("moneyVal");

var UI = document.getElementById("UI");

function moneyEffect(text){
    //text = 320 -> +$320
    //text = -120 -> -$120
    text = Math.round(text * 10) / 10
    if(text > 0){
        text = "+$" + text;
    }else{
        text = "-$" + text;
    }

    const effectDiv = document.createElement('div');
    effectDiv.innerHTML = text;
    effectDiv.classList.add("moneyEffect");
    moneyWrap.appendChild(effectDiv);

    effectDiv.addEventListener('animationend',()=>{
        moneyWrap.removeChild(effectDiv);
    });
}

var activeTab = 'M';

function changeActiveTab(){
    UI.classList = "UI";
    if(activeTab == 'M'){
        UI.classList.add("UIM");
        mainTab.style.visibility = 'visible';
        upgradeTab.style.visibility = 'hidden';
        casinoTab.style.visibility = 'hidden';
    }else if(activeTab == 'U'){
        UI.classList.add("UIU");
        mainTab.style.visibility = 'hidden';
        upgradeTab.style.visibility = 'visible';
        casinoTab.style.visibility = 'hidden';
    }else if(activeTab == 'C'){
        UI.classList.add("UIC");
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
    money = Math.round(money * 10) / 10;
    moneyAmount.innerHTML = "$" + money;
    moneyVal.innerHTML = "$" + money;
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
            currentItem = i;
            messageBox.style.visibility = 'inherit';
            messageBox.style.height = 'fit-content';
            return;
        }
    }
}

function buyCurrentItem(){
    money = money - ITEMS[currentItem].cost;
    moneyEffect(- ITEMS[currentItem].cost);

    messageBox.style.visibility = 'hidden';
    messageBox.style.height = '0';
    itemIsSold[currentItem] = true;
    moneyBoost = moneyBoost + ITEMS[currentItem].boost;
    updateMoney();
}

function updateUpgrade(){
    if(money >= IB[currentIB]){
        ibBtn.innerHTML = IB[currentIB];
    }else{
        ibBtn.innerHTML = "Cannot Afford";
    }

    if(money >= BC[currentBC]){
        bcBtn.innerHTML = BC[currentBC];
    }else{
        bcBtn.innerHTML = "Cannot Afford";
    }
}

function updateBonusClick(){
    bcAmountTxt.innerHTML = Math.round(bcAmount * 10) / 10 + " bonus clicks";
    bcRateTxt.innerHTML = "+" + bonusClick + " bc/click";
}

function incomeBoostBuy(){
    if(money >= IB[currentIB]){
        money -= IB[currentIB];
        incomeBoost = incomeBoost * 1.1;
        currentIB ++;
        updateMoney();
        updateUpgrade();
    }
}

//bcbuy() 해야함
function bonusClickBuy(){
    if(money >= BC[currentBC]){
        money -= BC[currentBC];
        bonusClick = bonusClick + 0.1;
        currentBC ++;
        updateMoney();
        updateBonusClick();
        updateUpgrade();
    }
}

function bonusClickEarn(){
    money += moneyBoost * incomeBoost * bcAmount;
    moneyEffect(moneyBoost * incomeBoost * bcAmount);

    bcAmount = 0;
    updateMoney();
    updateStatus()
    updateItemMsg();
    updateUpgrade();
    updateBonusClick();
}


function earnMoney(){
    money = money + 100 * moneyBoost * incomeBoost;
    bcAmount += bonusClick;
    updateMoney();
    updateStatus()
    updateItemMsg();
    updateUpgrade();
    updateBonusClick();
    moneyEffect(100 * moneyBoost * incomeBoost);
}

