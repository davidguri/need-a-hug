import React from "react";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { colors } from '../constants/colors';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="dark-content"
      />
      <Text style={styles.title}>Need A Hug?</Text>
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

  title: {
    color: colors.text,
    fontSize: 56,
    fontWeight: "900"
  }
});