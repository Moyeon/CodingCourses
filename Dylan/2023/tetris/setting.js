function localGetorSet(name, set){
    var get = localStorage.getItem(name);
    if(get == null || get == "undefined"){
        localStorage.setItem(name, set)
        get = set;
    }
    return get;
};

var SETTING = {
    keyDelay : localGetorSet("keyDelay", 33),
    keyHoldDelay : localGetorSet("keyHoldDelay", 167),
    softDrop : localGetorSet("softDrop", 17),
    ARR : localGetorSet("ARR", 2),
    DAS : localGetorSet("DAS", 10),
    SDF : localGetorSet("SDF", 1),
};

function loadDefaultHandlingSetting(){
    SETTING.keyDelay = 33;
    SETTING.keyHoldDelay = 167;
    SETTING.softDrop = 17;
    SETTING.ARR = 2;
    SETTING.DAS = 10;
    SETTING.SDF = 1;

    renderHandlingSetting();
    saveHandlingSetting();
}

function saveHandlingSetting(){
    localStorage.setItem("keyDelay", SETTING.keyDelay);
    localStorage.setItem("keyHoldDelay", SETTING.keyHoldDelay);
    localStorage.setItem("softDrop", SETTING.softDrop);
    localStorage.setItem("ARR", SETTING.ARR);
    localStorage.setItem("DAS", SETTING.DAS);
    localStorage.setItem("SDF", SETTING.SDF);
}

var KEYSETTING = localStorage.getItem("keySetting");
if (KEYSETTING == null){
    loadDefaultKeySetting();
}else{
    KEYSETTING = JSON.parse(KEYSETTING);
}

function loadDefaultKeySetting(){
    KEYSETTING = [
        {
            description: "Move Falling Piece Left",
            keyCode: 37,
            code: "ArrowLeft"
        },{
            description: "Move Falling Piece Right",
            keyCode: 39,
            code: "ArrowRight"
        },{
            description: "Soft Drop",
            keyCode: 40,
            code: "ArrowDown"
        },{
            description: "Hard Drop",
            keyCode: 32,
            code: "Space"
        },{
            description: "Rotate Counterclockwise",
            keyCode: 90,
            code: "KeyZ"
        },{
            description: "Rotate Clockwise",
            keyCode: 38,
            code: "ArrowUp"
        },{
            description: "Rotate 180",
            keyCode: 88,
            code: "KeyX"
        },{
            description: "Swap Hold Piece",
            keyCode: 67,
            code: "KeyC"
        },{
            description: "Restart Game",
            keyCode: 82,
            code: "KeyR"
        }
    ];
    localStorage.setItem("keySetting", JSON.stringify(KEYSETTING));
    renderKeySetting();
}