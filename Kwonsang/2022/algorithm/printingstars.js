var rangeInput = document.getElementById('rangeInput');
var rangeValue = document.getElementById('rangeValue');
var output = document.getElementById('output');

rangeInput.addEventListener('change', ()=>{
    rangeValue.innerHTML = rangeInput.value;
})

function printStars(){
    var num = rangeInput.value;
    var outputValue = "";

    /* if value == 3
        outputValue = "*<br>**<br>***<br>"
    */
    for(var i = 1; i <= num; i++){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }

    output.innerHTML = outputValue;
}

function printStars2(){
    var num = rangeInput.value;
    var outputValue = "";

    /* if value == 3
        outputValue = "*<br>**<br>***<br>"
    */
    for(var i = num; i >= 1; i--){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }

    output.innerHTML = outputValue;
}

function printStars3(){
    var num = rangeInput.value;
    var outputValue = "";

    /* if value == 3
        outputValue = "*<br>**<br>***<br>"
    */
    for(var i = num; i >= 1; i--){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }
    for(var i = 2; i <= num; i++){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }


    output.innerHTML = outputValue;
}


function printStars4(){
    var num = rangeInput.value;
    var outputValue = "";

    /* if value == 3
        outputValue = "*<br>**<br>***<br>"
    */
    
    for(var i = 1; i <= num; i++){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }
    for(var i = num-1; i >= 1; i--){
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }

    output.innerHTML = outputValue;
}


function printStars5(){
    var num = rangeInput.value;
    var outputValue = "";

    /* if value == 3
        outputValue = "*<br>**<br>***<br>"
    */
    for(var i = 1; i<= num; i++){
        // blank
        for(var j = 1; j <= num - i; j++){
            outputValue += "&nbsp";
        }
        // *1
        for(var j = 1; j <= i; j++){
            outputValue += "*";
        }
        // *2
        for(var j = 1; j <= i - 1; j++){
            outputValue += "*";
        }
        outputValue += "<br>";
    }


    output.innerHTML = outputValue;
}