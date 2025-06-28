import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  push,
  query,
  orderByChild,
  limitToLast,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbkIl38Ua5RweHxtMTAEUIY32Az3Bc7-o",
  authDomain: "game-2048-leaderboard.firebaseapp.com",
  databaseURL: "https://game-2048-leaderboard-default-rtdb.firebaseio.com",
  projectId: "game-2048-leaderboard",
  storageBucket: "game-2048-leaderboard.firebasestorage.app",
  messagingSenderId: "529130434419",
  appId: "1:529130434419:web:cf45922fab1ee20bf8df06",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var scoreDisplay = document.getElementById("score");
var highDisplay = document.getElementById("highscore");
var tileContainer = document.getElementById("tileContainer");
var endingScreen = document.getElementById("endingScreen");
var tileList = [];
var isMoving = false;
var score = 0;
var highScore = localStorage.getItem("highScore2048");
if (!highScore) {
  highScore = 0;
}

function updateDisplay() {
  scoreDisplay.innerHTML = score;
  if (highScore < score) {
    highScore = score;
    localStorage.setItem("highScore2048", highScore);
  }
  highDisplay.innerHTML = highScore;
}

function tileMapFind(posy, posx) {
  var result = tileList.find((tile) => tile.posy == posy && tile.posx == posx);
  if (result) {
    return result.num;
  }
  return 0;
}

function createTile(num, posy, posx) {
  var tileDiv = document.createElement("div");
  tileDiv.classList.add("tile");
  if (num >= 2048) {
    tileDiv.classList.add("tile2048");
  } else {
    tileDiv.classList.add("tile" + num);
  }
  tileDiv.classList.add("tilepos" + posy + posx);

  var tiletextDiv = document.createElement("div");
  tiletextDiv.classList.add("tileText");
  tiletextDiv.innerHTML = num;

  tileDiv.appendChild(tiletextDiv);
  tileContainer.appendChild(tileDiv);

  return tileDiv;
}

function canMove() {
  var result = false;
  //vertical combine
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 4; j++) {
      if (tileMapFind(i, j) == tileMapFind(i + 1, j)) {
        result = true;
      }
    }
  }
  //horizontal combine
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      if (tileMapFind(i, j) == tileMapFind(i, j + 1)) {
        result = true;
      }
    }
  }
  return result;
}

class Tile {
  num;
  posy;
  posx;
  div;

  constructor() {
    var n = Math.floor(Math.random() * 10);
    if (n == 0) {
      this.num = 4;
    } else {
      this.num = 2;
    }
    var possible = false;
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (tileMapFind(i, j) == 0) {
          possible = true;
        }
      }
    }
    if (!possible) {
      if (!canMove()) gameOver();
      return;
    }

    var randx = Math.floor(Math.random() * 4);
    var randy = Math.floor(Math.random() * 4);
    while (tileMapFind(randy, randx) != 0) {
      randx = Math.floor(Math.random() * 4);
      randy = Math.floor(Math.random() * 4);
    }
    this.posx = randx;
    this.posy = randy;

    this.div = createTile(this.num, this.posy + 1, this.posx + 1);
  }

  changePos(ny, nx) {
    if (ny == this.posy && nx == this.posx) return;
    if (tileMapFind(ny, nx) > 0) {
      //something is there, have to combine
      const nny = ny;
      const nnx = nx;
      const n = this.num;
      this.num = -this.num * 2;
      score += n * 2;
      updateDisplay();

      const target = tileList.find(
        (e) => e.posy == nny && e.posx == nnx && e.num == n
      );
      target.num = -target.num;

      this.div.addEventListener(
        "transitionend",
        () => {
          const targetTile1 = tileList.findIndex(
            (e) => e.posy == nny && e.posx == nnx && e.num == -n
          );
          tileList[targetTile1].div.remove();
          tileList.splice(targetTile1, 1);

          var targetTile = tileList.findIndex(
            (e) => e.posy == nny && e.posx == nnx
          );
          tileList[targetTile].div.remove();

          if (tileList[targetTile].num < 0) {
            tileList[targetTile].num *= -1;
          }

          tileList[targetTile].div = createTile(
            tileList[targetTile].num,
            tileList[targetTile].posy + 1,
            tileList[targetTile].posx + 1
          );
        },
        { once: true }
      );
    }

    this.div.classList.remove(tpGen(this.posy, this.posx));
    this.div.classList.add(tpGen(ny, nx));
    this.posx = nx;
    this.posy = ny;
    if (isMoving == false) {
      isMoving = true;
      this.div.addEventListener(
        "transitionend",
        () => {
          isMoving = false;
        },
        { once: true }
      );
    }
  }
}

function tpGen(y, x) {
  return "tilepos" + (y + 1) + (x + 1);
}

function move(direction) {
  if (isMoving) return;
  if (direction == "up") {
    for (var i = 1; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        //if a tile is on i,j
        if (tileMapFind(i, j) > 0) {
          console.log("tileon" + i + j);
          var ni = i - 1;
          while (
            ni >= 0 &&
            (tileMapFind(ni, j) == 0 || tileMapFind(ni, j) == tileMapFind(i, j))
          ) {
            ni--;
          }
          //move tile to ni+1
          if (ni + 1 != i) {
            var tile = tileList.find((e) => e.posy == i && e.posx == j);
            tile.changePos(ni + 1, j);
          }
        }
      }
    }
  } else if (direction == "down") {
    for (var i = 2; i >= 0; i--) {
      for (var j = 0; j < 4; j++) {
        //if a tile is on i,j
        if (tileMapFind(i, j) > 0) {
          console.log("tileon" + i + j);
          var ni = i + 1;
          while (
            ni <= 3 &&
            (tileMapFind(ni, j) == 0 || tileMapFind(ni, j) == tileMapFind(i, j))
          ) {
            ni++;
          }
          //move tile to ni+1
          if (ni - 1 != i) {
            var tile = tileList.find((e) => e.posy == i && e.posx == j);
            tile.changePos(ni - 1, j);
          }
        }
      }
    }
  } else if (direction == "left") {
    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        //if a tile is on i,j
        if (tileMapFind(i, j) > 0) {
          console.log("tileon" + i + j);
          var nj = j - 1;
          while (
            nj >= 0 &&
            (tileMapFind(i, nj) == 0 || tileMapFind(i, nj) == tileMapFind(i, j))
          ) {
            nj--;
          }
          //move tile to ni+1
          if (nj + 1 != j) {
            var tile = tileList.find((e) => e.posy == i && e.posx == j);
            tile.changePos(i, nj + 1);
          }
        }
      }
    }
  } else if (direction == "right") {
    for (var i = 0; i < 4; i++) {
      for (var j = 2; j >= 0; j--) {
        //if a tile is on i,j
        if (tileMapFind(i, j) > 0) {
          console.log("tileon" + i + j);
          var nj = j + 1;
          while (
            nj <= 3 &&
            (tileMapFind(i, nj) == 0 || tileMapFind(i, nj) == tileMapFind(i, j))
          ) {
            nj++;
          }
          //move tile to ni+1
          if (nj - 1 != j) {
            var tile = tileList.find((e) => e.posy == i && e.posx == j);
            tile.changePos(i, nj - 1);
          }
        }
      }
    }
  } else {
    return;
  }
  tileList.push(new Tile());
}

window.addEventListener("keydown", (event) => {
  //up 38 87, down 40 83, left 37 65, right 39 68
  event.preventDefault();
  if (event.keyCode == 38 || event.keyCode == 87) {
    move("up");
  }
  if (event.keyCode == 40 || event.keyCode == 83) {
    move("down");
  }
  if (event.keyCode == 37 || event.keyCode == 65) {
    move("left");
  }
  if (event.keyCode == 39 || event.keyCode == 68) {
    move("right");
  }
});

function gameStart() {
  endingScreen.style.visibility = "hidden";
  score = 0;
  updateDisplay();
  tileList = [];
  tileContainer.innerHTML = [];
  tileList.push(new Tile());
  tileList.push(new Tile());
}

const db = getDatabase(app);

var leaderboard = document.getElementById("scores");

async function updateLeaderboard() {
  const leaderboardRef = query(
    ref(db, "leaderboard"),
    orderByChild("score"),
    limitToLast(10)
  );

  onValue(leaderboardRef, (snapshot) => {
    leaderboard.innerHTML = ""; // Clear existing leaderboard
    const scores = [];

    snapshot.forEach((childSnapshot) => {
      scores.push(childSnapshot.val());
    });

    scores.sort((a, b) => b.score - a.score); // Sort scores descending

    scores.forEach((entry, index) => {
      const scoreDiv = document.createElement("div");
      scoreDiv.classList.add("score");
      scoreDiv.innerHTML = `
        <h4>${index + 1}</h4>
        <h4>${entry.name}</h4>
        <h4>${entry.score}</h4>
      `;
      leaderboard.appendChild(scoreDiv);
    });
  });
}

function saveScore(name, score) {
  const leaderboardRef = ref(db, "leaderboard");
  const newScoreRef = push(leaderboardRef);
  set(newScoreRef, { name, score });
}

function gameOver() {
  endingScreen.style.visibility = "visible";
  const playerName = prompt("Game over! Enter your name for the leaderboard:");
  if (playerName) {
    saveScore(playerName, score);
    updateLeaderboard();
  }
}

updateLeaderboard();
gameStart();

document.getElementById("restart").addEventListener("click", gameStart);
