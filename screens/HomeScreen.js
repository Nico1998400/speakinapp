import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Pressable, Icon } from "react-native";
import { Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleNumberPress = (number) => {
    setInputValue(inputValue + number);
  };

  const handleErasePress = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
        />
      </View>

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
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNumberPress("0")}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        

         <View style={styles.eraseButtonContainer}>
    <Pressable style={styles.eraseButton} onPress={handleErasePress}>
      <MaterialCommunityIcons
        name="arrow-left-thin"
        size={30}
        color="black"
      />
    </Pressable>
  </View>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Nästa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECEEF3",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "grey",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  eraseButton: {
    padding: 5,
    borderRadius: 5,
  },

  buttonRow: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    marginRight: 25,
    marginBottom: 18,

    height: width * 0.2,
    width: width * 0.2,
  },
  buttonText: {
    color: "black",
    fontSize: 30,
  },

  nextButton: {
    backgroundColor: "#5DA2DF",
    padding: 20,
    borderRadius: 35,
    marginTop: 30,
  },
  nextButtonText: {
    color: "white",
  },
});
