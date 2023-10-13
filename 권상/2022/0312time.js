var start = document.getElementById("start");
var end = document.getElementById("end");
var display = document.getElementById("display");
var err = document.getElementById("error");

function subtraction(){
    var startval = start.value;
    var endval = end.value;

    var result = subtractTime(startval, endval);
    
    if(result){
        errorDis();
        display.innerHTML = result;
    }else{
        errorAppear();
        display.innerHTML = "";
    }
}

function subtractTime(startTime, endTime){
    //1. check the input, and if it does not match HH:MM:SS, return null
    var startArr = startTime.split(":");
    var endArr = endTime.split(":");
    if(startArr.length != 3 || endArr.length != 3){
        return null;
    }
    for(var i=0; i<3; i++){
        if(isNaN(startArr[i]) || isNaN(endArr[i])){
            return null;
        }
        if(startArr[i]=="" || endArr[i]==""){
            return null;
        }
    }
    if(startArr[0] < 0 || startArr[0] > 23 || endArr[0] < 0 || endArr[0] > 23){
        return null;
    }
    if(startArr[1] < 0 || startArr[1] > 59 || endArr[1] < 0 || endArr[1] > 59){
        return null;
    }
    if(startArr[2] < 0 || startArr[2] > 59 || endArr[2] < 0 || endArr[2] > 59){
        return null;
    }

    //2. calculate the diff between start-end
    var resultArr = [0,0,0];
    resultArr[0] = endArr[0] - startArr[0];
    resultArr[1] = endArr[1] - startArr[1];
    resultArr[2] = endArr[2] - startArr[2];

    if(resultArr[2] < 0){
        resultArr[2] += 60;
        resultArr[1] += -1;
    }
    if(resultArr[1] < 0){
        resultArr[1] += 60;
        resultArr[0] += -1;
    }
    if(resultArr[0] < 0){
        resultArr[0] += 24;
    }

    //3. return the result as the shape HH:MM:SS
    for(var j=0; j<3; j++){
        if(resultArr[j] < 10){
            resultArr[j] = "0" + resultArr[j];
        }
    }

    //check
    return resultArr[0]+":"+resultArr[1]+":"+resultArr[2];
}

function errorAppear(){
    err.style.visibility = "visible";
}
function errorDis(){
    err.style.visibility = "hidden";
}

start.addEventListener("keyup", subtraction);
end.addEventListener("keyup", subtraction);