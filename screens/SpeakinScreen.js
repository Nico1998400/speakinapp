import { View } from 'react-native';
import ReadText from '../components/ReadText';
import AudioRecord from '../components/AudioRecord';

export default function SpeakingScreen() {
  return (

    <View>
       
         <ReadText/>
        <AudioRecord />
        
    </View>

  );
};

