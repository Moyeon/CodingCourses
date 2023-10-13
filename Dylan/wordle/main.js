console.log(words);

var tiles = document.getElementsByClassName("tile");
var rows = [];
var r = 0;
var c = 0;
var answer = ['W', 'I', 'N', 'G', 'S'];
var isGaming = false;
var resultScreen = document.getElementById("resultScreen");
var currStreak = document.getElementById("curr");
var streak = 0;
var statButton = document.getElementById("statistics");
var closeButton = document.getElementById("close");

for(var i=0; i<6; i++){
    var row = [];
    for(var j=0; j<5; j++){
        row.push(tiles[j + i*5]);
    }
    rows.push(row);
}

function restart(){
    for (var i=0; i<30; i++){
        tiles[i].className = "tile";
        tiles[i].innerHTML = "";
    }
    r = 0;
    c = 0;
    var newWord = words[Math.floor(Math.random() * 5757)].toUpperCase();
    console.log(newWord);
    answer = newWord.split('');
    isGaming = true;
    statDown();
}
restart();

function keyInput(key){
    if(isGaming == false) return;
    if(c==5){
        c-=1;
    }
    rows[r][c].innerHTML = key;
    rows[r][c].classList.add('tileFilled');
    c++;
}

function keyDelete(){
    if(isGaming == false) return;
    if(c!=0){
        c -= 1;
        rows[r][c].innerHTML = '';
        rows[r][c].classList.remove('tileFilled');
    }
}

function enter(){
    if(isGaming == false) return;
    if(c==5){
        var myans = '';
        for(var i=0; i<5; i++){
            myans += rows[r][i].innerHTML;
        }
        myans = myans.toLowerCase();
        if(words.indexOf(myans) == -1) return;

        checkBS();
        r++;
        c = 0;
    }
}

function eventKeyInput(event){
    if(event.keyCode >= 65 && event.keyCode <= 90){
        keyInput(String.fromCharCode(event.keyCode));
    }
    if(event.keyCode == 8){
        keyDelete();
    }
    if(event.keyCode == 13){
        enter();
    }
}

function checkBS(){
    var strikes = 0;
    var answerCopy = [...answer];
    //stike check
    for(var i=0; i<5; i++){
        var now = rows[r][i].innerHTML;
        var idx = answerCopy.findIndex( (a)=> a == now);
        if(idx == i){
            rows[r][i].classList.add('strike');
            answerCopy[i] = '';
            strikes++;
        }
    }
    if(strikes == 5) gameEnd();
    
    //ball check
    for(var i=0; i<5; i++){
        if(rows[r][i].classList.contains('strike')==false){
            var now = rows[r][i].innerHTML;
            var idx = answerCopy.findIndex( (a)=> a == now);
            if(idx > -1){
                rows[r][i].classList.add('ball');
                answerCopy[idx] = '';
            }
        }
    }
    console.log(answerCopy);

    
    //wrong check
    for(var i=0; i<5; i++){
        if(rows[r][i].classList.contains('ball') ||
                    rows[r][i].classList.contains('strike')){
            
        }else{
            rows[r][i].classList.add('wrong');
        }
    }

    if(r == 5){
        r = -1;
        gameEnd();
    }
}

function gameEnd(){
    isGaming = false;
    statUp();
    
    if(r == -1){
        streak = 0;
    }else{
        streak++;
    }
    currStreak.innerHTML = streak;

}

function statUp(){
    resultScreen.style.opacity = 1;
    resultScreen.style.transform = 'translateY(0)';
}

function statDown(){
    resultScreen.style.opacity = 0;
    resultScreen.style.transform = 'translateY(50px)';
}

window.addEventListener("keydown", eventKeyInput);
closeButton.addEventListener("click", statDown);
statButton.addEventListener("click", statUp);