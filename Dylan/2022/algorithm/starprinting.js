var display = document.getElementById('display');



function addCircle(){
    var circle = document.createElement('div');
    circle.classList = 'circle';

    display.appendChild(circle);
}

function addLineBreak(){
    var lb = document.createElement('br');
    display.appendChild(lb);
}

function addSpace(){
    var space = document.createElement('div');
    space.classList = 'space';

    display.appendChild(space);
}

for(var i = 1; i <= 5; i++){
    for(var j=1; j<= i-1; j++){
        addSpace();
    }
    for(var j=1; j<= 11-(2*i); j++){
        addCircle();
    }
    for(var j=1; j<= i-1; j++){
        addSpace();
    }

    addLineBreak();
}

for(var i = 1; i <= 4; i++){
    for(var j=1; j<= 4-i; j++){
        addSpace();
    }
    for(var j=1; j<= 2*i + 1; j++){
        addCircle();
    }
    for(var j=1; j<= 4-i; j++){
        addSpace();
    }
    
    addLineBreak();
}

