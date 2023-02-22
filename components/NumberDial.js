import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function NumberDial({ onNumberPress, onErasePress  }) {
  const nav = useNavigation();

  const handleNumberPress = (number) => {
    onNumberPress(number);
  };

  const handleErasePress = () => {
    onErasePress();
  };

  return (
    <>
      <View style={styles.bottomcontainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("1")}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("2")}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("3")}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("4")}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("5")}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("6")}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("7")}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("8")}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("9")}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <View
            style={styles.hiddenbutton}>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNumberPress("0")}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.erasebutton}
            onPress={handleErasePress}
          >
             <MaterialCommunityIcons
                name="arrow-left-thin"
                size={50}
                color="black"
              />
          </TouchableOpacity>
          </View>
        <TouchableOpacity onPress={() => nav.navigate("speakinscreen")} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Nästa</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomcontainer: {
    height: height * 0.8,
    width: width,
    alignItems: "center",
    paddingTop: '10%',
  },
  eraseButton: {

  },
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.35,
    margin: '3%',
    height: width * 0.2,
    width: width * 0.2,
  },
  hiddenbutton: {
    backgroundColor: '#ECEEF3',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.5,
    margin: '3%',
    height: width * 0.2,
    width: width * 0.2,
  },
  erasebutton: {
    backgroundColor: '#ECEEF3',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.5,
    margin: '3%',
    height: width * 0.2,
    width: width * 0.2,
  },
  buttonText: {
    color: "black",
    fontSize: width * 0.08,
  },

  nextButton: {
    backgroundColor: "#5DA2DF",
    padding: height * 0.02,
    borderRadius: width * 0.35,
    marginTop: '10%',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  nextButtonText: {
    fontSize: width * 0.05,
    color: "white",
    textAlign: 'center',
  },
});
