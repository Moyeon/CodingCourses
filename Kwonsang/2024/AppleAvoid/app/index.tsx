import { useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import {
  GameEngine,
  GameEngineUpdateEventOptionType,
} from "react-native-game-engine";

interface Entities {
  [key: string]: any;
}

const { width, height } = Dimensions.get("window");

const CHARACTER_SIZE = 60;
const APPLE_SIZE = 40;
const FLOOR = height - 100;

export default function Index() {
  const [characterDirection, setCharacterDirection] = useState(0);
  const isTouching = useRef(false);
  const [isGaming, setIsGaming] = useState(true);
  const [score, setScore] = useState(0);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);

  const spawnTime = 1000;
  const fallingSpeed = 3;
  const lastAppleSpawnTime = useRef(0);

  function resetGame() {
    setScore(0);
    setIsGaming(true);
    setCharacterDirection(0);
    isTouching.current = false;

    if (gameEngine) {
      gameEngine.swap({
        background: {
          width,
          height,
          score,
          renderer: <Background width={width} height={height} score={score} />,
        },
        character: {
          x: width / 2 - CHARACTER_SIZE / 2,
          y: FLOOR - CHARACTER_SIZE,
          renderer: (
            <Character
              x={width / 2 - CHARACTER_SIZE / 2}
              y={FLOOR - CHARACTER_SIZE}
            />
          ),
        },
      });
    }
  }

  const updateGame = (
    entities: Entities,
    { touches, time, dispatch }: GameEngineUpdateEventOptionType
  ) => {
    if (!isGaming) return entities;

    let character = entities.character;

    // TODO: move the character with touch
    touches.forEach((t) => {
      if (t.type === "start") {
        isTouching.current = true;

        if (t.event.pageX < width / 2) {
          // Move left
          setCharacterDirection(-5);
        } else {
          // Move right
          setCharacterDirection(5);
        }
      } else if (t.type === "end") {
        isTouching.current = false;
        setCharacterDirection(0);
      }

      if (isTouching.current == true) {
        if (t.event.pageX < width / 2) {
          // Move left
          setCharacterDirection(-5);
        } else {
          // Move right
          setCharacterDirection(5);
        }
      }
    });

    if (isTouching.current == true) {
      character.x += characterDirection;
      if (character.x < 0) {
        character.x = 0;
      } else if (character.x > width - CHARACTER_SIZE) {
        character.x = width - CHARACTER_SIZE;
      }
    }

    character.renderer = <Character x={character.x} y={character.y} />;

    lastAppleSpawnTime.current += time.delta;
    if (lastAppleSpawnTime.current >= spawnTime) {
      lastAppleSpawnTime.current = 0;

      const newKey = "apple-" + time.current;
      entities[newKey] = {
        x: Math.random() * (width - APPLE_SIZE),
        y: 0,
        renderder: <Apple x={0} y={0} />,
      };
    }

    Object.keys(entities).forEach((key) => {
      if (key.startsWith("apple")) {
        let apple = entities[key];

        apple.y += fallingSpeed;

        if (apple.y > FLOOR - APPLE_SIZE) {
          delete entities[key];
        }

        // Collision check
        if (apple.y + APPLE_SIZE > character.y) {
          var radius = APPLE_SIZE / 2;
          var appleCenterX = apple.x + radius;
          var appleCenterY = apple.y + radius;

          var closestX = Math.max(
            character.x,
            Math.min(appleCenterX, character.x + CHARACTER_SIZE)
          );
          var closestY = Math.max(
            character.y,
            Math.min(appleCenterY, character.y + CHARACTER_SIZE)
          );

          if (
            radius * radius >
            (closestX - appleCenterX) * (closestX - appleCenterX) +
              (closestY - appleCenterY) * (closestY - appleCenterY)
          ) {
            setIsGaming(false);
            delete entities[key];
          }
        }

        apple.renderer = <Apple x={apple.x} y={apple.y} />;
      }
    });

    return entities;
  };

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        systems={[updateGame]}
        entities={{
          background: {
            width,
            height,
            score,
            renderer: (
              <Background width={width} height={height} score={score} />
            ),
          },
          character: {
            x: width / 2 - CHARACTER_SIZE / 2,
            y: FLOOR - CHARACTER_SIZE,
            renderer: (
              <Character
                x={width / 2 - CHARACTER_SIZE / 2}
                y={FLOOR - CHARACTER_SIZE}
              />
            ),
          },
        }}
      ></GameEngine>
      {!isGaming && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          onTouchEnd={resetGame}
        >
          <View
            style={{
              padding: 40,
              backgroundColor: "white",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Game Over!
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              SCORE: {score}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const Character = ({ x, y }: { x: number; y: number }) => {
  return (
    <View
      style={{
        width: CHARACTER_SIZE,
        height: CHARACTER_SIZE,
        backgroundColor: "blue",
        position: "absolute",
        left: x,
        top: y,
        zIndex: 10,
      }}
    ></View>
  );
};

// TODO: Apple spawning
const Apple = ({ x, y }: { x: number; y: number }) => {
  return (
    <View
      style={{
        width: APPLE_SIZE,
        height: APPLE_SIZE,
        backgroundColor: "red",
        position: "absolute",
        borderRadius: APPLE_SIZE,
        left: x,
        top: y,
        zIndex: 11,
      }}
    ></View>
  );
};

const Background = ({
  width,
  height,
  score,
}: {
  width: number;
  height: number;
  score: number;
}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "lightgreen",
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{score}</Text>
    </View>
  );
};
