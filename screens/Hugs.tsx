import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

import { collection, query, where, getDocs, updateDoc, doc, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Hugs() {

  const userEmail = auth.currentUser.email;

  const [receivedHugs, setReceivedHugs] = React.useState([]);
  const [sentHugs, setSentHugs] = React.useState([]);

  const fetchReceivedHugs = async () => {
    try {
      const receivedHugsCollectionRef = collection(db, 'sentHugs');
      const querySnapshot = await getDocs(query(receivedHugsCollectionRef, where('receiverEmail', '==', userEmail)));

      if (querySnapshot.empty) {
        // console.log('❌ No documents found with the email:', userEmail);
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
        // console.log('❌ No documents found with the sender email:', userEmail);
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
              <View style={[styles.listItem]}>
                <View style={styles.listItemTopContainer}>
                  <Image
                    source={{ uri: item.senderPhotoUrl }}
                    style={styles.listPhoto}
                    onError={(error) => console.error('Image load error:', error)}
                  />
                  <Text style={styles.listText}>{item.senderDisplayName}</Text>
                </View>
                <View style={styles.listItemBottomContainer}>
                  <Text style={{ color: colors.lightText, marginLeft: "9.5%", marginBottom: "5%" }}>{item.message}</Text>
                </View>
              </View>
            )}
          />
          <Text style={styles.title}>Hugs You Sent<Text style={{ color: colors.accent }}>!</Text></Text>
          <FlatList
            data={sentHugs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.listItem]}>
                <View style={styles.listItemTopContainer}>
                  <Image
                    source={{ uri: item.senderPhotoUrl }}
                    style={styles.listPhoto}
                    onError={(error) => console.error('Image load error:', error)}
                  />
                  <Text style={styles.listText}>{item.senderDisplayName}</Text>
                </View>
                <View style={styles.listItemBottomContainer}>
                  <Text style={{ color: colors.lightText, marginLeft: "9.5%", marginBottom: "5%" }}>{item.message}</Text>
                </View>
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

  listItem: {
    marginBottom: 16,
    width: "80%",
    marginHorizontal: "10%",
    flexDirection: "column",
    gap: 12,
    backgroundColor: colors.lightBackground,
    borderRadius: 23.5,
  },

  listItemTopContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  listItemBottomContainer: {},

  listText: {
    color: colors.lightText,
    fontWeight: "900",
    fontSize: 18,
  },

  listPhoto: {
    height: 48,
    width: 48,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: colors.background
  },
});