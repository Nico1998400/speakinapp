import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import NumberInput from "../components/NumberInput";
import NumberDial from "../components/NumberDial";

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleNumberPress = (number) => {
    setInputValue((prevValue) => prevValue + number);
  };

  const handleErasePress = () => {
    setInputValue(inputValue.slice(0, -1));
  };

  return (
    <View style={styles.speakincontainer}>
      <NumberInput value={inputValue} />
      <NumberDial onNumberPress={handleNumberPress} onErasePress={handleErasePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  speakincontainer: {
    backgroundColor: '#ECEEF3'
  },
});