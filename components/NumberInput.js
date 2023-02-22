import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function NumberInput({ value }) {
  return (
    <>
      <Shadow>
        <View style={styles.topcontainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={value}
              keyboardType="numeric"
            />
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
  input: {
    width: width * 0.5,
    height: height * 0.05,
  },
});
