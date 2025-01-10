import React, { useContext } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchButton from "./searchButton";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SettingsContext } from "../context/settingsContext";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import { romanizeNumeral } from "../tools/romanizeNumeral";
import { SafeAreaView, StatusBar } from "react-native";

export default function ReaderHeader({ chapter, book }) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { appLanguage } = useContext(SettingsContext);

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <SearchButton />
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          onPress={() => {
            navigation.navigate("Chapter Selection", {
              currentChapter: chapter,
              currentBook: book,
            });
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 25,
            }}
          >{`${t(book)} ${
            appLanguage == "English" || appLanguage == "en"
              ? chapter
              : romanizeNumeral(chapter)
          }`}</Text>
          <AntDesign style={{ color: "#1B572F" }} name="caretdown" size={15} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />
    </View>
  );
}
