import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ReadText() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // https://mocki.io/v1/3158625d-eeb4-45f9-ab43-9e5751b99006 Spanish
  // https://mocki.io/v1/698e9048-826e-43b1-b00a-2ccf4aa03baf Sve
  // https://mocki.io/v1/380722bc-b8a6-441b-bbf8-d0ad1f343b70 Eng Indian
  // https://mocki.io/v1/34b91116-1dbf-4456-9f7e-b41ae8aeecbf thai
  // https://mocki.io/v1/c8e7ee9e-afad-4fda-b18f-0e93b07460fb Eng

  useEffect(() => {
    fetch('https://mocki.io/v1/c8e7ee9e-afad-4fda-b18f-0e93b07460fb')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const speak = () => {
    data.map((item, index) =>
      Speech.speak(item.question, {
        language: item.language,
      }
      )
    )
  }

  return (
    <Shadow>
    <View style={stylestext.container}>
      {isLoading ? <Text>Loading...</Text> : (
        <View style={stylestext.questioncontainer}>
          {data.map((item, index) => (
            <View key={index}>
              <Text style={stylestext.questionText}>{item.question}</Text>
            </View>
          ))}
          <Shadow>
            <TouchableWithoutFeedback style={stylestext.speakericonouter} onPress={speak}>
              <View>
              <MaterialIcons name="volume-up" style={stylestext.speakericon} size={38} />
              </View>
            </TouchableWithoutFeedback>
          </Shadow>
        </View>
      )}
    </View>
    </Shadow>
  );
};

const stylestext = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  questioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'TTCommons-Regular',
    fontSize: width * 0.1,
    paddingRight: '10%',
  },
  speakericonouter: {
    borderRadius: 30,
  },
  speakericon: {
    padding: 10,
  },
});