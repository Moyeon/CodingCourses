import { Dimensions, Text, View } from "react-native";
import {
  GameEngine,
  GameEngineUpdateEventOptionType,
} from "react-native-game-engine";

interface Entities {
  [key: string]: any;
}

const { width, height } = Dimensions.get("window");

export default function Index() {
  const updateGame = (
    entities: Entities,
    { touches, time, dispatch }: GameEngineUpdateEventOptionType
  ) => {
    let character = entities.character;

    // TODO: move the character with touch
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GameEngine
        systems={[updateGame]}
        entities={{
          character: { x: 100, y: 300, renderer: <Character /> },
        }}
      ></GameEngine>
    </View>
  );
}

const Character = ({ x, y }: { x: number; y: number }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: "blue",
        position: "absolute",
        left: x,
        top: y,
      }}
    ></View>
  );
};
