import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons'; 

export default function ReadText(){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);
// https://mocki.io/v1/3158625d-eeb4-45f9-ab43-9e5751b99006 Spanish
// https://mocki.io/v1/698e9048-826e-43b1-b00a-2ccf4aa03baf Sve
// https://mocki.io/v1/380722bc-b8a6-441b-bbf8-d0ad1f343b70 Eng
// https://mocki.io/v1/34b91116-1dbf-4456-9f7e-b41ae8aeecbf thai
  useEffect(() => {
    fetch('https://mocki.io/v1/34b91116-1dbf-4456-9f7e-b41ae8aeecbf')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const speak = () => {
    data.map((item, index)=>
    
     Speech.speak(item.question, {
      language: item.language
      
     }
     )
    )
  }

  return (
    <View>

     <View style={{ flex: 1, padding: 24 }}>

    {isLoading ? <Text>Loading...</Text> : 
    ( <View>
      <TouchableWithoutFeedback onPress={speak}>
              <AntDesign name='sound' style={stylestext.touchablesound}/>
         </TouchableWithoutFeedback>
        {data.map((item, index) => (
        <View key={index}>
          <Text style={stylestext.Text}>{item.question}</Text>
        </View>


        ))}
        
      </View>
    )}

   </View>
  </View>
  );
};

const stylestext = StyleSheet.create({
            baseText: {
              fontFamily: 'Cochin',
            },
            touchablesound:{
            paddingTop: 75,
            paddingLeft: 250,
            fontSize: 24,
            color:"black",
      
            },

            Text: {
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingHorizontal: 15,
            },
          });