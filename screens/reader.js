import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { globalStyles } from "../styles/global";
import MyPlayer from "../shared/audioPlayer";
import { useNavigation } from "@react-navigation/native";
import ReaderHeader from "../shared/readerHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SettingsContext } from "../context/settingsContext";
import ESVpsalms from "../assets/ESV-psalms.json";
import KJVbible from "../assets/kjv.json";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import LatinPsalms from "../assets/psalms-latin.json";

export default function Reader({ route }) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { appLanguage, showLongmarks, fontSize, translation } =
    useContext(SettingsContext);

  const playerRef = useRef();
  const mainScrollView = useRef();

  const [lang, setLang] = useState("Latin");
  const [currentBook, setCurrentBook] = useState("Psalm");

  const [modalVisible, setModalVisible] = useState(false);
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener("didFocus", () => {});
    return unsubscribe;
  }, [navigation]);

  const superFontSize = Math.floor(fontSize * 0.6);

  const superScript = {
    textAlignVertical: "top",
    fontSize: superFontSize,
    lineHeight: parseInt(fontSize + fontSize * 1.2, 10),
    paddingRight: 10,
  };

  const regular = {
    textAlignVertical: "bottom",
    fontSize: fontSize,
    lineHeight: parseInt(fontSize + fontSize * 1.2, 10),
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

  const removeLongmarks = (text) => {
    return text
      .replaceAll("\u0101", "a")
      .replaceAll("\u012b", "i")
      .replaceAll("\u014d", "o")
      .replaceAll("\u0113", "e")
      .replaceAll("\u016b", "u");
  };

  const currentChapter = LatinPsalms[chapter - 1];

  const getLatintext = () => {
    var verses = "";
    currentChapter.verses.forEach((verse) => {
      verses += verse.text;
    });

    return currentChapter.verses.map((verse) => {
      return (
        <View style={{ flexDirection: "row" }} key={verse.verse}>
          <Text style={[superScript, { flexWrap: "wrap" }]}>{verse.verse}</Text>
          <Text style={regular}>{verse.text.trim()}</Text>
        </View>
      );
    });
  };
  const getESVsubheading = () => {
    var subheading = "";
    const firstVerse = ESVpsalms.filter(
      (verse) => verse.chapter == chapter
    ).find((verse) => verse.verse == "1").text;
    if (firstVerse.startsWith("<subheading>")) {
      subheading = firstVerse.substring(
        firstVerse.indexOf("<subheading>") + 12,
        firstVerse.lastIndexOf("</subheading>")
      );
    }
    return subheading;
  };
  const getESVtext = () => {
    const currentChapter = ESVpsalms.filter(
      (verse) => verse.chapter == chapter
    );
    var verses = [];

    currentChapter.forEach((verse) => {
      var text = verse.text
        .replace("§", "\n")
        .replaceAll("¶", "\n")
        .replaceAll("→", "\t\t");
      if (verse.verse == "1") {
        if (text.startsWith("<subheading>")) {
          text = text.substring(text.lastIndexOf("</subheading>") + 13);
        }
        text = text.trimStart();
      }
      verses.push(text);
    });
    return currentChapter.map((verse) => {
      var text = verse.text
        .replace("§", "\n")
        .replace("¶", "")
        .replaceAll("¶", "\n")
        .replaceAll("→", "\t\t");
      if (verse.verse == "1") {
        if (text.startsWith("<subheading>")) {
          text = text.substring(text.lastIndexOf("</subheading>") + 13);
        }
        text = text.trimStart();
      }
      var newParagraph = false;
      if (text.startsWith("\n")) newParagraph = true;

      return (
        <View style={{ flexDirection: "row" }} key={verse.passage}>
          <Text style={superScript}>
            {newParagraph ? `\n${verse.verse}` : verse.verse}
          </Text>
          <Text style={regular}>{text}</Text>
        </View>
      );
    });
  };

  const getKJVtext = () => {
    const currentChapter = KJVbible.verses
      .filter((verse) => verse.book_name == "Psalms")
      .filter((verse) => verse.chapter == chapter);

    var verses = "";
    currentChapter.forEach((verse) => {
      verses += verse.text;
    });

    return currentChapter.map((verse) => {
      var text = verse.text.replace("¶", "");

      return (
        <View style={{ flexDirection: "row" }} key={verse.passage}>
          <Text style={[superScript, { flexWrap: "wrap" }]}>{verse.verse}</Text>
          <Text style={regular}>{text}</Text>
        </View>
      );
    });
  };

  useEffect(() => {
    if (route.params && route.params.chap) setChapter(route.params.chap);
  }, [route.params]);

  useEffect(() => {
    mainScrollView.current.scrollTo({ x: 0, y: 0, animated: false });
  }, [chapter]);

  return (
    <View style={globalStyles.mainContainer}>
      <ReaderHeader
        chapter={chapter}
        book={currentBook}
        settingsHandler={() => {
          setModalVisible(true);
        }}
      />
      <LanguageToggle lang={lang} setLang={(l) => setLang(l)} t={t} />
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
                  {appLanguage == "English" ? (
                    <Text style={styles.chapterNum}>{chapter}</Text>
                  ) : (
                    <Text style={styles.chapterNum}>
                      {romanizeUpper(chapter)}
                    </Text>
                  )}
                </>
              )}
            </View>
            <View style={{ paddingRight: 20 }}>{getLatintext()}</View>
          </ScrollView>
        ) : (
          <>
            {translation == "KJV" ? (
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
                      {appLanguage == "English" ? (
                        <Text style={styles.chapterNum}>{chapter}</Text>
                      ) : (
                        <Text style={styles.chapterNum}>
                          {romanizeUpper(chapter)}
                        </Text>
                      )}
                    </>
                  )}
                </View>
                <View style={{ paddingRight: 20 }}>{getKJVtext()}</View>
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                ref={mainScrollView}
              >
                <View style={{ paddingVertical: 20 }}>
                  <Text style={styles.chapterNum}>Psalm {chapter}</Text>
                  {getESVsubheading() && (
                    <Text style={{ fontSize: fontSize, fontStyle: "italic" }}>
                      {getESVsubheading()}
                    </Text>
                  )}
                  <View style={{ paddingTop: 20, paddingRight: 20 }}>
                    {getESVtext()}
                  </View>
                </View>
              </ScrollView>
            )}
          </>
        )}
      </View>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <MyPlayer
          chapter={chapter}
          style={{ flex: 1 }}
          playerRef={playerRef}
          onNext={() => {
            navigation.navigate("Reader", {
              name: "Psalm " + chapter,
              chap: chapter + 1,
            });
          }}
          onPrevious={() => {
            setChapter(chapter - 1);
          }}
        />
      </View>
    </View>
  );
}

const LanguageToggle = ({ lang, setLang, t }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setLang("Latin");
        }}
      >
        <View
          style={{
            borderColor: "lightgray",
            borderWidth: 1,
            textAlignVertical: "center",
            textAlign: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: lang === "Latin" ? "white" : "lightgray",
          }}
        >
          <Text>{t("Latin")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLang("English");
        }}
      >
        <View
          style={{
            borderColor: "lightgray",
            borderWidth: 1,
            borderLeftWidth: 0,
            textAlignVertical: "center",
            textAlign: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: lang === "English" ? "white" : "lightgray",
          }}
        >
          <Text>{t("English")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chapterNum: {
    fontSize: 20,
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
