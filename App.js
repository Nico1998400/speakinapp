import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import SpeakinScreen from './screens/SpeakinScreen';
import HomeScreen from './screens/HomeScreen';
import EndScreen from './screens/EndScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();
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
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initalRouteName='homescreen'>
          <Stack.Screen options={{headerShown: false}} name='homescreen' component={HomeScreen}/>
          <Stack.Screen options={{headerShown: false}} name='speakinscreen' component={SpeakinScreen}/>
          <Stack.Screen options={{headerShown: false}} name='endscreen' component={EndScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'TTCommons-Light',
  },
});

export default App;