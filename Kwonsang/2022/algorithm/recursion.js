var input = document.getElementById('input');
var wordArr = [];

function funcA(num){
    if(num < 0) return;
    console.log("hi!" + num);
    //funcA(num - 1);
    setTimeout(funcA, 100, num - 1);
}

function fact(num){
    console.log("function fact " + num + " called");
    if(num <= 1){
        var returnValue = 1;
    }else{
        var returnValue = num * fact(num - 1);
    }
    console.log(returnValue);
    return returnValue;
}

function fibo(num){
    console.log("function fibo(" + num + ") called");
    if(num <= 1){
        var returnValue = 1;
    }else{
        var returnValue = fibo(num-2) + fibo(num-1);
    }
    console.log(returnValue);
    return returnValue;
}

function palindromeBtn(){
    var inputString = input.value;
    inputString = inputString.toUpperCase();
    wordArr = inputString.split("");
    console.log(wordArr);
    //var isPalindrome = palindrome(0, wordArr.length - 1);
    var isPalindrome = pal2();
    if(isPalindrome){
        console.log("it is palindrome");
    }else{
        console.log("it is not palindrome");
    }
}

function palindrome(start, end){
    if(start >= end){
        return true;
    }
    if(wordArr[start] == wordArr[end]){
        return palindrome(start+1, end-1);
    }else{
        return false;
    }
}

function pal2(){
    var success = true;
    for(var i = 0; i < wordArr.length/2; i++){
        if(wordArr[i] != wordArr[wordArr.length - i - 1]){
            success = false;
        }
    }
    return success;
}