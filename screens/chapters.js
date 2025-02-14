import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../context/settingsContext";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import { romanizeNumeral } from "../tools/romanizeNumeral";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Purchases from "react-native-purchases";

import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import useRevenueCat from "../shared/useRevenueCat";

export default function ChapterSelection({ route }) {
  const { currentChapter } = route.params;
  const { currentBook } = route.params;
  const settings = useContext(SettingsContext);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const mainScrollView = useRef();
  const { currentOffering, customerInfo, isProMember } = useRevenueCat();
  // const isProMember = false;

  const [selected, setSelected] = useState("chapters");
  const [selectedBook, setSelectedBook] = useState(currentBook);
  const [testament, setTestament] = useState("Old");
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

  const handleMonthlyPurchase = async () => {
    if (!currentOffering?.monthly) return;

    const purchaserInfo = await Purchases.purchasePackage(
      currentOffering.monthly
    );

    console.log(
      "MONTHLY SUB PURCHASED >>",
      purchaserInfo.customerInfo.entitlements.active
    );

    if (purchaserInfo.customerInfo.entitlements.active.pro) {
      setModalVisible(false);
    }
  };

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
  const AvailableOT = ["Psalms"];
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
  const AvailableNT = ["Mark"];
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
                  color: currentChapter == item ? "#1B572F" : "black",
                  fontWeight: currentChapter == item ? "bold" : "normal",
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
                                  fontWeight: "bold",
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
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 18,
                paddingRight: 18,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              ></View>
              <Pressable
                style={{ justifyContent: "center" }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <MaterialIcons
                  name="close"
                  size={30}
                  color="gray"
                ></MaterialIcons>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                paddingBottom: 18,
                paddingHorizontal: 18,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Premium Subscription
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                    $5.99
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingBottom: 4,
                    }}
                  >
                    /mo
                  </Text>
                </View>
                <View style={{ paddingTop: 28, paddingBottom: 28 }}>
                  <TouchableOpacity
                    onPress={handleMonthlyPurchase}
                    style={{
                      borderWidth: 1,
                      alignItems: "center",
                      paddingVertical: 12,
                      paddingHorizontal: 24,
                      borderRadius: 4,
                      borderColor: "#1B572F",
                      elevation: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#1B572F",
                        fontWeight: "bold",
                      }}
                    >
                      Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ fontSize: 18, padding: 12 }}>
                    The monthly subscription of{" "}
                    <Text style={{ color: "#1B572F", fontWeight: "bold" }}>
                      Calvin's Latin Bible
                    </Text>{" "}
                    includes access to the Latin audio and text of all books of
                    the Bible as they are released.{"\n\n"} Currently available:
                    {"\n\n"}
                    <Ionicons name="checkmark" size={18} color="black" />{" "}
                    <Text style={{ paddingLeft: 4 }}>Mark</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    marginBottom: 200,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
