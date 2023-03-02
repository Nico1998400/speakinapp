import React, { useState } from "react";
import { ScrollView, StyleSheet} from "react-native";
import NumberInput from "../components/NumberInput";
import NumberDial from "../components/NumberDial";

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleNumberPress = (number) => {
    if (inputValue.length < 6) {
      setInputValue((prevValue) => prevValue + number);
    }
  };

  const handleErasePress = () => {
    if (inputValue.length > 0) {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const handleValueChange = (text) => {
    const maskedValue = text.replace(/[^0-9]/g, "");
    setInputValue(maskedValue);
  };

  return (
    <ScrollView style={styles.speakincontainer}>
      <NumberInput value={inputValue} onChangeText={handleValueChange} />
      <NumberDial onNumberPress={handleNumberPress} onErasePress={handleErasePress}  inputValue={inputValue} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  speakincontainer: {
    backgroundColor: '#ECEEF3'
  },
});