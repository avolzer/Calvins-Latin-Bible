import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import psalms from "../assets/psalms-latin.json";

export default function Search({ route }) {
  //search term will be blank if coming from icon press, user input if coming from searchHeader submit
  const { search_term } = route.params;
  const navigation = useNavigation();

  const [search_results, setSearchResults] = useState([]);

  const removeLongmarks = (text) => {
    return text
      .replaceAll("\u0101", "a")
      .replaceAll("\u012b", "i")
      .replaceAll("\u014d", "o")
      .replaceAll("\u0113", "e")
      .replaceAll("\u016b", "u");
  };

  const pressHandler = (ch) => {
    navigation.navigate("Reader", {
      name: "Psalm " + ch,
      chap: ch,
    });
  };

  const renderResult = (verseText, verseNum, chapterNum) => {
    const idx = removeLongmarks(verseText)
      .toLowerCase()
      .indexOf(removeLongmarks(search_term).toLowerCase());

    return (
      <View key={`${chapterNum}:${verseNum}`}>
        <TouchableOpacity
          onPress={() => {
            pressHandler(chapterNum);
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Psalm {chapterNum}:{verseNum}
          </Text>
          <Text style={{ paddingBottom: 22 }}>
            {verseText.substr(0, idx)}
            <Text style={{ fontWeight: "bold" }}>
              {verseText.substr(idx, search_term.length)}
            </Text>
            {verseText.substr(idx + search_term.length)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getSearchResults = async () => {
    const results = psalms.flatMap((ch) =>
      ch.verses
        .filter((v) =>
          removeLongmarks(v.text)
            .toLowerCase()
            .includes(removeLongmarks(search_term).toLowerCase())
        )
        .map((v) => renderResult(v.text.trimEnd(), v.verse, ch.chapter))
    );

    if (results.length === 0) {
      results.push(<Text>No results found</Text>);
    }

    setSearchResults(results);
  };

  useEffect(() => {
    if (search_term != "") {
      getSearchResults();
    }
  }, [search_term]);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.container}>
        {search_term == "" ? (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => navigation.pop()}
          ></TouchableOpacity>
        ) : (
          <ScrollView
            style={{ height: "95%" }}
            showsVerticalScrollIndicator={false}
          >
            {search_results}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
