var input = document.getElementById('input');
var display = document.getElementById('display');
var array = [];

function arrayInput(){
    array = input.value.split(',');
    for(var i=0; i<array.length; i++){
        array[i] = array[i] * 1;
    }
    console.log(array);
}

function biggestNum(){
    arrayInput();
    var maxnum = -1;
    for(var i=0; i<array.length; i++){
        if(maxnum < array[i]){
            maxnum = array[i];
        }
    }
    display.innerHTML = 'The biggest number is ' + maxnum;
}

function smallestNum(){
    arrayInput();
    var minnum = array[0];
    for(var i=0; i<array.length; i++){
        if(minnum > array[i]){
            minnum = array[i];
        }
    }
    display.innerHTML = 'The smallest number is ' + minnum;
}

function bubbleSort(){
    arrayInput();
    for(var i=array.length - 2; i>=0; i--){
        for(var j=0; j<=i; j++){
            if(array[j] > array[j+1]){
                //swap
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    console.log(array);
    var toPrint = "bubble sort result : [";
    for(var i=0; i<array.length; i++){
        toPrint += array[i];
        if(i < array.length - 1){
            toPrint += ", ";
        }else{
            toPrint += "]";
        }
    }
    display.innerHTML = toPrint;
}

function insertionSort(){
    arrayInput();
    for(var i=1; i<array.length; i++){
        var key = array[i];
        for(var j=i-1; j>=-1; j--){
            if(j == -1){
                array[0] = key;
                break;
            }
            if(array[j] > key){
                array[j+1] = array[j];
            }else{
                array[j+1] = key;
                break;
            }
        }
    }
    var toPrint = "insertion sort result : [";
    for(var i=0; i<array.length; i++){
        toPrint += array[i];
        if(i < array.length - 1){
            toPrint += ", ";
        }else{
            toPrint += "]";
        }
    }
    display.innerHTML = toPrint;
}

function selectionSort(){
    arrayInput();
    for(var i=0; i<array.length; i++){
        //get the minimum number between [i] ~ [length-1]
        var minimum = array[i];
        var minIdx = i;
        for(var j=i; j<array.length; j++){
            if(minimum > array[j]){
                minimum = array[j];
                minIdx = j;
            }
        }
        //array[i] <-> array[minidx]
        var temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;
    }

    var toPrint = "Selection sort result : [";
    for (var i=0; i<array.length; i++){
        toPrint += array[i];
        if(i < array.length-1){
            toPrint += ", ";
        }else{
            toPrint += "]";
        }
    }
    display.innerHTML = toPrint;
}