import * as React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
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
  const nav = useNavigation();
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = React.useState();
  const [sendSound, setSendSound] = React.useState(null);
  const [recordingSound, setRecordingSound] = useState(null);
  const [recordingFinished, setRecordingFinished] = React.useState(false);
  const [recordingLoading, recordingSetLoading] = React.useState(false);

  const recordingOptions = {
    android: {
      extension: ".wav",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

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
      const { recording } = await Audio.Recording.createAsync(recordingOptions);
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

  async function playSendSound() {
    recordingSetLoading(true);
    if (sendSound) {
      await sendSound.playAsync();
    }
  }

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
    recordingSetLoading(false);
    setRecordingFinished(false);
  }

  async function cancelUploading() {
    recordingSetLoading(false);
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

  const uploadRecording = async () => {
    try {
      const file = recordings[0].file;
      const formData = new FormData();
      formData.append("audioFile", {
        uri: file,
        type: "audio/wav",
        name: "recording.wav",
      });
      const response = await fetch("http://10.0.2.2:8080/audio/post", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Use multipart/form-data for file upload
        },
      });
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      ) : recordingLoading ? (
        
        <Shadow
          distance={5}
          offset={[0, 5]}
          startColor={"#00000010"}
          endColor={"#0000"}
        >
          <TouchableOpacity
           onPress={() => nav.navigate("endscreen")}
            style={[styles.button, { backgroundColor: "#5DA2DF" }]}
          >
            <FontAwesome name="send" size={70} color="white" />
            <Lottie style={styles.loadinglottie}
            source={require("../assets/lottie/load.json")}
            autoPlay
            loop={true}
          />
          </TouchableOpacity>
        </Shadow>
        
      ) : recordingFinished ? (
        <Shadow
          distance={5}
          offset={[0, 5]}
          startColor={"#00000010"}
          endColor={"#0000"}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#5DA2DF" }]}
            onPress={uploadRecording}
          >
            <MaterialCommunityIcons name="send" size={74} color="white" />
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
        {!recordingLoading &&
          (recording
            ? "Avsluta"
            : recordingFinished
            ? "Skicka in"
            : "Starta inspelning")}
        {recordingLoading && "Loading..."}
      </Text>

      {recording ? <Text style={styles.timer}>{durationDisplay}</Text> : null}

      {!recordingLoading && recordingFinished ? (
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

      {recordingLoading ? (
        <>
          <View>
            <TouchableOpacity
              style={styles.buttoncancel}
              onPress={cancelUploading}
            >
              <MaterialCommunityIcons name="close" size={52} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.restartbuttontext}>Avbryt</Text>
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
    borderRadius: width * 0.6,
  },
  animation: {
    zIndex: 4,
  },

  buttonAnimationContainer: {
    width: width * 1,
    height: height * 0.5,
    borderRadius: width * 0.2,
    position: "absolute",
    backgroundColor: "grey",

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
  buttoncancel: {
    backgroundColor: "#ff4747",
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
  loadinglottie: {
    position: "absolute",
    width: width * 0.65,
    height: height * 0.65,
  }
});
