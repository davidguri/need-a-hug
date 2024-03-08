import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { colors } from '../constants/colors';

// const Emoji = require('../assets/hugging_emoji.png');

import RequestHug from "../components/modals/RequestHug";
import SendHug from "../components/modals/SendHug";

import Button from "../components/ui/Button";

export default function Home() {

  const [isRequestVisible, setIsRequestVisible] = React.useState(false);
  const [isSendVisible, setIsSendVisible] = React.useState(false);

  const toggleRequestVisible = () => setIsRequestVisible(!isRequestVisible);
  const toggleSendVisible = () => setIsSendVisible(!isSendVisible);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          {/* <Image source={Emoji} style={{ width: 240, height: 240, marginBottom: 20 }} /> */}
          <Text style={styles.title}>Need A Hug<Text style={{ color: colors.accent }}>?</Text></Text>
          <View style={styles.buttonContainer}>
            <Button light={true} text="Yes!" onPress={toggleRequestVisible} />
            <Button light={false} text="Send One Instead" onPress={toggleSendVisible} />
          </View>
        </View>
      </SafeAreaView>
      <RequestHug isVisible={isRequestVisible} cancel={toggleRequestVisible} />
      <SendHug isVisible={isSendVisible} cancel={toggleSendVisible} />
    </>
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