import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchButton from "./searchButton";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ReaderHeader({ chapter, settingsHandler }) {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("Search Bar", { search_term: "" });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(34, 36, 40, 1)",
        position: "relative",
        height: 120,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 65,
          right: 15,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={settingsHandler}
        >
          <MaterialIcons
            name="settings"
            size={30}
            color="white"
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 50,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          onPress={() => {
            navigation.navigate("Chapter Selection", {
              currentChapter: chapter,
            });
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
            }}
          >{`Psalm ${chapter}`}</Text>
          <AntDesign style={{ color: "beige" }} name="caretdown" size={15} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          top: 60,
          left: 10,
        }}
      >
        <SearchButton />
      </View>
    </View>
  );
}
