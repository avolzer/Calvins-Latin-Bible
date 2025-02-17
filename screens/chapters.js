import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../context/settingsContext";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import { romanizeNumeral } from "../tools/romanizeNumeral";
import AntDesign from "@expo/vector-icons/AntDesign";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useRevenueCat from "../hooks/useRevenueCat";
import SubscriptionModal from "../shared/subscriptionModal";

export default function ChapterSelection({ route }) {
  const { currentChapter } = route.params;
  const { currentBook } = route.params;
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const mainScrollView = useRef();
  const { isProMember } = useRevenueCat();
  // const isProMember = true;

  const AvailableOT = ["Psalms"];
  const AvailableNT = ["Mark"];

  const [selected, setSelected] = useState(isProMember ? "books" : "chapters");
  const [selectedBook, setSelectedBook] = useState(currentBook);
  const [testament, setTestament] = useState(
    AvailableOT.includes(currentBook) ? "Old" : "New"
  );
  const [modalVisible, setModalVisible] = useState(false);

  const numChaps = {
    Psalms: 150,
    Mark: 16,
  };

  useEffect(() => {
    let book = currentBook;
    if (currentBook == "Psalm") book = "Psalms";
    navigation.setOptions({ headerTitle: t(book) });
  }, []);

  useEffect(() => {
    if (mainScrollView.current) {
      mainScrollView.current.scrollTo({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }, [testament]);

  var chapters = [];
  for (var i = 1; i <= numChaps[selectedBook]; i++) {
    chapters.push(i);
  }
  const ComingSoonOT = [
    "Genesis",
    "Exodus",
    "Leviticus",
    "Numbers",
    "Deuteronomy",
    "Joshua",
    "I Samuel",
    "Job",
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
      name: `${selectedBook} ${ch}`,
      chap: ch,
      book: selectedBook,
    });
  };

  const UnlockButton = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            borderColor: "#4BA669",
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
            backgroundColor: "#4BA669",
            marginTop: 20,
            flexDirection: "row",
            gap: 10,
            elevation: 4,
          }}
        >
          <AntDesign name="lock" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 18 }}>
            Unlock More Books
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  let chapterButtons = chapters.map((item, index) => {
    return (
      <View
        key={index}
        style={[
          styles.wrapper,
          {
            width:
              settings.appLanguage == "English" || settings.appLanguage == "en"
                ? 80
                : 100,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            {
              paddingHorizontal:
                settings.appLanguage == "English" ||
                settings.appLanguage == "en"
                  ? 20
                  : 10,
            },
          ]}
          onPress={() => {
            pressHandler(item);
          }}
        >
          {settings.appLanguage == "English" || settings.appLanguage == "en" ? (
            <Text
              style={{
                ...styles.numbers,
                ...{
                  color:
                    currentChapter == item && currentBook == selectedBook
                      ? "#1B572F"
                      : "black",
                  fontWeight:
                    currentChapter == item && currentBook == selectedBook
                      ? "bold"
                      : "normal",
                },
              }}
            >
              {item}
            </Text>
          ) : (
            <Text
              style={{
                ...styles.numbers,
                ...{
                  color: currentChapter == item ? "#1B572F" : "black",
                  fontWeight: currentChapter == item ? "bold" : "normal",
                },
              }}
            >
              {romanizeNumeral(item)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: "white" }}>
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
            {t("Book")}
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
            let book = currentBook;
            if (book == "Psalm") book = "Psalms";
            navigation.setOptions({ headerTitle: t(book) });
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: selected === "chapters" ? "black" : "gray",
            }}
          >
            {t("Chapter")}
          </Text>
        </TouchableOpacity>
      </View>
      {selected === "books" ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {isProMember && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  paddingLeft: 18,
                  paddingTop: 18,
                }}
              >
                <MaterialCommunityIcons
                  name="crown-circle-outline"
                  size={30}
                  color="#4BA669"
                />
                <Text style={{ fontSize: 20, color: "#4BA669" }}>Premium</Text>
              </View>
            )}

            {testament == "Old" ? (
              <>
                <View
                  style={{
                    paddingHorizontal: 30,
                    marginTop: 20,
                  }}
                >
                  {isProMember ? (
                    <>
                      <Text style={styles.subheading}>{t("Available")} </Text>
                      {AvailableOT.map((book) => {
                        return (
                          <TouchableOpacity
                            key={book}
                            style={styles.listItem}
                            onPress={() => {
                              setSelectedBook(book);
                              setSelected("chapters");
                              navigation.setOptions({ headerTitle: t(book) });
                            }}
                          >
                            <Text
                              style={[
                                styles.listItemText,
                                {
                                  fontWeight:
                                    currentBook == book ||
                                    (currentBook == "Psalm" && book == "Psalms")
                                      ? "bold"
                                      : "normal",
                                  color:
                                    currentBook == book ||
                                    (currentBook == "Psalm" && book == "Psalms")
                                      ? "#1B572F"
                                      : "black",
                                },
                              ]}
                            >
                              {t(book)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                      <Text style={[styles.subheading, { marginTop: 20 }]}>
                        {t("Coming Soon")}
                      </Text>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {ComingSoonOT.map((book) => {
                          return (
                            <View key={book} style={styles.listItem}>
                              <Text
                                style={[styles.listItemText, { color: "gray" }]}
                              >
                                {t(book)}
                              </Text>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => {
                        setSelectedBook("Psalms");
                        setSelected("chapters");
                        navigation.setOptions({ headerTitle: "Psalms" });
                      }}
                    >
                      <Text
                        style={[
                          styles.listItemText,
                          {
                            fontWeight:
                              currentBook == "Psalms" ? "bold" : "normal",
                            color:
                              currentBook == "Psalms" ? "#1B572F" : "black",
                          },
                        ]}
                      >
                        Psalms
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!isProMember && <UnlockButton />}
                </View>
              </>
            ) : (
              <>
                <View
                  style={{
                    paddingHorizontal: 30,
                    marginTop: 20,
                  }}
                >
                  {isProMember ? (
                    <>
                      <Text style={styles.subheading}>{t("Available")} </Text>
                      {AvailableNT.map((book) => {
                        return (
                          <TouchableOpacity
                            key={book}
                            style={styles.listItem}
                            onPress={() => {
                              setSelectedBook(book);
                              setSelected("chapters");
                              navigation.setOptions({ headerTitle: t(book) });
                            }}
                          >
                            <Text
                              style={[
                                styles.listItemText,
                                {
                                  fontWeight:
                                    currentBook == book ? "bold" : "normal",
                                  color:
                                    currentBook == book ? "#1B572F" : "black",
                                },
                              ]}
                            >
                              {t(book)}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                      <Text style={[styles.subheading, { marginTop: 20 }]}>
                        {t("Coming Soon")}{" "}
                      </Text>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {ComingSoonNT.map((book) => {
                          return (
                            <View key={book} style={styles.listItem}>
                              <Text
                                style={[styles.listItemText, { color: "gray" }]}
                              >
                                {t(book)}
                              </Text>
                            </View>
                          );
                        })}
                      </ScrollView>
                    </>
                  ) : (
                    <UnlockButton />
                  )}
                </View>
              </>
            )}
          </View>
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
                  borderColor: "#1B572F",
                  borderTopWidth: testament == "Old" ? 0 : 1,
                  backgroundColor: testament == "Old" ? "#1B572F" : "white",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: testament == "Old" ? "white" : "#1B572F",
                }}
              >
                {t("Old")}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: testament == "Old" ? "white" : "#1B572F",
                }}
              >
                {t("Testament")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTestament("New");
              }}
              style={[
                styles.testament,
                {
                  borderColor: "#1B572F",
                  borderTopWidth: testament == "New" ? 0 : 1,
                  backgroundColor: testament == "New" ? "#1B572F" : "white",
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: testament == "New" ? "white" : "#1B572F",
                }}
              >
                {t("New")}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: testament == "New" ? "white" : "#1B572F",
                }}
              >
                {t("Testament")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>{chapterButtons}</View>
        </ScrollView>
      )}
      <SubscriptionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        subscribed={false}
      />
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
  },
  wrapper: {
    alignItems: "center",
    width: 80,
  },
  tab: {
    borderColor: "#4BA669",
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
    paddingVertical: 10,
  },
});
