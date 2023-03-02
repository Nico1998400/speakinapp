import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2';
import { Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";


const { width, height } = Dimensions.get('window');

export default function ReadText() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const nav = useNavigation();
  const route = useRoute();
  const { inputValue } = route.params;

  // https://mocki.io/v1/3158625d-eeb4-45f9-ab43-9e5751b99006 Spanish
  // https://mocki.io/v1/698e9048-826e-43b1-b00a-2ccf4aa03baf Sve
  // https://mocki.io/v1/380722bc-b8a6-441b-bbf8-d0ad1f343b70 Eng Indian
  // https://mocki.io/v1/34b91116-1dbf-4456-9f7e-b41ae8aeecbf thai
  // https://mocki.io/v1/c8e7ee9e-afad-4fda-b18f-0e93b07460fb Eng
  useEffect(() => {
    console.log(inputValue, "This is the inputvalue")
    fetch(`http://10.0.2.2:8080/question/${inputValue}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "This is my fetching"); // Log the JSON data to see what you're getting back
        setData(json);
        console.log(data,"this is my data")
        
      })
      .catch((error,) => console.error(error))
      .finally(() => setLoading(false) );
        
  }, []);

  useEffect(() => {
    console.log('data has changed:', data);
  }, [data]);

 
  const speak = () => {
    data.map((item, index) =>
      Speech.speak(item.question, {
        language: item.language,
      }
      )
    )
  }

  return (
    <>
      <Shadow>
        <View style={stylestext.container}>
        {isLoading ? <Text>Loading...</Text> : (
            <View style={stylestext.questioncontainer}>
              {data && (
                <View>
                  <Text style={stylestext.questionText}>{data.question}</Text>
                </View>
              )}
            </View>
          )}
          <TouchableWithoutFeedback onPress={speak}>
            <View style={stylestext.speakericonouter}>
              <MaterialIcons name="volume-up" style={stylestext.speakericon} size={38} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Shadow>
    </>
  );
};

const stylestext = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
    backgroundColor: 'white',
  },
  questionText: {
    fontFamily: 'TTCommons-Light',
    fontSize: width * 0.09,
  },
  speakericonouter: {
    borderRadius: 30,
    backgroundColor: '#5DA2DF',
    position: 'absolute',
    top: height * 0.215,
    right: '10%',
  },
  speakericon: {
    padding: 10,
    color: 'white'
  },
});