import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchButton from "./searchButton";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ReaderHeader({ chapter }) {
  const navigation = useNavigation();

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
          marginTop: 50,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          onPress={() => {
            navigation.navigate("Chapter Selection", {
              currentChapter: chapter,
              currentBook: "Psalms",
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