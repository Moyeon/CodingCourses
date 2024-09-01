import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export default function ImageSound() {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedAudio, setSelectedAudio] = useState(new Audio.Sound());

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted == false) {
      alert("Permission denied");
    }

    const image = await ImagePicker.launchImageLibraryAsync();

    if (image.canceled == false) {
      setSelectedImage(image.assets[0].uri);
    }
  }

  async function pickSound() {
    const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });

    if (result.canceled == false) {
      var sound = new Audio.Sound();
      await sound.loadAsync({ uri: result.assets[0].uri });
      setSelectedAudio(sound);
    }
  }

  useEffect(() => {
    const soundObject = new Audio.Sound();
    soundObject.loadAsync(require("./assets/kitten.mp3"));
    setSelectedAudio(soundObject);
  }, []);

  async function playKittenSound() {
    await selectedAudio.playAsync();
  }

  return (
    <View>
      <TouchableOpacity onPress={playKittenSound}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("./assets/kitten.jpg")
          }
          style={{ width: 200, height: 200 }}
        ></Image>
      </TouchableOpacity>
      <Button onPress={pickImage} title="Load Image" />
      <Button onPress={pickSound} title="Load Audio" />
    </View>
  );
}
