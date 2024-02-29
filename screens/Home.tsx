import React from "react";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

// const Emoji = require('../assets/hugging_emoji.png');

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
      <View style={styles.content}>
        {/* <Image source={Emoji} style={{ width: 240, height: 240, marginBottom: 20 }} /> */}
        <Text style={styles.title}>Need A Hug?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonLight]} onPress={() => { }}>
            <Text style={styles.buttonText}>Yes!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonDark]} onPress={() => { }}>
            <Text style={styles.buttonText}>Send One Instead.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    marginHorizontal: 20,
    flexDirection: 'column',
  },

  title: {
    color: colors.text,
    fontSize: 60,
    fontWeight: "900",
    textAlign: "center",
  },

  buttonContainer: {
    marginTop: 48,
    gap: 12
  },

  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonDark: {
    backgroundColor: colors.secondary,
    color: colors.text
  },

  buttonLight: {
    backgroundColor: colors.lightSecondary,
    color: colors.lightText
  },

  buttonText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18
  },
});