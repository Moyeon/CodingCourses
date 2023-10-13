var textarea = document.getElementById('textarea');
var resultDiv = document.getElementById('result');
var message;

function generate(){
    message = textarea.value.split("");

    var rand = Math.floor(Math.random() * 16);
    for(var i = 0; i<message.length; i++){
        if(rand == 0){
            if(textDict.frakturDict[message[i]]){
                message[i] = textDict.frakturDict[message[i]];
            }
        }else if(rand == 1){
            if(textDict.cicledBlackDict[message[i]]){
                message[i] = textDict.cicledBlackDict[message[i]];
            }
        }else if(rand == 2){
            if(textDict.circledDict[message[i]]){
                message[i] = textDict.circledDict[message[i]];
            }
        }else if(rand == 3){
            if(textDict.doublestruckDict[message[i]]){
                message[i] = textDict.doublestruckDict[message[i]];
            }
        }else if(rand == 4){
            if(textDict.frakturBoldDict[message[i]]){
                message[i] = textDict.frakturBoldDict[message[i]];
            }
        }else if(rand == 5){
            if(textDict.monospaceDict[message[i]]){
                message[i] = textDict.monospaceDict[message[i]];
            }
        }else if(rand == 6){
            if(textDict.sansBoldDict[message[i]]){
                message[i] = textDict.sansBoldDict[message[i]];
            }
        }else if(rand == 7){
            if(textDict.sansBoldItalicDict[message[i]]){
                message[i] = textDict.sansBoldItalicDict[message[i]];
            }
        }else if(rand == 8){
            if(textDict.sansDict[message[i]]){
                message[i] = textDict.sansDict[message[i]];
            }
        }else if(rand == 9){
            if(textDict.sansItalicDict[message[i]]){
                message[i] = textDict.sansItalicDict[message[i]];
            }
        }else if(rand == 10){
            if(textDict.scriptBoldDict[message[i]]){
                message[i] = textDict.scriptBoldDict[message[i]];
            }
        }else if(rand == 11){
            if(textDict.serifBoldDict[message[i]]){
                message[i] = textDict.serifBoldDict[message[i]];
            }
        }else if(rand == 12){
            if(textDict.scriptDict[message[i]]){
                message[i] = textDict.scriptDict[message[i]];
            }
        }else if(rand == 13){
            if(textDict.serifBoldItalicDict[message[i]]){
                message[i] = textDict.serifBoldItalicDict[message[i]];
            }
        }else if(rand == 14){
            if(textDict.squaredBlackDict[message[i]]){
                message[i] = textDict.squaredBlackDict[message[i]];
            }
        }else if(rand == 15){
            if(textDict.squaredDict[message[i]]){
                message[i] = textDict.squaredDict[message[i]];
            }
        }
    }

    resultDiv.innerHTML = "";
    textanimation();
    
}

function textanimation(){
    if(message.length == 0) return;
    resultDiv.innerHTML += message[0];
    message.shift(0);
    setTimeout(textanimation, 100);
}