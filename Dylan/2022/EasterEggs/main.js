var input = document.getElementById('input');
var body = document.getElementById('body');


function enter(event){
    if(event.keyCode == 13){
        easterEgg();
    }
}

function easterEgg(){
    if(input.value == 'Do a Barrel Roll'){
        barrelRoll();
    }
    if(input.value == 'Askew'){
        askew();
    }
    if(input.value == 'Mirror'){
        mirror();
    }
    if(input.value == 'Dark Mode'){
        darkMode();
    }
}

function barrelRoll(){
    if(body.classList.contains('barrelRoll')){
        body.classList.remove('barrelRoll');
    }else{
        body.classList.add('barrelRoll');
    }
    
}

function askew(){
    if(body.classList.contains('askew')){
        body.classList.remove('askew');
    }else{
        body.classList.add('askew');
    }
}

function mirror(){
    if(body.classList.contains('mirror')){
        body.classList.remove('mirror');
    }else{
        body.classList.add('mirror');
    }
}

function darkMode(){
    if(body.classList.contains('darkMode')){
        body.classList.remove('darkMode');
    }else{
        body.classList.add('darkMode');
    }
}

input.addEventListener('keyup', enter);