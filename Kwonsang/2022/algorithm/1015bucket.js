var cowList = document.getElementById('cowList');
var cowNum = document.getElementById('cowNum');

function setCows(){
    var num = cowNum.value;
    cowList.innerHTML = '';
    for(var i = 0; i < num; i++){
        const cow = document.createElement('div');
        const p = document.createElement('p');
        const start = document.createElement('input');
        const end = document.createElement('input');
        const bucket = document.createElement('input');

        cow.classList = 'cow';
        p.innerHTML = 'Cow ' + i;
        start.type = 'range';
        start.min = '1';
        start.max = '1000';
        start.id = 'start' + i;
        end.type = 'range';
        end.min = '1';
        end.max = '1000';
        end.id = 'end' + i;
        bucket.type = 'range';
        bucket.min = '1';
        bucket.max = '10';
        bucket.id = 'bucket' + i;

        cow.appendChild(p);
        cow.appendChild(start);
        cow.appendChild(end);
        cow.appendChild(bucket);

        cowList.appendChild(cow);
    }
}

function solve(){
    var timeTable = [];
    for(var i = 0; i<1000; i++){
        timeTable.push(0);
    }
    for(var i = 0; i<cowNum.value; i++){
        var startTime = document.getElementById('start'+i).value;
        var endTime = document.getElementById('end'+i).value;
        var bucketNum = document.getElementById('bucket'+i).value;

        for(var j = startTime; j <= endTime; j++){
            timeTable[j] = timeTable[j] + bucketNum * 1;
        }
    }
    var maxnum = 0;
    for(var i = 0; i<1000; i++){
        if(maxnum < timeTable[i]){
            maxnum = timeTable[i];
        }
    }
    console.log(maxnum);
}