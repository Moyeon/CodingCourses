var timer;
var cps;
var score = 0;
var timerDisplay = document.getElementById("timer");
var cpsDisplay = document.getElementById("cps");
var scoreDisplay = document.getElementById("score");
var display = document.getElementById("click");
var isTesting = false;

function start(){
    timer = 0;
    cps = 0;
    isTesting = true;
    test();
}

function test(){
    if(timeLimit != -1 && timer >= timeLimit){
        isTesting = false;
    }
    if(isTesting == false){
        testEnd();
        return;
    }
    timer += 1;
    cps = score / timer;
    timerDisplay.innerHTML = parseFloat(timer/100).toFixed(2);
    cpsDisplay.innerHTML = parseFloat(cps*100).toFixed(2);
    setTimeout(test, 10);
}

function scoreUp(event){
    if(event.keyCode == 32){
        if(score == 0){
            start();
        }
        score += 1;
        scoreDisplay.innerHTML = score;
    }
}

function testEnd(){
    alert("Your cps is " + parseFloat(cps*100).toFixed(2) );
    score = 0;
}

function stop(){
    isTesting = false;
}

function anotherTest(pagenum){
    if(pagenum == 1){
        location.href = "cpstest1s.html";
    }else if(pagenum == 2){
        location.href = "cpstest2s.html";
    }else if(pagenum == 3){
        location.href = "cpstest5s.html";
    }else if(pagenum == 4){
        location.href = "cpstestManual.html";
    }
}

window.addEventListener("keydown", scoreUp);