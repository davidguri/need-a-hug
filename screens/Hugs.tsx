import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';

import Hug from "../components/modals/Hug";

export default function Hugs() {

  const userEmail = auth.currentUser.email;

  const [receivedHugs, setReceivedHugs] = React.useState([]);
  const [sentHugs, setSentHugs] = React.useState([]);

  const fetchReceivedHugs = async () => {
    try {
      const receivedHugsCollectionRef = collection(db, 'sentHugs');
      const querySnapshot = await getDocs(query(receivedHugsCollectionRef, where('receiverEmail', '==', userEmail)));

      if (querySnapshot.empty) {
        console.log('❌ No documents found with the email:', userEmail);
        return;
      }

      const receivedHugs = [];
      querySnapshot.forEach((doc) => {
        receivedHugs.push({ id: doc.id, ...doc.data() });
      });

      setReceivedHugs(receivedHugs);
    } catch (error) {
      console.error('❌ Error fetching received hugs:', error);
    }
  };

  const fetchSentHugs = async () => {
    try {
      const sentHugsCollectionRef = collection(db, 'sentHugs');
      const querySnapshot = await getDocs(query(sentHugsCollectionRef, where('senderEmail', '==', userEmail)));

      if (querySnapshot.empty) {
        console.log('❌ No documents found with the sender email:', userEmail);
        return;
      }

      const sentHugs = [];
      querySnapshot.forEach((doc) => {
        sentHugs.push({ id: doc.id, ...doc.data() });
      });

      setSentHugs(sentHugs);
    } catch (error) {
      console.error('❌ Error fetching sent hugs:', error);
    }
  };

  React.useEffect(() => {
    fetchReceivedHugs();
    fetchSentHugs();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Hugs Sent To You<Text style={{ color: colors.accent }}>!</Text></Text>
          <FlatList
            data={receivedHugs}
            keyExtractor={item => item.id}
            style={{ marginBottom: 64 }}
            renderItem={({ item }) => (
              <View>
                <Text style={{ color: colors.text }}>From: {item.senderEmail}</Text>
                <Text style={{ color: colors.text }}>Message: {item.message}</Text>
                {/* Display other hug details as needed */}
              </View>
            )}
          />
          <Text style={styles.title}>Hugs You Sent<Text style={{ color: colors.accent }}>!</Text></Text>
          <FlatList
            data={sentHugs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={{ color: colors.text }}>To: {item.receiverEmail}</Text>
                <Text style={{ color: colors.text }}>Message: {item.message}</Text>
              </View>
            )}
          />
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