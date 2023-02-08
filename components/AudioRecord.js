import * as React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
    setRecordingFinished(false);
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const [duration, setDuration] = React.useState(0);
  let interval;

  React.useEffect(() => {
    if (recording) {
      interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1000);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [recording]);

  const durationDisplay = getDurationFormatted(duration);

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
          <FontAwesome name="microphone" size={108} color="white" />
        </TouchableOpacity>
      ) : recordingFinished ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3AD478" }]}
          onPress={playSound}
        >
          <Entypo name="check" size={108} color="white" />
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
          <FontAwesome name="microphone" size={108} color="brown" />
        </TouchableOpacity>
      )}
      <Text style={styles.text}>
        {recording
          ? "Avsluta"
          : recordingFinished
          ? "Skicka in"
          : "Starta inspelning"}
      </Text>
      <View
        style={{
          marginTop: "5%",
          height: 1,
          width: "250%",
          backgroundColor: "black",
        }}
      >
        <Text></Text>
      </View>
      {recording ? <Text style={styles.timer}>{durationDisplay}</Text> : null}

      {recordingFinished ? (
        <View>
          <TouchableOpacity style={styles.buttonrestart} onPress={resetRecordings}>
            <MaterialCommunityIcons name="restart" size={42} color="black" />
          </TouchableOpacity>
          <Text style={styles.restartbuttontext}>Gör om</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  button: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
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
  timer: {
    marginTop: "5%",
    fontSize: 36,
    fontWeight: "bold",
  },
  buttonrestart: {
    backgroundColor: "#FFD21D",
    borderRadius: 40,
    padding: 15,
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  buttonText: {
    fontWeight: "bold",
  },
  restartbuttontext: {
    fontSize: 20,
  },
});
