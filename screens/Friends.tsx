import React from "react";
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { colors } from '../constants/colors';

import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import Button from "../components/ui/Button";

export default function Friends() {

  const [selected, setSelected] = React.useState(true);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

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
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push(userData);
      });

      setSearchResults(users);

      console.log('Number of documents:', querySnapshot.size);
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.content}>
          <Text style={styles.title}>Friends</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Enter Email Of Friend"
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
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: colors.text }}>{item.displayName}</Text>
                <Text style={{ color: colors.text }}>{item.email}</Text>
              </View>
            )}
          />
          <Button light={true} text="Add Friend" styles={{ opacity: (selected ? 1 : 0.75) }} onPress={() => { }} disabled={selected ? false : true} />
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
    marginBottom: 12,
    gap: 12,
  },

  validText: {
    color: colors.text,
    marginLeft: 18.2,
    marginVertical: 12,
    opacity: 0.75,
  }
});