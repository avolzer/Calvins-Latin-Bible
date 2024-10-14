import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";

// import textData from '../assets/csvjson'
import psalms from "../assets/psalms.json";

export default function Search({ navigation, route }) {
  //search term will be blank if coming from icon press, user input if coming from searchHeader submit
  const { search_term } = route.params;

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
          <Text>{verseText}</Text>
          <Text></Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getSearchResults = () => {
    var results = [];
    psalms.forEach((ch) => {
      ch.verses.forEach((v, idx) => {
        if (
          removeLongmarks(v)
            .toLowerCase()
            .includes(removeLongmarks(search_term).toLowerCase())
        ) {
          results.push(renderResult(v, idx + 1, ch.chapter));
        }
      });
    });

    // for (var i = 0; i < psalms.length; i++) {
    //   if (psalms[i].Text.includes(search_term)) {
    //     results.push(renderResult(i));
    //   }
    // }
    setSearchResults(results);
    if (results.length == 0) {
      results.push(<Text>No results found</Text>);
    }
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
          <View>
            {/* <Text>Results for {search_term}: </Text> */}
            <Text></Text>
            <ScrollView
              style={{ height: "95%" }}
              showsVerticalScrollIndicator={false}
            >
              {search_results}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}
