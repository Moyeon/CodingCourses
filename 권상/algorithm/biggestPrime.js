var display = document.getElementById('display');
var primeArr = [];

function isPrime(num){
    for(var i=0; i<primeArr.length; i++){
        if(num % primeArr[i] == 0){
            return false;
        }
    }
    primeArr.push(num);
    return true;
}

function printNextPrime(pnum){
    var n = pnum;
    while(true){
        n++;
        if(isPrime(n)){
            break;
        }
    }
    display.innerText = n;
    setTimeout(() => {
        printNextPrime(n)
    }, 1);
}

printNextPrime(2);