const BLOCK_SIZE = 25;
const ROWS = 18;
const COLS = 20;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function clearAll() {
  ctx.clearRect(0, 0, COLS, ROWS);
}

function setColor(color) {
  ctx.fillStyle = color;
}

function drawRect(x, y) {
  ctx.fillRect(x, y, 1, 1);
}

class Block {
  x;
  y;
  color;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "green";
  }

  draw() {
    setColor(this.color);
    drawRect(this.x, this.y);
  }

  makeApple() {
    this.color = "red";
  }
}

class Snake {
  x;
  y;
  tails;
  apple;
  direction; // [0,1], [-1, 0] array with length 2
  command;

  constructor() {
    this.x = 10;
    this.y = 9;

    this.tails = [];
    this.tails.push(new Block(this.x, this.y));
    this.tails.push(new Block(this.x, this.y));
    this.tails.push(new Block(this.x, this.y));

    this.direction = [1, 0]; //right

    this.apple = new Block(14, 9);
    this.apple.makeApple();

    this.command = [];
  }

  draw() {
    for (let i = 0; i < this.tails.length; i++) {
      this.tails[i].draw();
    }

    this.apple.draw();
  }

  move() {
    for (let i = 0; i < this.command.length; i++) {
      if (this.changeDirection(this.command[i][0], this.command[i][1])) {
        this.command.shift();
        break;
      } else {
        this.command.shift();
      }
    }
    this.x = this.x + this.direction[0];
    this.y = this.y + this.direction[1];

    if (this.validHead()) {
      if (!this.gotApple()) {
        this.tails.pop();
      }
      this.tails.unshift(new Block(this.x, this.y));

      return true;
    } else {
      for (let i = 0; i < this.tails.length; i++) {
        this.tails[i].color = "gray";
      }

      return false;
    }
  }

  validHead() {
    // head at the wall
    if (this.x < 0 || this.x >= COLS) {
      return false;
    }

    if (this.y < 0 || this.y >= ROWS) {
      return false;
    }

    for (let i = 0; i < this.tails.length; i++) {
      if (this.x == this.tails[i].x && this.y == this.tails[i].y) {
        return false;
      }
    }

    return true;
  }

  gotApple() {
    if (this.x == this.apple.x && this.y == this.apple.y) {
      this.newApple();
      return true;
    }
    return false;
  }

  newApple() {
    const x = Math.floor(Math.random() * COLS);
    const y = Math.floor(Math.random() * ROWS);

    this.apple = new Block(x, y);
    this.apple.makeApple();
  }

  changeDirection(dx, dy) {
    const newX = this.x + dx;
    const newY = this.y + dy;
    for (let i = 0; i < this.tails.length; i++) {
      if (newX == this.tails[i].x && newY == this.tails[i].y) {
        return false;
      }
    }

    this.direction = [dx, dy];
    return true;
  }

  addCommand(dx, dy) {
    this.command.push([dx, dy]);
  }
}

const snake = new Snake();
snake.draw();

let requestId;
let time = { start: 0, level: 300 };
function animate(now = 0) {
  if (now - time.start > time.level) {
    time.start = now;
    if (snake.move()) {
      clearAll();
      snake.draw();
    } else {
      clearAll();
      snake.draw();
      return;
    }
  }
  requestId = requestAnimationFrame(animate);
}

animate();

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 38) {
    //UP
    snake.addCommand(0, -1);
  }
  if (event.keyCode == 40) {
    //DOWN
    snake.addCommand(0, 1);
  }
  if (event.keyCode == 37) {
    //LEFT
    snake.addCommand(-1, 0);
  }
  if (event.keyCode == 39) {
    //RIGHT
    snake.addCommand(1, 0);
  }
});
