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