const inputElement = document.getElementById("input");
let answer = "apple".toUpperCase();

function gameStart() {
  document.getElementById("container").innerHTML = "";
  answer = words[Math.floor(Math.random() * words.length)];
  answer = answer.toUpperCase();
  console.log(answer);
}

function enterKeyPress(event) {
  if (event.keyCode !== 13) {
    return;
  }

  const value = inputElement.value.toUpperCase();
  if (value.length !== 5) {
    alert("Input should be 5 characters");
    return;
  }

  const result = ["wrong", "wrong", "wrong", "wrong", "wrong"];
  const answerUsed = [false, false, false, false, false];

  for (let i = 0; i < 5; i++) {
    if (value[i] == answer[i]) {
      result[i] = "correct";
      answerUsed[i] = true;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] == "correct") {
      continue;
    }

    for (let j = 0; j < 5; j++) {
      if (value[i] == answer[j] && answerUsed[j] == false) {
        result[i] = "misplaced";
        answerUsed[j] = true;
      }
    }
  }

  console.log(result);

  // -> ['wrong', 'correct', 'misplaced', 'correct', 'wrong'];

  const container = document.getElementById("container");

  const resultHtml = `<div class="results">
      <div class="box ${result[0]}">${value[0]}</div>
      <div class="box ${result[1]}">${value[1]}</div>
      <div class="box ${result[2]}">${value[2]}</div>
      <div class="box ${result[3]}">${value[3]}</div>
      <div class="box ${result[4]}">${value[4]}</div>
    </div>`;

  container.innerHTML += resultHtml;
  inputElement.value = "";
}

inputElement.addEventListener("keyup", enterKeyPress);
gameStart();
