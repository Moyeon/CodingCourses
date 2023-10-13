var randArr = [];
for (var i=0; i<20; i++){
    var randNum = Math.floor(Math.random() * 50);
    randArr.push(randNum);
}
console.log("Our Array : ");
console.log(randArr);

/*
//bubble sort
for(var i = randArr.length - 1; i >= 0; i--){
    for(var j = 0; j < i; j++){
        if(randArr[j] > randArr[j+1]){
            var temp = randArr[j];
            randArr[j] = randArr[j+1];
            randArr[j+1] = temp;
        }
    }
}



console.log("Bubble sort result : ");
console.log(randArr);
*/

/*
//insertion sort
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


console.log('Insertion sort result : ');
console.log(randArr);

*/

//selection sort

