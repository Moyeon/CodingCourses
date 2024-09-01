import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ClickerPage() {
  const [count, setCount] = useState(0);

  function addCount () {
    setCount(count + 1);
  }

  function subCount () {
    setCount(count - 1);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "lightblue",
          padding: 20,
          borderRadius: 20,
        }}
        onPress={addCount}>
        <Text>+</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "lightblue",
          padding: 20,
          borderRadius: 20,
        }}
        onPress={subCount}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
}
