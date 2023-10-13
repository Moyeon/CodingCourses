var small = document.getElementById("small");
var big = document.getElementById("big");
var display = document.getElementById("display");
var err = document.getElementById("error");

function subtraction(){
    var smallval = small.value;
    var bigval = big.value;

    var result = subtractSB(smallval, bigval);
    
    if(result){
        errorDis();
        display.innerHTML = result;
    }else{
        errorAppear();
        display.innerHTML = "";
    }
}

function subtractSB(s, b){
    //return the value of b - s
    //return null when there is no input
    //return null when s > b


}

function errorAppear(){
    err.style.visibility = "visible";
}
function errorDis(){
    err.style.visibility = "hidden";
}

small.addEventListener("keyup", subtraction);
big.addEventListener("keyup", subtraction);