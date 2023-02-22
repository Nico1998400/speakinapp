import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function NumberInput({ value, onChangeText }) {

  const [dots, setDots] = useState(
    Array(6)
      .fill()
      .map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { opacity: i < value.length ? 0 : 1 }]}
        />
      ))
  );

  useEffect(() => {
    const newDots = Array(6)
      .fill()
      .map((_, i) => (
        <View
          key={i}
          style={[styles.dot, { opacity: i < value.length ? 0 : 1 }]}
        />
      ));
    setDots(newDots);
  }, [value]);

  const handleValueChange = (text) => {
    const maskedValue = text.replace(/[^0-9]/g, "").slice(0, 6);
    onChangeText(maskedValue);
  };



  return (
    <>
      <Shadow>
        <View style={styles.topcontainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={value}
              keyboardType="numeric"
              onChangeText={handleValueChange}

            />
            <View style={styles.dotsContainer}>
              {dots}
            </View>
          </View>
        </View>

      </Shadow>
    </>
  );
}

const styles = StyleSheet.create({
  topcontainer: {
    height: height * 0.25,
    width: width,
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',

  },
  dotsContainer: {
    flexDirection: "row",
    position: 'absolute',
    left: width * 0.06,
  },
  input: {
    height: height * 0.1,
    width: width * 0.6,
    fontSize: 32,
    letterSpacing: 16,
    left: width * 0.06,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: width * 0.5,
    backgroundColor: "#000",
    marginHorizontal: 9,
  },
});
