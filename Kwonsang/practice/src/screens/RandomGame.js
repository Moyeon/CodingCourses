import '../App.css';
import { useState } from 'react';

function RandomGame() {
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(2);
  const [number3, setNumber3] = useState(3);

  const handleClick = () => {
    setNumber1( Math.floor(Math.random() * 10) );
    setNumber2( Math.floor(Math.random() * 10) );
    setNumber3( Math.floor(Math.random() * 10) );
  }

  return (
    <div class="box">
      <h1>RANDOM GAME</h1>
      <div class="numbers">
        <h2>{number1}</h2>
        <h2>{number2}</h2>
        <h2>{number3}</h2>
      </div>
      <button onClick={handleClick}>click!</button>
    </div>
  );
}

export default RandomGame;