const KEYNAMES = {
    37: "Left Arrow",
    38: "Up Arrow",
    39: "Right Arrow",
    40: "Down Arrow"
};

var tabInner = document.getElementById("tabInner");

function renderKeySetting(){
    tabInner.innerHTML = "";
    for(var i = 0; i < KEYSETTING.length; i++){
        const keySettingDiv = document.createElement("div");
        keySettingDiv.className = "keySetting";
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        //KEYSETTING[i].des / keyCode / code
        h3.innerHTML = KEYSETTING[i].description;
        h4.innerHTML = "[" + KEYSETTING[i].code + "]";

        tabInner.appendChild(keySettingDiv);
        keySettingDiv.appendChild(h3);
        keySettingDiv.appendChild(h4);
        const I = i;

        h4.addEventListener("click", () => {
            window.addEventListener("keydown", (event)=>{
                KEYSETTING[I].code = event.code;
                KEYSETTING[I].keyCode = event.keyCode;
                h4.innerHTML = "[" + KEYSETTING[I].code + "]";
                event.preventDefault();

                localStorage.setItem("keySetting", JSON.stringify(KEYSETTING));
            }, {once: true});
        });
    }
}
renderKeySetting();


var arrInput = document.getElementById("arrInput");
var arrH4 = document.getElementById("arrH4");
var arrResult = document.getElementById("arrResult");

var dasInput = document.getElementById("dasInput");
var dasH4 = document.getElementById("dasH4");
var dasResult = document.getElementById("dasResult");

var sdfInput = document.getElementById("sdfInput");
var sdfH4 = document.getElementById("sdfH4");
var sdfResult = document.getElementById("sdfResult");

function renderHandlingSetting(){
    calculateHandlingSetting();

    arrInput.value = SETTING.ARR;
    arrResult.innerHTML = SETTING.ARR;
    arrH4.innerHTML = SETTING.keyDelay + "MS";

    dasInput.value = SETTING.DAS;
    dasResult.innerHTML = SETTING.DAS;
    dasH4.innerHTML = SETTING.keyHoldDelay + "MS";

    sdfInput.value = SETTING.SDF;
    sdfResult.innerHTML = SETTING.SDF;
    sdfH4.innerHTML = SETTING.softDrop + "MS";
}

function changeHandlingSetting(){
    SETTING.ARR = arrInput.value;
    SETTING.DAS = dasInput.value;
    SETTING.SDF = sdfInput.value;
    
    renderHandlingSetting();
    saveHandlingSetting();
}
arrInput.addEventListener("input", changeHandlingSetting);
dasInput.addEventListener("input", changeHandlingSetting);
sdfInput.addEventListener("input", changeHandlingSetting);

function calculateHandlingSetting(){
    SETTING.keyDelay = Math.round(SETTING.ARR * 100 / 6);
    SETTING.keyHoldDelay = Math.round(SETTING.DAS * 100 / 6);
    
    if(SETTING.SDF <= 40){
        SETTING.softDrop = Math.round(4000 / 6 / SETTING.SDF); //todo!
    }else{
        SETTING.softDrop = 0;
    }
    
}

renderHandlingSetting();