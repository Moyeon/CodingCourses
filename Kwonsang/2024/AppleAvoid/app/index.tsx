import { useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GameEngine,
  GameEngineUpdateEventOptionType,
} from "react-native-game-engine";

interface Entities {
  [key: string]: any;
}

// const { width, height } = Dimensions.get("window");
const width = Dimensions.get("window").width;
const height =
  Dimensions.get("window").height +
  (Platform?.OS === "android" ? StatusBar?.currentHeight : 0);

const CHARACTER_WIDTH = 40;
const CHARACTER_HEIGHT = 60;
const APPLE_SIZE = 40;
const FLOOR = height - 30;

export default function Index() {
  const [characterDirection, setCharacterDirection] = useState(0);
  const [characterSpeed, setCharacterSpeed] = useState(5);
  const isTouching = useRef(false);
  const [isGaming, setIsGaming] = useState(true);
  const [score, setScore] = useState(0);
  const [gameEngine, setGameEngine] = useState<GameEngine | null>(null);

  const [spawnTime, setSpawnTime] = useState(1000);
  const [fallingSpeed, setFallingSpeed] = useState(3);
  const [fallingSpeedX, setFallingSpeedX] = useState(1);
  const lastAppleSpawnTime = useRef(0);

  const [hitbox, setHitbox] = useState(false);
  const [hasShield, setHasShield] = useState(false);

  function getScore(num: number) {
    setScore((prev) => prev + num);
    setSpawnTime((1000 * 30) / (score + 30));
    setFallingSpeed((3 * 30 + score) / 30);
  }

  function resetGame() {
    setScore(0);
    setHasShield(false);
    setSpawnTime(1000);
    setFallingSpeed(3);
    setFallingSpeedX(1);
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
          x: width / 2 - CHARACTER_WIDTH / 2,
          y: FLOOR - CHARACTER_HEIGHT,
          shield: hasShield,
          renderer: (
            <Character
              x={width / 2 - CHARACTER_WIDTH / 2}
              y={FLOOR - CHARACTER_HEIGHT}
              hitbox={hitbox}
              shield={hasShield}
            />
          ),
        },
      });
    }
  }

  function itemBomb(entities: Entities) {
    Object.keys(entities).forEach((key) => {
      if (key.startsWith("apple")) {
        getScore(1);
        console.log(key);
        delete entities[key];
      }
      if (key.startsWith("item")) {
        delete entities[key];
      }
    });

    return entities;
  }

  function itemBoost() {
    setCharacterSpeed((prev) => prev + 5);

    setTimeout(() => {
      setCharacterSpeed((prev) => prev - 5);
    }, 5000);
  }

  function itemSlowDown() {
    setFallingSpeedX(0.5);

    setTimeout(() => setFallingSpeedX(1), 5000);
  }

  function itemShield() {
    setHasShield(true);
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
          setCharacterDirection(-1);
        } else {
          // Move right
          setCharacterDirection(1);
        }
      } else if (t.type === "end") {
        isTouching.current = false;
        setCharacterDirection(0);
      }

      if (isTouching.current == true) {
        if (t.event.pageX < width / 2) {
          // Move left
          setCharacterDirection(-1);
        } else {
          // Move right
          setCharacterDirection(1);
        }
      }
    });

    if (isTouching.current == true) {
      character.x += characterDirection * characterSpeed;
      if (character.x < 0) {
        character.x = 0;
      } else if (character.x > width - CHARACTER_WIDTH) {
        character.x = width - CHARACTER_WIDTH;
      }
    }

    character.hitbox = hitbox;
    character.shield = hasShield;
    character.renderer = (
      <Character
        x={character.x}
        y={character.y}
        hitbox={hitbox}
        shield={hasShield}
      />
    );

    lastAppleSpawnTime.current += time.delta;
    if (lastAppleSpawnTime.current >= spawnTime) {
      lastAppleSpawnTime.current = 0;

      if (Math.floor(Math.random() * 3) == 0) {
        // Item spawn
        const newKey = "item-" + time.current;
        const itemIdx = Math.floor(Math.random() * 4);
        const itemTypes = ["bomb", "boost", "shield", "slowdown"] as ItemType[];
        entities[newKey] = {
          x: Math.random() * (width - APPLE_SIZE),
          y: 0,
          item: itemTypes[itemIdx],
          hitbox: hitbox,
          renderder: (
            <Item x={0} y={0} item={itemTypes[itemIdx]} hitbox={hitbox} />
          ),
        };
      } else {
        // Apple spawn
        const newKey = "apple-" + time.current;
        entities[newKey] = {
          x: Math.random() * (width - APPLE_SIZE),
          y: 0,
          hitbox: hitbox,
          renderder: <Apple x={0} y={0} hitbox={hitbox} />,
        };
      }
    }

    Object.keys(entities).forEach((key) => {
      if (key.startsWith("apple")) {
        let apple = entities[key];
        if (!apple) return;

        apple.y += fallingSpeed * fallingSpeedX;

        if (apple.y > FLOOR - APPLE_SIZE) {
          getScore(1);
          delete entities[key];
        }

        // Collision check
        if (apple.y + APPLE_SIZE > character.y) {
          var radius = APPLE_SIZE / 2;
          var appleCenterX = apple.x + radius;
          var appleCenterY = apple.y + radius;

          var closestX = Math.max(
            character.x,
            Math.min(appleCenterX, character.x + CHARACTER_WIDTH)
          );
          var closestY = Math.max(
            character.y,
            Math.min(appleCenterY, character.y + CHARACTER_HEIGHT)
          );

          if (
            radius * radius >
            (closestX - appleCenterX) * (closestX - appleCenterX) +
              (closestY - appleCenterY) * (closestY - appleCenterY)
          ) {
            if (hasShield) {
              setHasShield(false);
            } else {
              setIsGaming(false);
            }
            delete entities[key];
          }
        }

        apple.hitbox = hitbox;
        apple.renderer = <Apple x={apple.x} y={apple.y} hitbox={hitbox} />;
      }

      if (key.startsWith("item")) {
        let item = entities[key];
        if (!item) return;

        item.y += fallingSpeed * fallingSpeedX;

        if (item.y > FLOOR - APPLE_SIZE) {
          delete entities[key];
        }

        // Collision check
        if (item.y + APPLE_SIZE > character.y) {
          var radius = APPLE_SIZE / 2;
          var itemCenterX = item.x + radius;
          var itemCenterY = item.y + radius;

          var closestX = Math.max(
            character.x,
            Math.min(itemCenterX, character.x + CHARACTER_WIDTH)
          );
          var closestY = Math.max(
            character.y,
            Math.min(itemCenterY, character.y + CHARACTER_HEIGHT)
          );

          if (
            radius * radius >
            (closestX - itemCenterX) * (closestX - itemCenterX) +
              (closestY - itemCenterY) * (closestY - itemCenterY)
          ) {
            // GET ITEM
            if (item.item === "bomb") {
              entities = itemBomb(entities);
            }
            if (item.item === "boost") {
              itemBoost();
            }
            if (item.item === "slowdown") {
              itemSlowDown();
            }
            if (item.item === "shield") {
              itemShield();
            }
            delete entities[key];
          }
        }

        item.hitbox = hitbox;
        item.renderer = (
          <Item x={item.x} y={item.y} item={item.item} hitbox={hitbox} />
        );
      }
    });

    let background = entities.background;
    background.score = score;
    background.renderer = (
      <Background width={width} height={height} score={score} />
    );

    return entities;
  };

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 100,
          top: 40,
          left: 10,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: hitbox ? "pink" : "white",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => setHitbox(!hitbox)}
        >
          <Text>HITBOX</Text>
        </TouchableOpacity>
      </View>

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
            x: width / 2 - CHARACTER_WIDTH / 2,
            y: FLOOR - CHARACTER_HEIGHT,
            hitbox: hitbox,
            shield: hasShield,
            renderer: (
              <Character
                x={width / 2 - CHARACTER_WIDTH / 2}
                y={FLOOR - CHARACTER_HEIGHT}
                hitbox={hitbox}
                shield={hasShield}
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

const Character = ({
  x,
  y,
  hitbox,
  shield,
}: {
  x: number;
  y: number;
  hitbox: boolean;
  shield: boolean;
}) => {
  return (
    <View
      style={{
        width: hitbox ? CHARACTER_WIDTH - 2 : CHARACTER_WIDTH,
        height: hitbox ? CHARACTER_HEIGHT - 2 : CHARACTER_HEIGHT,
        position: "absolute",
        left: x,
        top: y,
        zIndex: 10,
        borderColor: "blue",
        borderWidth: hitbox ? 1 : 0,
      }}
    >
      <Image
        source={require("../assets/player.png")}
        style={{
          width: CHARACTER_WIDTH,
          height: CHARACTER_HEIGHT,
          position: "absolute",
          top: hitbox ? -1 : 0,
          left: hitbox ? -1 : 0,
        }}
      />
      <View
        style={{
          width: CHARACTER_HEIGHT + 8,
          height: CHARACTER_HEIGHT + 8,
          position: "absolute",
          backgroundColor: "rgba(200, 230, 255, 0.3)",
          borderColor: "white",
          borderWidth: 2,
          borderRadius: CHARACTER_HEIGHT / 2 + 4,
          left: -(CHARACTER_HEIGHT - CHARACTER_WIDTH) / 2 - 4,
          top: -4,
          opacity: shield ? 1 : 0,
        }}
      />
    </View>
  );
};

const Apple = ({ x, y, hitbox }: { x: number; y: number; hitbox: boolean }) => {
  return (
    <View
      style={{
        width: hitbox ? APPLE_SIZE - 2 : APPLE_SIZE,
        height: hitbox ? APPLE_SIZE - 2 : APPLE_SIZE,
        position: "absolute",
        left: x,
        top: y,
        zIndex: 11,
        borderColor: "red",
        borderWidth: hitbox ? 1 : 0,
        borderRadius: APPLE_SIZE,
      }}
    >
      <Image
        source={require("../assets/apple.png")}
        style={{
          width: APPLE_SIZE,
          height: APPLE_SIZE,
          position: "absolute",
          top: hitbox ? -1 : 0,
          left: hitbox ? -1 : 0,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

type ItemType = "bomb" | "boost" | "shield" | "slowdown";
const itemImage = {
  bomb: require("../assets/bomb.png"),
  boost: require("../assets/boost.png"),
  shield: require("../assets/shield.png"),
  slowdown: require("../assets/slowdown.png"),
};

const Item = ({
  x,
  y,
  item,
  hitbox,
}: {
  x: number;
  y: number;
  item: ItemType;
  hitbox: boolean;
}) => {
  const image = itemImage[item];
  return (
    <View
      style={{
        width: hitbox ? APPLE_SIZE - 2 : APPLE_SIZE,
        height: hitbox ? APPLE_SIZE - 2 : APPLE_SIZE,
        position: "absolute",
        left: x,
        top: y,
        zIndex: 11,
        borderColor: "blue",
        borderWidth: hitbox ? 1 : 0,
        borderRadius: APPLE_SIZE,
      }}
    >
      <Image
        source={image}
        style={{
          width: APPLE_SIZE,
          height: APPLE_SIZE,
          position: "absolute",
          top: hitbox ? -1 : 0,
          left: hitbox ? -1 : 0,
        }}
        resizeMode="contain"
      />
    </View>
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 50,
          color: "white",
          fontWeight: 700,
          marginBottom: height / 3,
        }}
      >
        {score}
      </Text>
    </View>
  );
};
