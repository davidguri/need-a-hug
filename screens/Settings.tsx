import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { colors } from '../constants/colors';

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to the settings page yung blud</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    color: colors.lightText,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 64,
    fontWeight: "900"
  }
});