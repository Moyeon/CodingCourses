var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var input = document.getElementById("input");


function clic(){
    if(money < input.value){
        alert("Please type a value less than your current balance");
        return;
    }
    if(input.value < 0){
        alert("Please type a positive value");
        return;
    }

    var one = Math.floor(Math.random() * 9);
    var two = Math.floor(Math.random() * 9);
    var three = Math.floor(Math.random() * 9);

    box1.innerHTML = one;
    box2.innerHTML = two;
    box3.innerHTML = three;

    if(one == two && two == three && one ==three){
        money -= input.value;
        money += input.value * 10;
    }else if(one == two || two == three || one == three){
        money -= input.value;
        money += input.value * 5;
    }else{
        money -= input.value;
    }
    moneyVal.innerHTML = money;
}