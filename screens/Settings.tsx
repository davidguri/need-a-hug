import React from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { colors } from '../constants/colors';

import { auth } from "../firebase";
import { signOut, updateProfile } from 'firebase/auth';

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

  const updateProfileHandler = async (dname: string, purl: string) => {
    updateProfile(auth.currentUser, {
      displayName: dname,
      photoURL: "https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
    }).then(() => {
      console.log('Profile updated successfully');
    }).catch((error) => {
      console.error('Error updating profile: ', error.message);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
      />
      <Text>Welcome to the settings page {(user.displayName) ? user.displayName : user.email}</Text>
      <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
  },

  title: {
    color: colors.lightText,
    fontSize: 64,
    fontWeight: "900"
  },

  button: {
    width: '100%',
    paddingVertical: 15,
    marginBottom: 12,
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
});