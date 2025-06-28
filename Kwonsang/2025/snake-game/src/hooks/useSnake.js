import { useRef, useState } from "react";
import { COLS, ROWS } from "../constants/gameConfig";

const Block = (x, y, color) => ({
  x,
  y,
  color,
  draw: (ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  },
});

export const useSnake = (ctx, currentTheme, setScore, setCoin) => {
  const [snake, setSnake] = useState(null);
  const direction = useRef([1, 0]);

  const initSnake = () => {
    const x = 10;
    const y = 9;
    const tails = [
      Block(x, y, currentTheme.snake),
      Block(x, y, currentTheme.snake),
      Block(x, y, currentTheme.snake),
    ];
    direction.current = [1, 0];
    const apple = randomApple(currentTheme.apple);

    return { x, y, tails, apple };
  };

  const randomApple = (color) => {
    const randX = Math.floor(Math.random() * COLS);
    const randY = Math.floor(Math.random() * ROWS);
    return Block(randX, randY, color);
  };

  const move = () => {
    if (!snake) return false;

    const newX = snake.x + direction.current[0];
    const newY = snake.y + direction.current[1];

    if (!isValidHead(newX, newY)) {
      setSnake((prev) => ({
        ...prev,
        tails: prev.tails.map((tail) => Block(tail.x, tail.y, "gray")),
      }));
      return false;
    }

    const gotApple = newX === snake.apple.x && newY === snake.apple.y;
    if (gotApple) {
      setScore((prev) => prev + 1);
      setCoin((prev) => {
        const newCoin = prev + 1;
        localStorage.setItem("snakeCoin", newCoin);
        return newCoin;
      });
    }

    const newTails = [
      Block(newX, newY, currentTheme.snake),
      ...snake.tails.slice(0, gotApple ? undefined : -1),
    ];

    setSnake((prev) => ({
      ...prev,
      x: newX,
      y: newY,
      tails: newTails,
      apple: gotApple ? randomApple(currentTheme.apple) : prev.apple,
    }));

    return true;
  };

  const isValidHead = (x, y) => {
    if (!snake) return false;
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
    return !snake.tails.some((tail) => tail.x === x && tail.y === y);
  };

  const changeDirection = (dx, dy) => {
    if (!snake) return;

    const newX = snake.x + dx;
    const newY = snake.y + dy;

    if (snake.tails.some((tail) => tail.x === newX && tail.y === newY)) {
      return;
    }

    direction.current = [dx, dy];
  };

  return {
    snake,
    initSnake,
    move,
    changeDirection,
    setSnake,
  };
};
