import React from "react";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import Modal from "react-native-modal";

export default function SendHug(props: any) {
  return (
    <Modal
      isVisible={props.isVisible}
      style={{ margin: 0 }}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <View style={styles.topContainer}>
            <TouchableOpacity onPress={props.cancel}>
              <Ionicons name="arrow-back-circle" size={48} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>I Want To Send A Hug!</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
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
    height: "100%",
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: 'column',
  },

  topContainer: {
    height: "7.5%",
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomContainer: {
    height: "92.5%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 60,
    fontWeight: "900",
    textAlign: "center",
  },
});