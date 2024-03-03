import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { colors } from '../constants/colors';

import { auth } from "../firebase";
import { signOut, getAuth } from 'firebase/auth';

export default function Settings() {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Error signing out: ', error.message);
    }
  };

  const user = auth.currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
      <View style={styles.topContainer}>
        <View style={styles.userDetailsContainer}>
          <View style={styles.userDetailsLeftContainer}>
            <Image
              source={{ uri: user.photoURL }}
              style={styles.userDetailsPhoto}
              onError={(error) => console.error('Image load error:', error)}
            />
          </View>
          <View style={styles.userDetailsRightContainer}>
            <Text style={styles.userDetailsUsername}>{(user.displayName) ? user.displayName : user.email}</Text>
            {(user.displayName) ? (
              <Text style={styles.userDetailsEmail}>{user.email}</Text>
            ) : (
              <View style={{ width: 0, height: 0 }} />
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>Made With ❤️ By David Guri</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBackground,
    color: colors.lightText,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: colors.lightText,
    fontSize: 64,
    fontWeight: "900"
  },

  topContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  userDetailsContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 12,
  },

  userDetailsLeftContainer: {},

  userDetailsUsername: {
    fontWeight: "900",
    fontSize: 24,
    marginBottom: 4.2
  },

  userDetailsEmail: {
    fontSize: 16,
    opacity: 0.75,
  },

  userDetailsPhoto: {
    height: 81,
    width: 81,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 3.2,
    borderColor: colors.background
  },

  userDetailsRightContainer: {},

  bottomContainer: {
    width: "100%",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },

  lightButton: {
    backgroundColor: colors.lightSecondary,
    color: colors.lightText
  },

  darkButton: {
    backgroundColor: colors.secondary,
    color: colors.text
  },

  buttonText: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 18
  },

  bottomText: {
    textAlign: "center",
    fontWeight: "800",
  },
});