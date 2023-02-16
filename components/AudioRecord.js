import * as React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Shadow } from "react-native-shadow-2";
import Lottie from "lottie-react-native";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
const { width, height } = Dimensions.get("window");

export default function AudioRecorder() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = React.useState();
  const [sendSound, setSendSound] = useState(null);
  const [recordingSound, setRecordingSound] = useState(null);
  const [recordingFinished, setRecordingFinished] = React.useState(false);

  async function startRecording() {
    await playRecordingSound();
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
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    setRecording(false);
    setRecordingFinished(true);
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
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  // This is a funtion to playback the sound that you recorded
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

  // This is all the sound on the app like the send sound and recording sound animations
  const loadSendSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/sendsound.wav")
      );
      setSendSound(sound);
    } catch (error) {
      console.log("Error loading send sound:", error);
    }
  };

  const loadRecordingSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/recordingsound.mp3")
      );
      setRecordingSound(sound);
    } catch (error) {
      console.log("Error loading recording sound:", error);
    }
  };

  const playSendSound = async () => {
    if (sendSound) {
      await sendSound.playAsync();
    }
  };

  const playRecordingSound = async () => {
    if (recordingSound) {
      const status = await recordingSound.getStatusAsync();
      if (status.isLoaded) {
        await recordingSound.setPositionAsync(0);
        await recordingSound.playAsync();
        await new Promise((resolve) => {
          recordingSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              recordingSound.setOnPlaybackStatusUpdate(null);
              resolve();
            }
          });
        });
      }
    }
  };

  useEffect(() => {
    loadSendSound();
    loadRecordingSound();
  }, []);

  async function resetRecordings() {
    setRecordings([]);
    setDuration(0);
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
        <View style={styles.buttonContainer}>
          <Lottie
            style={styles.buttonAnimation}
            source={require("../assets/lottie/recordingeffect.json")}
            autoPlay
            loop={true}
          />
          <Shadow
            distance={5}
            offset={[0, 5]}
            startColor={"#00000010"}
            endColor={"#0000"}
          >
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: recording ? "#5DA2DF" : "#5DA2DF" },
              ]}
              onPress={stopRecording}
            >
              <FontAwesome name="microphone" size={108} color="white" />
            </TouchableOpacity>
          </Shadow>
        </View>
      ) : recordingFinished ? (
        <Shadow
          distance={5}
          offset={[0, 5]}
          startColor={"#00000010"}
          endColor={"#0000"}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5DA2DF" }]}
            onPress={playSendSound}
          >
            <View style={[styles.animationContainer]}>
              <Lottie
                style={styles.animation}
                source={require("../assets/lottie/send.json")}
                autoPlay
                loop={false}
              />
            </View>
          </TouchableOpacity>
        </Shadow>
      ) : (
        <Shadow
          distance={5}
          offset={[0, 5]}
          startColor={"#00000010"}
          endColor={"#0000"}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5DA2DF" }]}
            onPress={startRecording}
          >
            <FontAwesome name="microphone" size={108} color="white" />
          </TouchableOpacity>
        </Shadow>
      )}
      <Text style={styles.text}>
        {recording
          ? "Avsluta"
          : recordingFinished
            ? "Skicka in"
            : "Starta inspelning"}
      </Text>

      {recording ? <Text style={styles.timer}>{durationDisplay}</Text> : null}




      {recordingFinished ? (
        <>
          <View>
            <TouchableOpacity
              style={styles.buttonrestart}
              onPress={resetRecordings}
            >
              <MaterialCommunityIcons name="restart" size={52} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.restartbuttontext}>Gör om</Text>
        </>
      ) : null}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: width,
    height: height * 0.8,
    paddingTop: "20%",
  },
  animationContainer: {
    aspectRatio: 1,
    width: width * 0.7,
    borderRadius: width * 0.60,
  },
  animation: {
    zIndex: 4,
  },

  buttonAnimationContainer: {
    width: width * 1,
    height: height * 0.5,
    borderRadius: width * 0.2,
    position: 'absolute',
    backgroundColor: 'grey',

    justifyContent: "center",
    alignItems: "center",

  },
  buttonAnimation: {
    position: "absolute",
    width: width * 1,
    height: width * 1,
  },
  buttonContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.35,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "TTCommons-Light",
    textAlign: "center",
    fontSize: width * 0.1,
    paddingTop: "10%",
  },
  timer: {
    marginTop: "5%",
    fontSize: 36,
    fontWeight: "bold",
  },
  buttonrestart: {
    backgroundColor: "#FFD21D",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  buttonText: {
    fontWeight: "bold",
  },
  restartbuttontext: {
    fontSize: 30,
    fontFamily: "TTCommons-Light",
  },
});
