var arr = [];

for (var i=0; i<=100; i++){
    arr.push(i);
}
console.log(arr);

arr[1] = 0;

for (var i=0; i<=100; i++){
    if(arr[i] != 0){
        for(var j=2; j * arr[i] <= 100; j++){
            arr[j * arr[i]] = 0;
        }
    }
}
console.log(arr);


//prime number from array
var input = document.getElementById('input');
var numArr = [];

function arrPrime(){
    numArr = input.value.split(',');
    console.log(numArr);
    for(var i=0; i<numArr.length; i++){
        numArr[i] = numArr[i] * 1;
    }
    console.log(numArr);

    var max = 0;
    for(var i=0; i<numArr.length; i++){
        if(max < numArr[i]){
            max = numArr[i];
        }
    }

    for(var i=2; i<=max/2; i++){
        for(var j=0; j<numArr.length; j++){
            if(numArr[j] % i == 0 && numArr[j] != i){
                numArr[j] = 0;
            }
        }
    }
}

var inputA = document.getElementById('a');
var inputB = document.getElementById('b');

function primeBetween(){
    var a = inputA.value * 1;
    var b = inputB.value * 1;
    var pbArr = [];

    for(var i = a; i <= b; i++){
        pbArr.push(i);
    }
    for(var i = 2; i<= b/2; i++){
        for(var j = 0; j<pbArr.length; j++){
            if(pbArr[j] % i == 0 && pbArr[j] != i){
                pbArr[j] = 0;
            }
        }
    }
    console.log(pbArr);

}

var inputF = document.getElementById('fac');
function factorization(){
    var num = inputF.value * 1;
    var facArr = [];

    for(var i = 2; i < num ; i++){
        if(num % i == 0){
            facArr.push(i);
            num = num / i;
            i--;
        }
    }
    facArr.push(num);
    console.log(facArr);
    var toPrint = '';
    for(var i = 0; i < facArr.length-1; i++){
        toPrint += facArr[i];
        toPrint += ' x ';
    }
    toPrint += facArr[facArr.length - 1];
    console.log(toPrint);
}

function recFactorization(num){
    for(var i = 2; i <= num/2; i++){
        if(num % i == 0){
            return [i].concat( recFactorization(num / i) );
        }
    }
    return [num];
}

function recFacBtn(){
    var F = inputF.value * 1;

    var result = recFactorization(F);
    
    var toPrint = '';
    for(var i = 0; i < result.length-1; i++){
        toPrint += result[i];
        toPrint += ' x ';
    }
    toPrint += result[result.length - 1];
    console.log(toPrint);
}