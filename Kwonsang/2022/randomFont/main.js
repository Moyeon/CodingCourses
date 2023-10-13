var input = document.getElementById("input-text");
var outputs = document.getElementById("outputs");
var outarr = [];
var isEditing = -1;
var fontArr = ['bangers','diploma','libre','neucha','orbitron','pacifico','patrick', 'poiret','square', 'tapestry', 'water'];
var imgArr = ['circle.jpeg', 'colors.jpeg', 'neon.jpeg', 'neon2.webp', 'paint.webp'];

function getRandomFont(){
    var ran = Math.floor(Math.random() * fontArr.length);
    return fontArr[ran];
}

function setRandomBackground(){
    var ran = Math.floor(Math.random() * imgArr.length);
    var body = document.querySelector('body');
    body.style.backgroundImage = 'url(' +imgArr[ran]+ ')';

}
setRandomBackground();

function saveInput(){
    var inputVal = input.value;
    if(inputVal == "") return;

    var output = document.createElement("div");

    var edit = document.createElement("button");
    edit.innerHTML = "Edit";
    var a = outarr.length;
    edit.onclick = function (){ editOutput(a); };

    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    
    deleteBtn.onclick = function (){ deleteOutput(a); };

    var text = document.createElement("div");
    text.innerHTML = inputVal;
    text.classList.add(getRandomFont());

    output.appendChild(edit);
    output.appendChild(deleteBtn);
    output.appendChild(text);

    output.classList.add("output");

    outputs.appendChild(output);
    outarr.push(inputVal);

    input.value = '';
    save();
}

function editOutput(index){
    if(isEditing >= 0) return;
    isEditing = index;
    var toEdit = document.getElementsByClassName("output")[index-1];
    var editInput = document.createElement("input");
    editInput.value = toEdit.lastChild.innerHTML;
    editInput.id = "editing";
    toEdit.removeChild(toEdit.lastChild);
    toEdit.appendChild(editInput);
    editInput.addEventListener("keyup", editFinish);
}

function editFinish(event){
    if(event.keyCode == 13){
        var editInput = document.getElementById("editing");
        var textDiv = document.createElement("div");
        textDiv.innerHTML = editInput.value;
        textDiv.classList.add(getRandomFont());
        outarr[isEditing] = editInput.value;
        var toEdit = document.getElementsByClassName("output")[isEditing-1];
        toEdit.removeChild(toEdit.lastChild);
        toEdit.appendChild(textDiv);
        save();
        isEditing = -1;
    }
}

function deleteOutput(index){
    console.log(index);
    outarr.splice(index, 1);
    reload();
    save();
}

function enter(event){
    if(event.keyCode == 13){
        saveInput();
    }
}

function reload(){
    //delete the origin outputs
    outputs.innerHTML = "";

    //load outputs
    for(var i=0; i<outarr.length; i++){
        if(outarr[i].length < 1) continue;
        var output = document.createElement("div");

        var edit = document.createElement("button");
        edit.innerHTML = "Edit";
        const a = i;
        edit.onclick = function (){ editOutput(a); };

        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = function (){ deleteOutput(a); };

        var text = document.createElement("div");
        text.innerHTML = outarr[i];
        text.classList.add(getRandomFont());

        output.appendChild(edit);
        output.appendChild(deleteBtn);
        output.appendChild(text);

        output.classList.add("output");

        outputs.appendChild(output);
    }   
}

function save(){
    localStorage.setItem('outarr', outarr);
}

function load(){
    outarr = localStorage.getItem('outarr').split(',');
    reload();
}

input.addEventListener('keyup', enter);

load();