import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

import { colors } from '../constants/colors';

export default function Authentication() {
  const [dname, setDname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          photoURL: "https://api.dicebear.com/7.x/big-ears-neutral/png?randomizeIds=true",
          displayName: dname,
        }).then(() => {
          console.log('✅ Profile updated successfully');
        }).catch((error) => {
          console.error('❌ Error updating profile: ', error.message);
        });
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });
    const userData = {
      email: email,
      displayName: dname,
      photoURL: "https://api.dicebear.com/7.x/big-ears-neutral/png?randomizeIds=true",
    };
    try {
      const docRef = await addDoc(collection(db, "users"), userData);
      console.log("✅ Document written with ID: ", docRef.id);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('❌ Error saving user data to Firestore', errorCode, errorMessage)
    };
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Signed in successfully: ', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <TextInput
            style={styles.input}
            value={dname}
            onChangeText={setDname}
            placeholder="Full Name"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.text}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.text}
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={colors.text}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.darkButton]} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },

  title: {
    color: colors.text,
    fontSize: 60,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    width: '100%',
    borderWidth: 3.2,
    borderColor: colors.primary,
    borderRadius: 25,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: colors.text,
  },

  buttonContainer: {
    paddingTop: 32,
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
