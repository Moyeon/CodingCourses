var quiz = [
    {
        question: "Heat flows frome where to where?",
        options: [
            "low temp -> high temp",
            "high temp -> high temp",
            "low temp -> low temp",
            "high temp -> low temp"
        ],
        answer: 3
    },
    {
        question: "What is a right information about the moon?",
        options: [
            "The size is half of the earth",
            "It rotate by a frequency of 24 hours",
            "It orbits the earth in one day",
            "The gravity is heavier than the earth"
        ],
        answer: 1
    },
    {
        question: "Dry ice is made of..",
        options: [
            "Oxygen",
            "Carbon dioxide",
            "Nitrogen",
            "Carbon monoxide"
        ],
        answer: 1
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