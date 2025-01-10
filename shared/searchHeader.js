import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "react-native-elements";

export default function SearchHeader({ navigation }) {
  //const navigation = useNavigation();

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const [value, onChangeText] = useState("");

  const submitEdit = () => {
    navigation.navigate("Search Bar", { search_term: value });
  };

  return (
    <View style={{ width: 500 }}>
      <TextInput
        ref={searchInput}
        style={styles.searchBar}
        onChangeText={(text) => onChangeText(text)}
        onSubmitEditing={submitEdit}
        autoFocus={true}
        placeholder="Search Latin Text"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 24,
    margin: 10,
    width: "90%",
    height: 50,
    backgroundColor: "white",
  },
});
