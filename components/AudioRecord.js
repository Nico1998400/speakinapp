
import * as React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import {
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Shadow } from 'react-native-shadow-2';
import Lottie from 'lottie-react-native';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');



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
         
         <View style={styles.animationContainer}>
  <Lottie
    style={styles.animation}
       
    
    source={require('../assets/lottie/sendanimation.json')}
    autoPlay
    loop={false}
  />
</View>
        

          <Entypo name="check" size={108} color="white" />
        
        
        
        </TouchableOpacity>
        
      ) : (
        <Shadow distance={5} offset={[0, 5]} startColor={'#00000010'} endColor={'#0000'}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#5DA2DF" },
            ]}
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
            <TouchableOpacity style={styles.buttonrestart} onPress={resetRecordings}>
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
    height: height * 0.75,
    paddingTop: '10%',
  },
  animationContainer: {
   aspectRatio: 4,
    width: width * 9,
    transform: [
      { translateY: 85 }
    ]
  },
  animation: {
    zIndex: 4,
    transform: [
      { translateX: -width * 0.01 },
     
    ],
  },
  
  button: {
  
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    justifyContent: "center",
    alignItems: "center",
   
  },
  text: {
    fontFamily: 'TTCommons-Bold',
    textAlign: "center",
    fontSize: width * 0.1,
    paddingTop: '10%',
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
    fontFamily: 'TTCommons-Regular'
  },
});
