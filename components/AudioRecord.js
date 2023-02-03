import * as React from 'react';
import { View, Button, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';

export default function AudioRecorder() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = React.useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound,
      duration: getDurationFormatted(status.durationMillis),
      file: await recording.getURI()
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
      console.error('Uri is not defined');
      return;
    }
  
    console.log('Loading Sound');
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({
        uri: file,
      });
      setSound(sound);
      console.log('Sound Loaded');
      console.log('Playing Sound');
      console.log(await sound.playAsync(),"TESEsedfsadfsdfsdfsdfsdfsdfsdfsdfsdf")
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
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Reset Recordings" onPress={resetRecordings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 300,
    fontSize: 24,
    color: "black",
  }
});