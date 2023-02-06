import * as React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export default function AudioRecorder() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = React.useState();
  const [recordingFinished, setRecordingFinished] = React.useState(false);

  async function startRecording() {
    setRecording(true);
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(false);
    setRecordingFinished(true);
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: await recording.getURI(),
    });
    console.log(updatedRecordings);
    setRecordings(updatedRecordings);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  async function playSound() {
    let file;
    recordings.map((item, index) => {
      file = item.file;
    });

    if (!file) {
      console.error("Uri is not defined");
      return;
    }

    console.log("Loading Sound");
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({
        uri: file,
      });
      setSound(sound);
      console.log("Sound Loaded");
      console.log("Playing Sound");
      console.log(
        await sound.playAsync(),
        "TESEsedfsadfsdfsdfsdfsdfsdfsdfsdfsdf"
      );
      await sound.setVolumeAsync(1);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
  }

  function resetRecordings() {
    setRecordings([]);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {recording ? (
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: recording ? "#5DA2DF" : "#5DA2DF" },
          ]}
          onPress={stopRecording}
        >
          <FontAwesome name="microphone" size={70} color="white" />
        </TouchableOpacity>
      ) : recordingFinished ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3AD478" }]}
          onPress={playSound}
        >
          <Entypo name="check" size={70} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadowouter,
            { backgroundColor: "#5DA2DF" },
          ]}
          onPress={startRecording}
        >
          <FontAwesome name="microphone" size={70} color="brown" />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>
        {recording
          ? "Avsluta"
          : recordingFinished
          ? "Skicka in"
          : "Starta inspelning"}
      </Text>
      <View style={{marginTop:50 ,height: 1, width: "250%",backgroundColor: "black",}}><Text></Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  button: {
    width: 250,
    height: 250,
    borderRadius: 130,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    marginTop: 40,
  },
  shadowouter: {
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,

    elevation: 36,
  },
});
