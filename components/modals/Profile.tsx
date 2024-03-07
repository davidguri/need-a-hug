import React from "react";
import { StatusBar, processColor } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { colors } from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import Modal from "react-native-modal";

import { auth } from "../../firebase";

import ImageModal from "./Image";

export default function Profile(props: any) {

  const [isImageVisible, setIsImageVisible] = React.useState(false);

  const toggleImageVisible = () => setIsImageVisible(!isImageVisible);

  return (
    <>
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
              <Text style={{ color: colors.text, fontWeight: "900", fontSize: 18, position: "absolute", left: "50%", transform: [{ translateX: -32 }] }}>Profile</Text>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.userDetailsContainer}>
                <View style={styles.userDetailsLeftContainer}>
                  <TouchableWithoutFeedback onPress={toggleImageVisible}>
                    <Image
                      source={{ uri: props.photoUrl }}
                      style={styles.userDetailsPhoto}
                      onError={(error) => console.error('Image load error:', error)}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.userDetailsRightContainer}>
                  <Text style={styles.userDetailsUsername}>{props.displayName}</Text>
                  <Text style={styles.userDetailsEmail}>{props.email}</Text>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <ImageModal isVisible={isImageVisible} cancel={toggleImageVisible} url={props.photoUrl} />
      </Modal>
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
    height: "100%",
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: 'column',
  },

  topContainer: {
    height: "7.5%",
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
  },

  bottomContainer: {
    height: "92.5%",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  userDetailsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
  },

  userDetailsLeftContainer: {},

  userDetailsUsername: {
    fontWeight: "900",
    fontSize: 24,
    marginBottom: 4.2,
    color: colors.text,
  },

  userDetailsEmail: {
    fontSize: 16,
    opacity: 0.75,
    color: colors.text,
  },

  userDetailsPhoto: {
    height: 81,
    width: 81,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 3.2,
    borderColor: colors.lightBackground,
  },

  userDetailsRightContainer: {},
});