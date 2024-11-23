import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from "expo-router";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams } from "expo-router";

export default function CameraPicture() {
  const [facing, setFacing] = useState<any>("back");
  const [image, setPhoto] = useState<string>("");
  const { screen, dataUser } = useLocalSearchParams() as {
    screen: string;
    dataUser: any;
  };
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const navegation: any = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current:any) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const savedUri = await saveImage(photo?.uri);
      setPhoto(savedUri);
      if (screen == "newContact") {
        navegation.navigate(`newContact`, { uri: savedUri });
      } else {
        navegation.navigate(`editContact`, {
          imageUri: savedUri,
          key: dataUser,
        });
      }
    }
  };

  const saveImage = async (uri: string) => {
    const date = new Date();
    const fileUri = FileSystem.documentDirectory + `myImage_${date}.jpg`;
    await FileSystem.moveAsync({
      from: uri,
      to: fileUri,
    });
    return fileUri;
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "blue",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
