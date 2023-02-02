import {   View,  StyleSheet } from 'react-native';
import ReadText from './components/ReadText';

export default function App() {
  return  (

    <View style={styles1.container}>
     <ReadText/>
    </View>

);
          };


          const styles1 = StyleSheet.create({
            container: {
              flex: 1,
              backgroundColor: '#ffff',
              alignItems: 'center',
              justifyContent: 'center',
            },
          });
