import React from "react";
import { View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchButton() {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("Search Bar", { search_term: "" });
  };

  return (
    <View style={{ padding: 10 }}>
      <EvilIcons
        name="search"
        color={"black"}
        size={30}
        onPress={pressHandler}
      />
    </View>
  );
}
