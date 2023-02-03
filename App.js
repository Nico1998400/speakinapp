import { View, StyleSheet } from 'react-native';
import SpeakinScreen from './screens/SpeakinScreen';

export default function App() {
  return (

    <View style={styles1.container}>
      <SpeakinScreen/>
    </View>

  );
};

const styles1 = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
