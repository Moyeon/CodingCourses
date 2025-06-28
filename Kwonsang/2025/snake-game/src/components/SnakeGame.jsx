import React, { useEffect, useRef, useState } from "react";
import { ShopItem } from "./ShopItem";
import { useSnake } from "../hooks/useSnake";
import { COLS, ROWS, BLOCK_SIZE, items } from "../constants/gameConfig";

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const lastMoveTime = useRef(0);
  const [ctx, setCtx] = useState(null);
  const [score, setScore] = useState(0);
  const [coin, setCoin] = useState(
    parseInt(localStorage.getItem("snakeCoin")) || 0
  );
  const [shopVisible, setShopVisible] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(items[0]);
  const [ownedThemes, setOwnedThemes] = useState(
    JSON.parse(localStorage.getItem("snakeShopArr")) || [
      true,
      false,
      false,
      false,
      false,
      false,
    ]
  );

  const { snake, initSnake, move, changeDirection, setSnake } = useSnake(
    ctx,
    currentTheme,
    setScore,
    setCoin
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    context.scale(BLOCK_SIZE, BLOCK_SIZE);

    setCtx(context);
  }, []);

  // Game animation loop
  useEffect(() => {
    if (!ctx || !snake || shopVisible) return;

    const MOVE_INTERVAL = 200;

    const gameLoop = (timestamp) => {
      if (!lastMoveTime.current) lastMoveTime.current = timestamp;

      const deltaTime = timestamp - lastMoveTime.current;

      if (deltaTime >= MOVE_INTERVAL) {
        // Move the snake and check for game over
        if (!move()) {
          ctx.clearRect(0, 0, COLS, ROWS);
          // Draw the snake and apple
          snake.tails.forEach((tail) => tail.draw(ctx));
          snake.apple.draw(ctx);
          cancelAnimationFrame(animationFrameId.current);
          setTimeout(() => setShopVisible(true), 1000);
          return;
        }

        ctx.clearRect(0, 0, COLS, ROWS);
        // Draw the snake and apple
        snake.tails.forEach((tail) => tail.draw(ctx));
        snake.apple.draw(ctx);

        lastMoveTime.current = timestamp;
      }

      // Continue the game loop
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    animationFrameId.current = requestAnimationFrame(gameLoop);

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [ctx, snake, shopVisible, move]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (shopVisible) return;

      switch (event.keyCode) {
        case 37: // Left
          changeDirection(-1, 0);
          break;
        case 38: // Up
          changeDirection(0, -1);
          break;
        case 39: // Right
          changeDirection(1, 0);
          break;
        case 40: // Down
          changeDirection(0, 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [changeDirection, shopVisible]);

  const handleGameStart = () => {
    setScore(0);
    lastMoveTime.current = 0; // Reset the move timer
    setSnake(initSnake());
    setShopVisible(false);
  };

  const handleThemePurchase = (index) => {
    if (coin >= items[index].price) {
      setCoin((prev) => {
        const newCoin = prev - items[index].price;
        localStorage.setItem("snakeCoin", newCoin);
        return newCoin;
      });

      const newOwnedThemes = [...ownedThemes];
      newOwnedThemes[index] = true;
      setOwnedThemes(newOwnedThemes);
      localStorage.setItem("snakeShopArr", JSON.stringify(newOwnedThemes));
    }
  };

  return (
    <div className="gameboi">
      <div id="shop" className={shopVisible ? "" : "hidden"}>
        <button onClick={handleGameStart}>START</button>
        <div id="items">
          {items.map((item, index) => (
            <ShopItem
              key={index}
              item={item}
              owned={ownedThemes[index]}
              coins={coin}
              onPurchase={() => handleThemePurchase(index)}
              onSelect={() => setCurrentTheme(item)}
            />
          ))}
        </div>
      </div>
      <div className="game">
        <div id="scoreDisplay" style={{ color: currentTheme.text }}>
          {score}
        </div>
        <div id="coinDisplay">{coin}</div>
        <canvas
          ref={canvasRef}
          style={{
            background: currentTheme.backColor,
            borderColor: currentTheme.backBorder,
          }}
        />
      </div>
      <div className="fakebtn" />
      <div className="fakebtn" />
      <div className="fakecircle" />
      <div className="fakecircle" />
    </div>
  );
};

export default SnakeGame;
