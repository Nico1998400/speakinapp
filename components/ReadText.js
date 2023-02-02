import React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, View, FlatList, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function ReadText(){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('https://mocki.io/v1/114bcd25-c115-4aac-a937-473cdffaacf3')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const speak = () => {
    data.map((item, index)=>
     Speech.speak(item.question)
  
    
    )
  }

  return (
    <View>


    <View style={{ flex: 1, padding: 24 }}>

    {isLoading ? <Text>Loading...</Text> : 
    ( <View>
        {data.map((item, index) => (
        <View key={index}>
          <Text style={stylestext.Text}>{item.question}</Text>
          <Button title='Press to Listen' onPress={speak}></Button>
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
            Text: {
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: '30%',
              paddingHorizontal: 15,
            },
          });