import { View, StyleSheet } from 'react-native';
import ReadText from './components/ReadText';
import AudioRecord from './components/AudioRecord';

export default function App() {
  return (

    <View style={styles1.container}>
      <AudioRecord />
      <ReadText />
    </View>

  );
};

const styles1 = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
