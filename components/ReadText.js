import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

export default function ReadText() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // https://mocki.io/v1/3158625d-eeb4-45f9-ab43-9e5751b99006 Spanish
  // https://mocki.io/v1/698e9048-826e-43b1-b00a-2ccf4aa03baf Sve
  // https://mocki.io/v1/380722bc-b8a6-441b-bbf8-d0ad1f343b70 Eng
  // https://mocki.io/v1/34b91116-1dbf-4456-9f7e-b41ae8aeecbf thai
  useEffect(() => {
    fetch('https://mocki.io/v1/380722bc-b8a6-441b-bbf8-d0ad1f343b70')
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
    <View>
    {isLoading ? <Text>Loading...</Text> : (
    <View style={stylestext.questioncontainer}>

      {data.map((item, index) => (
              <View key={index}>
                <Text style={stylestext.questionText}>{item.question}</Text>
              </View>
            ))}
      <TouchableWithoutFeedback onPress={speak}>
        <AntDesign name='sound' style={stylestext.speakerIcon} />
      </TouchableWithoutFeedback>
    </View>
       )}

       </View>
  );
};

const stylestext = StyleSheet.create({
  questioncontainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingTop: '18%',
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
  },
  questionText: {
    fontSize: 36,
  },
  speakerIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});