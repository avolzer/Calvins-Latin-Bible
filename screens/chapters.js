import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";

export default function ChapterSelection({ route }) {
  const { currentChapter } = route.params;
  const navigation = useNavigation();
  var chapters = [];
  for (var i = 1; i <= 150; i++) {
    chapters.push(i);
  }

  const pressHandler = (ch) => {
    navigation.navigate("Reader", {
      name: "Psalm " + ch,
      chap: ch,
    });
  };

  const romanize = (num) => {
    var lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  };

  let chapterButtons = chapters.map((item, index) => {
    return (
      <View key={index} style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            pressHandler(item);
          }}
        >
          {global.language == "English" ? (
            <Text
              style={{
                ...styles.numbers,
                ...{
                  color: currentChapter == item ? "dodgerblue" : "black",
                  textDecorationLine:
                    currentChapter == item ? "underline" : "none",
                },
              }}
            >
              {item}
            </Text>
          ) : (
            <Text style={styles.numbers}>{romanize(item)}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View style={{ flex: 1, paddingVertical: 30, paddingHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>{chapterButtons}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
  },
  numbers: {
    fontSize: 20,
  },
  grid: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    // backgroundColor: 'blue',
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    width: 80,
  },
});
