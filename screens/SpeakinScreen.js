import { View, StyleSheet} from 'react-native';
import ReadText from '../components/ReadText';
import AudioRecord from '../components/AudioRecord';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export default function SpeakingScreen() {
  return (

    <View style={styles.speakincontainer}>
         <ReadText/>
         <AudioRecord/>
    </View>

  );
};

const styles = StyleSheet.create({
  speakincontainer: {
    backgroundColor: '#ECEEF3'
    
  },
})



