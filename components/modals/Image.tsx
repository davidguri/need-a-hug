import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { colors } from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import Modal from "react-native-modal";

export default function ImageModal(props: any) {
  return (
    <Modal
      isVisible={props.isVisible}
      style={{ margin: 0 }}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
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
            <Image
              source={{ uri: props.url }}
              style={styles.userDetailsPhoto}
              onError={(error) => console.error('Image load error:', error)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(1, 4, 19)",
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

  userDetailsPhoto: {
    height: 210,
    width: 210,
    resizeMode: 'cover',
    borderRadius: 200,
    borderWidth: 3.2,
    borderColor: colors.background
  },
});