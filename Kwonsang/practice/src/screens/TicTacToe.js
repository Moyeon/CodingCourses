import '../styles/TicTacToe.css';
import { useState } from 'react';

function TicTacToe(){
    const [myTurn, setTurn] = useState(true);
    const [box1, setBox1] = useState("");
    const [box2, setBox2] = useState("");
    const [box3, setBox3] = useState("");
    const [box4, setBox4] = useState("");
    const [box5, setBox5] = useState("");
    const [box6, setBox6] = useState("");
    const [box7, setBox7] = useState("");
    const [box8, setBox8] = useState("");
    const [box9, setBox9] = useState("");

    function changeTurn(){
        setTurn(!myTurn);
    }

    /* 
        function scoreUpdate(){
            var scoreDisplay = document.getElementById("score");
            scoreDisplay.innerHTML = score;
        }
    */
    return(
        <div className="TTT">
            <h3>{myTurn ? "Player 1's Turn" : "Player 2's Turn"}</h3>
            <div className="row">
                <div className="box" onClick={function () {
                    if(box1 != "") return;
                    if(myTurn){
                        setBox1("O");
                    }else{
                        setBox1("X");
                    }
                    changeTurn();
                }}>
                    <div className={box1}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box2 != "") return;
                    if(myTurn){
                        setBox2("O");
                    }else{
                        setBox2("X");
                    }
                    changeTurn();
                }}>
                    <div className={box2}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box3 != "") return;
                    if(myTurn){
                        setBox3("O");
                    }else{
                        setBox3("X");
                    }
                    changeTurn();
                }}>
                    <div className={box3}></div>
                </div>
            </div>
            <div className="row">
                <div className="box" onClick={function () {
                    if(box4 != "") return;
                    if(myTurn){
                        setBox4("O");
                    }else{
                        setBox4("X");
                    }
                    changeTurn();
                }}>
                    <div className={box4}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box5 != "") return;
                    if(myTurn){
                        setBox5("O");
                    }else{
                        setBox5("X");
                    }
                    changeTurn();
                }}>
                    <div className={box5}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box6 != "") return;
                    if(myTurn){
                        setBox6("O");
                    }else{
                        setBox6("X");
                    }
                    changeTurn();
                }}>
                    <div className={box6}></div>
                </div>
            </div>
            <div className="row">
                <div className="box" onClick={function () {
                    if(box7 != "") return;
                    if(myTurn){
                        setBox7("O");
                    }else{
                        setBox7("X");
                    }
                    changeTurn();
                }}>
                    <div className={box7}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box8 != "") return;
                    if(myTurn){
                        setBox8("O");
                    }else{
                        setBox8("X");
                    }
                    changeTurn();
                }}>
                    <div className={box8}></div>
                </div>
                <div className="box" onClick={function () {
                    if(box9 != "") return;
                    if(myTurn){
                        setBox9("O");
                    }else{
                        setBox9("X");
                    }
                    changeTurn();
                }}>
                    <div className={box9}></div>
                </div>
            </div>
        </div>
    );
}
export default TicTacToe;