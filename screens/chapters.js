import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../context/settingsContext";

export default function ChapterSelection({ route }) {
  const { currentChapter } = route.params;
  const { currentBook } = route.params;
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();

  const [selected, setSelected] = useState("chapters");
  const [selectedBook, setSelectedBook] = useState(currentBook);
  const [testament, setTestament] = useState("Old");

  useEffect(() => {
    navigation.setOptions({ headerTitle: currentBook });
  }, []);

  var chapters = [];
  for (var i = 1; i <= 150; i++) {
    chapters.push(i);
  }
  const AvailableBooks = ["Psalms"];
  const ComingSoonOT = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "I Samuel",
    "Job",
    "Psalms",
    "Isaiah",
    "Jeremiah",
    "Lamentations",
    "Ezekiel",
    "Daniel",
    "Hosea",
    "Joel",
    "Amos",
    "Obadiah",
    "Jonah",
    "Micah",
    "Nahum",
    "Habakuk",
    "Zephaniah",
    "Haggai",
    "Zachariah",
    "Malachi",
  ];
  const ComingSoonNT = [
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "I Corinthians",
    "II Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "I Thessalonians",
    "II Thessalonians",
    "I Timothy",
    "II Timothy",
    "Titus",
    "Philemon",
    "Hebrews",
    "James",
    "I Peter",
    "II Peter",
    "I John",
    "Jude",
  ];

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
          {settings.appLanguage == "English" ? (
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
    <View style={{ flex: 1, paddingTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderBottomWidth: selected === "books" ? 1 : 0,
            },
          ]}
          onPress={() => {
            setSelected("books");
            navigation.setOptions({ headerTitle: " " });
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: selected === "books" ? "black" : "gray",
            }}
          >
            Book
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderBottomWidth: selected === "chapters" ? 1 : 0,
            },
          ]}
          onPress={() => {
            setSelected("chapters");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: selected === "chapters" ? "black" : "gray",
            }}
          >
            Chapter
          </Text>
        </TouchableOpacity>
      </View>
      {selected === "books" ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 30,
              marginTop: 20,
            }}
          >
            {testament == "Old" ? (
              <>
                <Text style={styles.subheading}>Available </Text>
                {AvailableBooks.map((book) => {
                  return (
                    <TouchableOpacity
                      key={book}
                      style={styles.listItem}
                      onPress={() => {
                        setSelectedBook(book);
                        setSelected("chapters");
                        navigation.setOptions({ headerTitle: book });
                      }}
                    >
                      <Text
                        style={[
                          styles.listItemText,
                          {
                            color: currentBook == book ? "blue" : "black",
                            textDecorationLine:
                              currentBook == book ? "underline" : "none",
                          },
                        ]}
                      >
                        {book}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <Text style={[styles.subheading, { marginTop: 20 }]}>
                  Coming Soon{" "}
                </Text>
                {ComingSoonOT.map((book) => {
                  return (
                    <View key={book} style={styles.listItem}>
                      <Text style={[styles.listItemText, { color: "gray" }]}>
                        {book}
                      </Text>
                    </View>
                  );
                })}
              </>
            ) : (
              <>
                <Text style={styles.subheading}>Coming Soon </Text>
                {ComingSoonNT.map((book) => {
                  return (
                    <View key={book} style={styles.listItem}>
                      <Text style={[styles.listItemText, { color: "gray" }]}>
                        {book}
                      </Text>
                    </View>
                  );
                })}
              </>
            )}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // borderTopWidth: 1,
              // borderColor: "gray",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setTestament("Old");
              }}
              style={[
                styles.testament,
                {
                  borderRightWidth: 1,
                  borderColor: "gray",
                  borderTopWidth: testament == "Old" ? 0 : 1,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: testament == "Old" ? "black" : "gray",
                }}
              >
                Old
              </Text>
              <Text
                style={{
                  fontSize: 16,

                  color: testament == "Old" ? "black" : "gray",
                }}
              >
                Testament
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTestament("New");
              }}
              style={[
                styles.testament,
                {
                  borderTopWidth: testament == "New" ? 0 : 1,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,

                  color: testament == "New" ? "black" : "gray",
                }}
              >
                New
              </Text>
              <Text
                style={{
                  fontSize: 16,

                  color: testament == "New" ? "black" : "gray",
                }}
              >
                Testament
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>{chapterButtons}</View>
        </ScrollView>
      )}
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
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    width: 80,
  },
  tab: {
    borderColor: "blue",
    paddingHorizontal: 10,
    marginLeft: 20,
    paddingBottom: 15,
  },
  listItem: {
    paddingVertical: 15,
  },
  listItemText: {
    fontSize: 18,
  },
  subheading: {
    color: "black",
  },
  testament: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
});
