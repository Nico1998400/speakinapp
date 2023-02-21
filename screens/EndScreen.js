import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Dimensions } from 'react-native';
import { Shadow } from "react-native-shadow-2";
import { MaterialCommunityIcons} from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

export default function EndScreen() {
  return (
    <View style={styles.container}>
      <View><Text style={styles.uppertext}>Tack för din medverkan!</Text>
      </View>
      
      <Shadow
          distance={5}
          offset={[0, 5]}
          startColor={"#00000010"}
          endColor={"#0000"}
        >
          <View
            style={[styles.button, { backgroundColor: "#3AD478" }]}
          >
            <MaterialCommunityIcons name="check-bold" size={76} color="white" />
          </View>
        </Shadow>
        <Image style={styles.logoimage} source={require('../assets/image/logo.png')} />
      
    </View>
  )
}


const styles = StyleSheet.create({
container: {
  width: width,
  height: height,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ECEEF3',
},
uppertext: {
  fontFamily: 'TTCommons-Light',
    fontSize: width * 0.07,
    marginBottom: "15%",

},
button: {
  width: width * 0.6,
  height: width * 0.6,
  borderRadius: width * 0.35,
  justifyContent: "center",
  alignItems: "center",
 
},

logoimage: {
  marginTop: "25%",
  height: height * 0.043,
  width: width * 0.4,
  
}

});