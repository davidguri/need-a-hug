import React from "react";
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, Alert } from 'react-native';
import { colors } from '../../constants/colors';

import { Ionicons } from '@expo/vector-icons';

import Modal from "react-native-modal";

import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

import Button from "../ui/Button";

export default function SendHug(props: any) {

  const userEmail = auth.currentUser.email;

  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [selected, setSelected] = React.useState("");

  const [message, setMessage] = React.useState('');

  const fetchFriends = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const userFriends = userData.friends || [];
        setFriends(userFriends);
      }
    } catch (error) {
      console.error('❌ Error fetching friends:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFriends();
  }, []);

  const sendHug = async (rEmail: string) => {
    try {
      const docRef = await addDoc(collection(db, "sentHugs"), {
        senderEmail: userEmail,
        receiverEmail: rEmail,
        timestamp: Date.now(),
        message: message,
      });
      console.log("✅ Document written with ID: ", docRef.id);
      Alert.alert("Yay!", "Hug Sent Successfully!");
    } catch (e) {
      console.error("❌ Error: ", e.message);
    } finally {
      setMessage('');
      setSelected(null);
    }
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={{ margin: 0 }}
      animationIn={"slideInRight"}
      animationOut={"slideOutRight"}
      avoidKeyboard={true}
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
          <View style={styles.middleContainer}>
            <Text style={styles.title}>I Want To Send A Hug<Text style={{ color: colors.accent }}>!</Text></Text>
            <Text style={styles.subtitle}>Select who you want to send the hug to and the message.</Text>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Message"
              autoCapitalize="none"
              placeholderTextColor={colors.text}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, width: "100%", justifyContent: "center", marginBottom: 16 }}>
              <Text style={{ color: colors.text, fontWeight: "800", fontSize: 16 }}>List Of Friends:</Text>
              <TouchableOpacity onPress={() => fetchFriends()}>
                <Ionicons name='refresh' size={25} color={colors.accent} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={friends}
              keyExtractor={(item, index) => index.toString()}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity key={item.id} onPress={() => selected ? setSelected(null) : setSelected(item.email)}>
                    <View style={[styles.listItem, { backgroundColor: selected == item.email ? colors.primary : colors.lightBackground, width: "100%", marginHorizontal: "0%" }]}>
                      <Image
                        source={{ uri: item.photoURL }}
                        style={styles.listPhoto}
                        onError={(error) => console.error('Image load error:', error)}
                      />
                      <Text style={styles.listText}>{item.displayName}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Button light={false} styles={{ width: "100%", opacity: selected && message ? 1 : 0.75 }} text="Send Hug!" onPress={() => sendHug(selected)} disabled={selected && message ? false : true} />
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

  middleContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: colors.text,
    fontSize: 60,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 24,
    color: colors.text,
    opacity: 0.8,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    width: '100%',
    borderWidth: 3.2,
    borderColor: colors.primary,
    borderRadius: 25,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: colors.text,
  },

  listItem: {
    marginBottom: 16,
    width: "80%",
    marginHorizontal: "10%",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.lightBackground,
    borderRadius: 50,
  },

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

  bottomContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});