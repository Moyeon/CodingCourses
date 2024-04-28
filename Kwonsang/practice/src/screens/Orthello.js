import { useState } from "react";
import "../styles/Orthello.css";
function Orthello() {
    const [gameBoard, setGameBoard] = useState([[]]);
    const [myTurn, setTurn] = useState(true);
    const direction = [
        [0, 1], [1, 1], [1, 0], [1, -1],
        [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];

    function ChangeTurn() {
        setTurn(!myTurn);
    }

    function NewGame() {
        var newGame = [];
        for(var i = 0; i < 8; i++){
            newGame.push([0, 0, 0, 0, 0, 0, 0, 0]);
        }
        newGame[3][3] = 1;
        newGame[3][4] = -1;
        newGame[4][3] = -1;
        newGame[4][4] = 1;
        setGameBoard(newGame);
        console.log(gameBoard);
    }

    function click(row, col){
        if(gameBoard[row][col] != 0) return;
        var newGameBoard = gameBoard.map(row => [...row]);
        var count = 0;
        for(var d = 0; d < 8; d++){
            for(var i = 1; i < 8; i++){
                var nr = row + direction[d][0] * i;
                var nc = col + direction[d][1] * i;
                if(nr < 0 || nr >= 8 || nc < 0 || nc >= 8 || gameBoard[nr][nc] == 0){
                    for(var reverseI = i; reverseI >= 1; reverseI --){
                        var nr = row + direction[d][0] * reverseI;
                        var nc = col + direction[d][1] * reverseI;
                        newGameBoard[nr][nc] = - newGameBoard[nr][nc];
                        count --;
                    }
                    break;
                }
                if(myTurn == true && gameBoard[nr][nc] == 1){
                    break;
                }
                if(myTurn == false && gameBoard[nr][nc] == -1){
                    break;
                }
                count ++;
                newGameBoard[nr][nc] = - newGameBoard[nr][nc];
            }
        }
        if(count == 0) return;

        if(myTurn){
            newGameBoard[row][col] = 1;
        }else{
            newGameBoard[row][col] = -1;
        }
        setGameBoard(newGameBoard);
        ChangeTurn();
    }
    
    return <div class="body">
        <h2>Orthello</h2>
        <button onClick={NewGame}>New Game</button>
        <div class="container">
            {gameBoard.map((row, rowIdx) => {
                return <div className="row">
                    {row.map((block, colIdx) => {
                    return <div 
                            className="block"
                            onClick={() => {click(rowIdx, colIdx)}}>
                            <div className={block == 1? "white" : block == -1 ? "black" : ""}>
                        </div>
                    </div>
                })}</div>
            })}
        </div>
    </div>;
}
export default Orthello;
