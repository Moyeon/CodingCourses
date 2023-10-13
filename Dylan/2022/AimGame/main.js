var screen = document.getElementById('screen');
var beats = [];
var beatInfoArr = [];
var screenCover = document.getElementById('screenCover');
var score = 0;
var scoreDisplay = document.getElementById('score');
var combo = 0;
var comboDisplay = document.getElementById('combo');
var totalBeat = 0;
var totalAcc = 0;
var acc = 0;
var accDisplay = document.getElementById('acc');
var blackscreen = document.getElementById('blackscreen');
var audio = document.getElementById('audio');
var ending = {
    screen : document.getElementById('endingScreen'),
    score : document.getElementById('endingScore'),
    acc : document.getElementById('endingAcc'),
    combo : document.getElementById('endingCombo'),
    miss : document.getElementById('endingMiss'),
    grade : document.getElementById('endingGrade')
};
var maxCombo = 0;
var missCount = 0;

var lifeDisplay = document.getElementById('life');
var life = 100;
var lifetime = 0;

scoreDisplay.innerHTML = '';
comboDisplay.innerHTML = '';
accDisplay.innerHTML = '';
lifeDisplay.innerHTML = '';

function createBeat(x, y, num){
    const beat = document.createElement('div');
    beat.classList = 'beat';
    beat.style.top = y + '%';
    beat.style.left = x + '%';
    beat.innerHTML = num;

    screen.appendChild(beat);
    beats.push(beat);
}

function updateDisplay(){
    scoreDisplay.innerHTML = score;
    comboDisplay.innerHTML = combo + "x";
    accDisplay.innerHTML = acc + "%";
    lifeDisplay.innerHTML = '';

    if(maxCombo < combo){
        maxCombo = combo;
    }
}

function gameResult(){
    ending.screen.style.visibility = 'visible';
    ending.screen.style.opacity = 1;
    ending.score.innerHTML = score;
    ending.acc.innerHTML = acc + "%";
    ending.combo.innerHTML = maxCombo + " / " + totalBeat;
    ending.miss.innerHTML = missCount;
    //grade
    if(acc >= 95){
        ending.grade.innerHTML = "S";
    }else if(acc >= 90){
        ending.grade.innerHTML = "A";
    }else if(acc >= 80){
        ending.grade.innerHTML = "B";
    }else if(acc >= 70){
        ending.grade.innerHTML = "C";
    }else if(acc >= 60){
        ending.grade.innerHTML = "D";
    }else{
        ending.grade.innerHTML = "F";
    }
}



var requestId;
var timeStart;
var timediff;

function animate(now = 0){
    if(lifetime <= 0){
        lifetime = now;
    }
    //life bar setting
    if(now - lifetime >= 100){
        life -= 1;
        lifetime = now;
    }
    if(beatInfoArr.length > 0){
        timediff = beatInfoArr[0].time - (now - timeStart);
        if(timediff < -800){
            beats[0].remove();
            beats.shift(0);
            beatInfoArr.shift(0);
            combo = 0;
            totalBeat += 1;
            life -= 5;
            acc = totalAcc / totalBeat;
            acc = acc.toFixed(2);
            missCount++;
        }
    }
    if(!timeStart){
        timeStart = now;
    }
    if(beatmap.length > 0 && now - timeStart > beatmap[0].time - 1000){
        createBeat(beatmap[0].x, beatmap[0].y, beatmap[0].num);
        beatInfoArr.push({x: beatmap[0].x, y: beatmap[0].y, time: beatmap[0].time});
        beatmap.shift(0);
    }else if(beatmap.length == 0){
        setTimeout(gameResult, 2000);
    }

    updateDisplay();
    requestId = requestAnimationFrame(animate);
}

function gameStart(){
    animate();
    blackscreen.style.visibility = 'hidden';
    audio.currentTime = 0;
    audio.volume = 0.03;
    audio.play();
}

var mousePosX;
var mousePosY;

window.addEventListener("keydown", (event)=>{
    if(event.keyCode == 90 || event.keyCode == 88){
        event.preventDefault();
        for(var i = 0; i < beatInfoArr.length; i++){
            var dx = beatInfoArr[i].x - mousePosX;
            var dy = (beatInfoArr[i].y * 0.6) - mousePosY;
            var dis = dx * dx + dy * dy;
            if(dis <= 20){
                combo += 1;
                totalBeat += 1;
                if(Math.abs(timediff) < 100){
                    score += 200 * combo;
                    totalAcc += 100;
                    life += 20;
                }else if(Math.abs(timediff) < 300){
                    score += 100 * combo;
                    totalAcc += 80;
                    life += 10;
                }else if(Math.abs(timediff) < 500){
                    score += 50 * combo;
                    totalAcc += 60;
                    life += 5;
                }
                acc = totalAcc / totalBeat;
                acc = acc.toFixed(2);
                updateDisplay();
                beats[i].remove();
                beats.splice(i, 1);
                beatInfoArr.splice(i, 1);
                break;
            }
            if(dis <= 60){ // 13 --x3--> 39
                combo += 1;
                totalBeat += 1;
                if(Math.abs(timediff) < 100){
                    score += 100 * combo;
                    totalAcc += 80;
                    life += 20;
                }else if(Math.abs(timediff) < 300){
                    score += 50 * combo;
                    totalAcc += 60;
                    life += 10;
                }else if(Math.abs(timediff) < 500){
                    score += 20 * combo;
                    totalAcc += 40;
                    life += 5;
                }
                acc = totalAcc / totalBeat;
                acc = acc.toFixed(2);
                updateDisplay();
                beats[i].remove();
                beats.splice(i, 1);
                beatInfoArr.splice(i, 1);
                break;
            }
        }
    }
});

screenCover.addEventListener("mousemove", (event)=>{
    mousePosX = event.offsetX / screen.offsetWidth * 100;
    mousePosY = event.offsetY / screen.offsetHeight * 60;
    
});