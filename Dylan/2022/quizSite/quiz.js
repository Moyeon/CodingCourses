console.log(quizArray);

var questionDiv = document.getElementById("question");
var optionDiv0 = document.getElementById("option0");
var optionDiv1 = document.getElementById("option1");
var optionDiv2 = document.getElementById("option2");
var optionDiv3 = document.getElementById("option3");
var quizIdx = 0;
var score = 0;
var answerNum;
var popup = document.getElementById('popup');
var scorePopup = document.getElementById('score');

function loadQuiz(quiznum){
    if(quiznum >= quizArray.length){
        resultPopup();
        return;
    }
    questionDiv.innerHTML = (quiznum + 1) + '. ' + quizArray[quiznum].question;
    optionDiv0.innerHTML = quizArray[quiznum].options[0];
    optionDiv1.innerHTML = quizArray[quiznum].options[1];
    optionDiv2.innerHTML = quizArray[quiznum].options[2];
    optionDiv3.innerHTML = quizArray[quiznum].options[3];
    answerNum = quizArray[quiznum].answer;
}

function selectOption(optionNum){
    if(quizIdx < quizArray.length && optionNum == answerNum){
        score++;
    }
    quizIdx++;
    loadQuiz(quizIdx);
}

function retry(){
    location.reload();
}

function backtomain(){
    location.href = '../index.html';
}

function resultPopup(){
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    scorePopup.innerHTML = Math.round(score / quizArray.length * 100) + '%';
}

function musicPlay(){
    var audio = document.getElementById('audio');
    audio.volume = 0.3;
    audio.play();
}






loadQuiz(quizIdx);