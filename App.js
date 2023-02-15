import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import SpeakinScreen from './screens/SpeakinScreen';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'TTCommons-Regular': require('./assets/fonts/TTCommons-Regular.ttf'),
      'TTCommons-Bold': require('./assets/fonts/TTCommons-Bold.ttf'),
      'TTCommons-Light': require('./assets/fonts/TTCommons-Light.ttf'),
    }).then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <SpeakinScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'TTCommons-Light',
  },
});

export default App;