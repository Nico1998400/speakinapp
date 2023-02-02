import { View, StyleSheet, Button, Text } from 'react-native';
import * as React from 'react';
import { Audio } from 'expo-av';

export default function AudioRecord() {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

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
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMilis),
      file: recording.getURI()
    })

    setRecordings(updatedRecordings);

    function getDurationFormatted(millis) {
      const minutes = millis / 1000 / 60;
      const minutesDisplay = Math.floor(minutes);
      const seconds = Math.round((minutes - minutesDisplay) * 60);
      const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
      return `${minutesDisplay}:${secondsDisplay}`;
    }
  }

  return (
    <View style={stylestext.Text}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <View >
        {recordings.map((recordingLine, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
            <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylestext = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '100%',
    paddingHorizontal: 15,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  }
});

