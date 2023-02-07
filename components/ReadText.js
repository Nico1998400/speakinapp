import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'


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
            <MaterialIcons name="volume-up" style={stylestext.speakerIcon} />
          </TouchableWithoutFeedback>
        </View>
      )}
      <View style={stylestext.borderlineshadow}><Text></Text></View>
    </View>
  );
};

const stylestext = StyleSheet.create({
  questioncontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingTop: '18%',
  },
  questionText: {
    fontSize: 36,
  },
  speakerIcon: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 30,
    borderRadius: 25,  // add this line to make the icon round
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  borderlineshadow: {
    marginTop: '10%',
    height: 1,
    width: "250%",
    backgroundColor: "black",
  }
});