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
  const [isTouching, setIsTouching] = useState(0);
  const spawnTime = 1000;
  const fallingSpeed = 3;
  const lastAppleSpawnTime = useRef(0);

  const updateGame = (
    entities: Entities,
    { touches, time, dispatch }: GameEngineUpdateEventOptionType
  ) => {
    let character = entities.character;

    // TODO: move the character with touch
    touches.forEach((t) => {
      if (t.type === "start") {
        setIsTouching(isTouching + 1);

        if (t.event.pageX < width / 2) {
          // Move left
          setCharacterDirection(-5);
        } else {
          // Move right
          setCharacterDirection(5);
        }
      } else if (t.type === "end") {
        setIsTouching(isTouching - 1);
        setCharacterDirection(0);
      }

      if (isTouching > 0) {
        if (t.event.pageX < width / 2) {
          // Move left
          setCharacterDirection(-5);
        } else {
          // Move right
          setCharacterDirection(5);
        }
      }
    });

    if (isTouching > 0) {
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

        if (apple.y > height) {
          delete entities[key];
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
        systems={[updateGame]}
        entities={{
          background: {
            width,
            height,
            renderer: <Background width={width} height={height} />,
          },
          character: {
            x: 50,
            y: FLOOR - CHARACTER_SIZE,
            renderer: <Character x={50} y={FLOOR - CHARACTER_SIZE} />,
          },
        }}
      ></GameEngine>
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

const Background = ({ width, height }: { width: number; height: number }) => {
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
      }}
    />
  );
};
