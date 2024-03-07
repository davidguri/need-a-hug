import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';

import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase';

import Button from "../components/ui/Button";

export default function Friends() {

  const userEmail = auth.currentUser.email;
  const [selected, setSelected] = React.useState(null);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

    fetchFriends();
  }, []);

  const handleSearch = async () => {
    try {
      console.log('Search Query:', searchQuery);

      if (!searchQuery || searchQuery.trim() === '') {
        setSearchResults([]); // Clear search results if searchQuery is empty
        return;
      }

      const q = query(collection(db, 'users'), where('email', '==', searchQuery));
      const querySnapshot = await getDocs(q);

      const users = [];

      const filteredResults = querySnapshot.docs
        .map(doc => doc.data())
        .filter(user => user.email !== userEmail);

      setSearchResults(filteredResults);

      console.log('Number of documents:', querySnapshot.size);
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  // TODO: add debounce functionality

  const handleSelectItem = (item: any) => {
    setSelected(item);
    console.log('Selected item:', item);
  };

  const addFriend = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', userEmail)));

      if (querySnapshot.size === 0) {
        console.log('No document found with the email:', userEmail);
        return;
      }

      const newData = { ...selected };
      delete newData.friends;

      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, {
        friends: arrayUnion(newData)
      });

      console.log('✅ Friend added successfully to user with email:', userEmail);
    } catch (error) {
      console.error('❌ Error adding friend to user:', error);
    }
  }


  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Add Friends</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search Friend By Email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.text}
            />
            <Button light={false} text="Search" onPress={handleSearch} textStyles={{ marginHorizontal: 24 }} />
          </View>
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <TouchableOpacity key={item.id} onPress={() => handleSelectItem(item)}>
                  <View style={styles.listItem}>
                    <Image
                      source={{ uri: item.photoURL }}
                      style={styles.listPhoto}
                      onError={(error) => console.error('Image load error:', error)}
                    />
                    <Text style={styles.listText}>{item.displayName}</Text>
                  </View>
                </TouchableOpacity>
              )

            )}
          />
          <Button light={true} text="Add Friend" styles={{ opacity: (selected ? 1 : 0.75) }} onPress={addFriend} disabled={selected ? false : true} />
          <Text style={[styles.title, { marginTop: 64 }]}>Your Friends</Text>
          <FlatList
            data={friends}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.listItem, { width: "100%", marginHorizontal: "0%" }]}>
                <Image
                  source={{ uri: item.photoURL }}
                  style={styles.listPhoto}
                  onError={(error) => console.error('Image load error:', error)}
                />
                <Text style={styles.listText}>{item.displayName}</Text>
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
    fontSize: 60,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 32,
  },

  input: {
    flex: 1,
    borderWidth: 3.2,
    borderColor: colors.primary,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: colors.text,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: 'center',
    width: "100%",
    marginBottom: 16,
    gap: 12,
  },

  validText: {
    color: colors.text,
    marginLeft: 18.2,
    marginVertical: 12,
    opacity: 0.75,
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
});