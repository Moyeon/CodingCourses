var scoreDisplay = document.getElementById('score');
var avgDisplay = document.getElementById('avg');
var input = document.getElementById('input');
var scoreArr = [];

function addScore(){
    scoreArr.push(input.value);
    var toPrint = "Score : ";
    for(var i=0; i<scoreArr.length; i++){
        toPrint += scoreArr[i];
        if(i<scoreArr.length-1){
            toPrint += ", ";
        }
    }
    scoreDisplay.innerHTML = toPrint;
}