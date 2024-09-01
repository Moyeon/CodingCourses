import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Here is index</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "gold",
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
        onPress={() => router.push("/click")}
      >
        <Text>Go to click page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "purple",
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
        onPress={() => router.push("/todo")}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Go to todo page
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "lightblue",
          padding: 10,
          borderRadius: 10,
          margin: 10,
        }}
        onPress={() => router.push("/images")}
      >
        <Text
          style={{
            color: "black",
          }}
        >
          Go to image and sound practice page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
