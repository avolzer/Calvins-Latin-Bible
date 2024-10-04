import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Switch,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";
import MyPlayer from "../shared/audioPlayer";
import textData from "../assets/csvjson";
import { MaterialIcons } from "@expo/vector-icons";
import HTML from "react-native-render-html";
import psalmsData from "../assets/psalms.json";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import ReaderHeader from "../shared/readerHeader";

export default function Reader({ route }) {
  const navigation = useNavigation();

  const playerRef = useRef();
  const mainScrollView = useRef();

  const [lang, setLang] = useState("Latin");
  const [showLongmarks, setShowLongmarks] = useState(true);
  const toggleSwitch = () =>
    setShowLongmarks((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener("didFocus", () => {});
    return unsubscribe;
  }, [navigation]);

  const fontSize = 20;
  const superFontSize = Math.floor(fontSize * 0.6);

  const superlineHeight = superFontSize * 1.1;

  const superScript = {
    textAlignVertical: "top",
    fontSize: superFontSize,
    lineHeight: superlineHeight,
    fontFamily: "serif",
  };

  const regular = {
    textAlignVertical: "bottom",
    fontSize: fontSize,
    lineHeight: 35,
    fontFamily: "serif",
  };

  // taken from a comment on http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
  const romanizeLower = (num) => {
    var lookup = {
        m: 1000,
        cm: 900,
        d: 500,
        cd: 400,
        c: 100,
        xc: 90,
        l: 50,
        xl: 40,
        x: 10,
        ix: 9,
        v: 5,
        iv: 4,
        i: 1,
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

  const romanizeUpper = (num) => {
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
  const currentChapter = psalmsData[chapter - 1];
  console.log(currentChapter);

  const removeLongmarks = (text) => {
    return text
      .replaceAll("\u0101", "a")
      .replaceAll("\u012b", "i")
      .replaceAll("\u014d", "o")
      .replaceAll("\u0113", "e")
      .replaceAll("\u016b", "u");
  };

  var verses = [];
  for (let i = 0; i < currentChapter.verses.length; i++) {
    verses.push(
      <View key={i} style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Text style={regular}>
          {showLongmarks
            ? currentChapter.verses[i]
            : removeLongmarks(currentChapter.verses[i])}
        </Text>
      </View>
    );
  }

  const [latinVerses, setLatinVerses] = useState("<p></p>");

  useEffect(() => {
    getEnglish(chapter);
  }, []);
  useEffect(() => {
    if (route.params && route.params.chap) setChapter(route.params.chap);
  }, [route.params]);

  const getEnglish = async (ch) => {
    const API_KEY = `c3fd729feb669c03c2d4d5474409d775`;
    var url =
      "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/PSA." +
      ch +
      "?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "api-key": API_KEY,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLatinVerses(responseJson.data.content);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    mainScrollView.current.scrollTo({ x: 0, y: 0, animated: false });
    const psalms = textData.filter((item) => item.ShortBook == "PSAL");
    const chapterText = psalms.filter((item) => item.Chapter == chapter);
    getEnglish(chapter);
    navigation.setOptions({
      headerTitle: "Hi",
    });
  }, [chapter]);
  const SettingsModal = () => {
    return (
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
                padding: 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="settings" size={20} />
                <Text
                  style={{
                    marginLeft: 8,
                    fontSize: 20,
                    fontFamily: "serif",
                    fontWeight: "bold",
                  }}
                >
                  Settings
                </Text>
              </View>
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
            <View style={{ width: "100%", padding: 24 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    alignContent: "center",
                    fontSize: 16,
                    fontFamily: "serif",
                  }}
                >
                  Show long marks
                </Text>
                <Switch
                  style={{ flex: 1 }}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={showLongmarks ? "#f5dd4b" : "#f4f3f4"}
                  // ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={showLongmarks}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 16, flex: 1, fontFamily: "serif" }}>
                  Text Language
                </Text>
                <Picker
                  selectedValue={lang}
                  style={{ height: 50, width: 150 }}
                  onValueChange={(itemValue) => {
                    setLang(itemValue);
                  }}
                >
                  <Picker.Item label="Latin" value="Latin" />

                  <Picker.Item label="English" value="English" />
                </Picker>
              </View>
              <View style={{ paddingTop: 20 }}>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  title="Done"
                  color="blue"
                  accessibilityLabel="Close the modal"
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={globalStyles.mainContainer}>
      <SettingsModal />
      <ReaderHeader
        chapter={chapter}
        settingsHandler={() => {
          setModalVisible(true);
        }}
      />
      <View style={[globalStyles.container, { flex: 6 }]}>
        {lang == "Latin" ? (
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            ref={mainScrollView}
          >
            <View
              style={{
                paddingVertical: 20,
              }}
            >
              {lang === "Latin" ? (
                <View>
                  <Text style={styles.chapterNum}>
                    {showLongmarks
                      ? currentChapter.chapterLatin
                      : removeLongmarks(currentChapter.chapterLatin)}
                  </Text>
                  {currentChapter.superscription && (
                    <Text style={{ fontSize: fontSize, fontStyle: "italic" }}>
                      {currentChapter.superscription}
                    </Text>
                  )}
                </View>
              ) : (
                <>
                  {global.language == "English" ? (
                    <Text style={styles.chapterNum}>{chapter}</Text>
                  ) : (
                    <Text style={styles.chapterNum}>
                      {romanizeUpper(chapter)}
                    </Text>
                  )}
                </>
              )}
            </View>
            {verses}
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            ref={mainScrollView}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              {lang === "Latin" ? (
                <Text style={styles.chapterNum}>
                  {showLongmarks
                    ? currentChapter.chapterLatin
                    : removeLongmarks(currentChapter.chapterLatin)}
                </Text>
              ) : (
                <>
                  {global.language == "English" ? (
                    <Text style={styles.chapterNum}>{chapter}</Text>
                  ) : (
                    <Text style={styles.chapterNum}>
                      {romanizeUpper(chapter)}
                    </Text>
                  )}
                </>
              )}
            </View>
            <HTML
              baseFontStyle={{
                textAlignVertical: "bottom",
                fontSize: fontSize,
                lineHeight: 35,
                color: "black",
                fontFamily: "serif",
              }}
              classesStyles={{
                v: { textAlignVertical: "top", fontSize: superFontSize },
              }}
              source={{ html: latinVerses }}
            />
            <Text>{latinVerses}</Text>
          </ScrollView>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MyPlayer
          chapter={chapter}
          style={{ flex: 1 }}
          playerRef={playerRef}
          onNext={() => {
            setChapter(chapter + 1);
          }}
          onPrevious={() => {
            setChapter(chapter - 1);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chapterNum: {
    fontSize: 20,
    fontFamily: "serif",
    paddingBottom: 4,
    fontWeight: "bold",
  },
  scroll: {
    flex: 5,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
