var answer = 1570;

for(var i = 0; i<10000; i++){
    if(answer == i){
        console.log('answer is '+ i);
    }
}


for(var A = 1; A <= 100; A++){
    for(var B = 1; B<= 100; B++){
        for(var C = 1; C <= 100; C++){
            if(A+B+C == 100){
                console.log(A+" + "+B+" + "+C+" = 100");
            }
        }
    }
}


var inputG = document.getElementById('ssj');
function generator(){
    var num = inputG.value;
    for(var a=0; a<10; a++){
        for(var b=0; b<10; b++){
            for(var c=0; c<10; c++){
                if(101*a + 11*b + 2*c == num){
                    console.log(''+a+b+c+' is a generator of '+num);
                }
            }
        }
    }
}

var inputH = document.getElementById('noh');
function isNumberOfHell(){
    var num = inputH.value * 1;
    var count = 0;
    while(num > 0){
        if(num % 10 == 6){
            count++;
        }else{
            count = 0;
        }
        num = Math.floor(num/10);
        if(count == 3){
            console.log('It is number of hell');
            return true;
        }
    }
    console.log('It is not number of hell');
    return false;
}

var inputN = document.getElementById('nthnoh');
function nthNOH(){
    var nth = 0;
    var number = inputN.value * 1;
    for(var i = 1; nth <= number; i++){
        
    }
}
function isNOH(num){
    var count = 0;
    while(num > 0){
        if(num % 10 == 6){
            count++;
        }else{
            count = 0;
        }
        num = Math.floor(num/10);
        if(count == 3){
            console.log('It is number of hell');
            return true;
        }
    }
    console.log('It is not number of hell');
    return false;
}



function isHAN(num){
    if(num < 100 || num >= 1000){
        return false;
    }
    var a = num % 10;
    num = Math.floor(num / 10);
    var b = num % 10;
    num = Math.floor(num / 10);
    var c = num;

    if( a - b == b - c){
        console.log('this is han number');
        return true;
    }else{
        console.log('this is not a han number');
        return false;
    }
}

function closestHan(n){
    var c = -1;
    for(var i = 0; i<1000; i++){
        if(isHAN(n+i)){
            c = n+i;
            break;
        }
        if(isHAN(n-i)){
            c = n-i;
            break;
        }
    }
    console.log(c + ' is the closest Han Number');
}