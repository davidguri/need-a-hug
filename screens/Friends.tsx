import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { colors } from '../constants/colors';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Friends() {

  const [email, setEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const debounce = (func: any, delay: number) => {
    let timeoutId: any;

    return (...args: any) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const searchEmail = async (email: string) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);

      const usersWithEmail = [];
      querySnapshot.forEach((doc) => {
        // Here you can access the documents that match the email
        const userData = doc.data();
        usersWithEmail.push(userData);
      });

      return usersWithEmail;
    } catch (error) {
      console.error('Error searching for email:', error);
      return [];
    }
  };

  const debouceSearch = debounce(searchEmail, 500);

  // TODO: add search function here...

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Friends</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email Of Friend"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.text}
          />
          <Text style={styles.validText}>The email is {isValid ? "valid" : "not valid"}.</Text>
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

  validText: {
    color: colors.text,
    marginLeft: 18.2,
  }
});