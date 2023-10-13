var quiz = [
    {
        question: "100 * 12 = ?",
        options: [
            "12",
            "100",
            "1200",
            "12000"
        ],
        answer: 2
    },
    {
        question: "132 / 11 = ?",
        options: [
            "12",
            "11",
            "13",
            "17"
        ],
        answer: 0
    },
    {
        question: "1433 + 8049",
        options: [
            "9342",
            "9422",
            "9482",
            "9472"
        ],
        answer: 2
    }
];


var question = document.getElementById("question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");
var resultPopup = document.getElementById("resultPopup");
var popup = document.getElementById("popup");
var quizIdx = -1;
var score = 0;

function nextQuiz(){
    quizIdx += 1;
    if(quizIdx >= quiz.length){
        printResult();
        return;

    }
    question.innerHTML = quiz[quizIdx].question;
    option1.innerHTML = quiz[quizIdx].options[0];
    option2.innerHTML = quiz[quizIdx].options[1];
    option3.innerHTML = quiz[quizIdx].options[2];
    option4.innerHTML = quiz[quizIdx].options[3];
}

function selectOption(optionNum){
    if(optionNum == quiz[quizIdx].answer){
        score += 1;
    }
    console.log(score);
    nextQuiz();
}

function printResult(){
    resultPopup.innerHTML = Math.floor(100 / quiz.length * score);
    popup.classList.add("visible");
}

function restartQuiz(){
    location.reload();
}

function mainMenu(){
    location.href = "./index.html";
}

nextQuiz();