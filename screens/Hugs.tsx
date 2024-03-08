import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { auth } from '../firebase';

import Hug from "../components/modals/Hug";

export default function Friends() {

  const userEmail = auth.currentUser.email;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Hugs Sent To You<Text style={{ color: colors.accent }}>!</Text></Text>
          <Text style={styles.title}>Hugs You Sent<Text style={{ color: colors.accent }}>!</Text></Text>
        </View>
      </SafeAreaView>
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
    flexDirection: 'column',
    width: "90%",
    marginHorizontal: "5%",
  },

  title: {
    color: colors.text,
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 32,
  },
});