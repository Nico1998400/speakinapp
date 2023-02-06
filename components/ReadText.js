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
  }

  return (
    <View style={stylestext.questioncontainer}>
      <Text style={stylestext.questionText}>Hur nöjd är du med dagens gynekolog undersökning?</Text>
      <TouchableWithoutFeedback onPress={speak}>
        <AntDesign name='sound' style={stylestext.speakerIcon} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const stylestext = StyleSheet.create({
  questioncontainer: {
    padding: 26,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 15,
    marginTop:50,
   
  },
  questionText: {
    fontSize: 30,
    paddingHorizontal: 15,
  },
  speakerIcon: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 15,
  },
});