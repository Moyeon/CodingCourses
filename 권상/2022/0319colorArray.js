var redInput = document.getElementById("red");
var greenInput = document.getElementById("green");
var blueInput = document.getElementById("blue");
var display = document.getElementById("display");
var error = document.getElementById("error");
var colors = document.getElementById("colors");
var sortBtn = document.getElementById("sort");
var colList = [];


function setColor(){
    var r = redInput.value * 1;
    var g = greenInput.value * 1;
    var b = blueInput.value * 1;

    if(0 > r || 255 < r || 0 > g || 255 < g || 0 > b || 255 < b){
        errorAppear();
        return;
    }else{
        errorDis();
    }

    display.style.backgroundColor = `rgb( ${r}, ${g}, ${b} )`;

    return {red : r, green : g, blue : b};
}

function errorAppear(){

}

function errorDis(){

}

function addColor(){
    var rgb = setColor();

    var newDiv = document.createElement("div");
    newDiv.classList.add("color");
    newDiv.style.backgroundColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    colors.appendChild(newDiv);

    colList.push(rgb);
    console.log(colList);

    redInput.value = randNear(redInput.value * 1);
    greenInput.value = randNear(greenInput.value * 1);
    blueInput.value = randNear(blueInput.value * 1);

    colors.scrollTop = colors.scrollHeight;
}

function randNear(a){
    var rand = a + Math.floor(Math.random() * 60) - 30;

    if(rand < 0){
        rand = 0 - rand;
    }
    if(rand > 255){
        var diff = rand - 255;
        rand = 255 - diff;
    }
    return rand;
}

function sortColors(){
    colList.sort((a, b) => getLuminance(a) - getLuminance(b));
    colList.sort((a, b) => 
        (0.3 * a.red + 0.59 * a.green + 0.11 * a.blue)
            - (0.3 * b.red + 0.59 * b.green + 0.11 * b.blue)
    )
    console.log(colList);

    colors.innerHTML = "";
    for(var i=0; i<colList.length ; i++){
        var newDiv = document.createElement("div");
        newDiv.classList.add("color");
        newDiv.style.backgroundColor = `rgb(${colList[i].red}, ${colList[i].green}, ${colList[i].blue})`;
        colors.appendChild(newDiv);
    }
}

function getLuminance(col){
    return 0.3 * col.red + 0.59 * col.green + 0.11 * col.blue;
}

redInput.addEventListener("change", setColor);
greenInput.addEventListener("change", setColor);
blueInput.addEventListener("change", setColor);

display.addEventListener("click", addColor);
sortBtn.addEventListener("click", sortColors);