import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="click" />
      <Stack.Screen name="todo" />
      <Stack.Screen name="images" />
    </Stack>
  );
}
