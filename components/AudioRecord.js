import { View, Text, StyleSheet } from 'react-native';

export default function AudioRecord() {
  return (
    <View>
      <Text style={stylestext.Text}>Welcome to Audio</Text>
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

