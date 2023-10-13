var input = document.getElementById("input");
var display = document.getElementById("display");
var err = document.getElementById("error");

function checkMost(){
    var inpval = input.value;
    var inparr = inpval.split("");

    var result = mainCheck(inparr);
    
    if(result){
        errorDis();
        display.innerHTML = result;
    }else{
        errorAppear();
        display.innerHTML = "";
    }
}

function mainCheck(arr){
    var alpha = Array(26);

    for(var i=0; i<26; i++){
        alpha[i] = 0;
    }

    for(var j=0; j<arr.length; j++){
        var place = arr[j].charCodeAt(0) - 97;
        if(place < 0 || place > 25){
            return null;
        }
        alpha[place]++;
    }

    var maxNum = 0;
    var maxIdx;
    for(var k=0; k<26; k++){
        if(maxNum < alpha[k]){
            maxNum = alpha[k];
            maxIdx = k;
        }
    }

    var answer = String.fromCharCode(maxIdx + 97);


    //97 a 122 z
    return answer;


    


    return arr;
}

function errorAppear(){
    err.style.visibility = "visible";
}
function errorDis(){
    err.style.visibility = "hidden";
}

input.addEventListener("keyup", checkMost);