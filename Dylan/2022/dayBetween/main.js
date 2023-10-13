var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var resultDisplay = document.getElementById('result');

function calculate(){
    var date1 = new Date(input1.value);
    var date2 = new Date(input2.value);

    console.log(date2 - date1);

    var millisec = date2 - date1;
    var sec = millisec / 1000;
    var min = sec / 60;
    var hour = min / 60;
    var day = hour / 24;
    console.log(day);

    if(day){
        resultDisplay.innerHTML = day + " Days";
    }else{
        resultDisplay.innerHTML = "Fill in the blanks";
    }

    
}