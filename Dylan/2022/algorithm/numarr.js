var arr = [];

for(var i=1; i<=100; i++){
    arr.push(i);
}

console.log(arr);

var arr2 = [];

for(var i=1; i<=100; i++){
    if(i%3==0){
        arr2.push(i);
    }
}

console.log(arr2);

var arr3 = [];

for(var i=1; i<=50; i++){
    arr3.push(i * 7);
}
console.log(arr3);


//count the number of multiples of 3 in arr3
var count = 0;
for(var i=0; i<arr3.length; i++){
    if(arr3[i] % 3 == 0){
        count++;
    }
}
console.log(count);
