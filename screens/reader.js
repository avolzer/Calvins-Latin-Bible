import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Animated,
  FlatList,
  useWindowDimensions,
} from "react-native";
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
import { romanizeNumeral } from "../tools/romanizeNumeral";
import { removeLongmarks } from "../tools/removeLongmarks";

export default function Reader({ route }) {
  const { width } = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current.interpolate({
    inputRange: [0, 50], // Adjust input range based on the scroll sensitivity you want
    outputRange: [0, 50], // Output range smoothens the response
    extrapolate: "clamp", // Ensure values don't exceed the specified range
  });
  const navigation = useNavigation();
  const { t } = useTranslation();

  const { appLanguage, showLongmarks, fontSize, translation } =
    useContext(SettingsContext);

  const playerRef = useRef();
  const mainScrollView = useRef();
  const flatListRef = useRef(null);

  const [lang, setLang] = useState("Latin");
  const [currentBook, setCurrentBook] = useState("Psalm");
  const [chapter, setChapter] = useState(1);
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

  const curChap = LatinPsalms[chapter - 1];

  const getLatintext = (ch) => {
    var verses = "";
    ch.verses.forEach((verse) => {
      verses += verse.text;
    });

    return ch.verses.map((verse) => {
      return (
        <View style={{ flexDirection: "row" }} key={verse.verse}>
          <Text style={[superScript, { flexWrap: "wrap" }]}>{verse.verse}</Text>
          <Text style={regular}>
            {showLongmarks
              ? verse.text.trim()
              : removeLongmarks(verse.text.trim())}
          </Text>
        </View>
      );
    });
  };
  const getESVsubheading = (ch) => {
    var subheading = "";
    const firstVerse = ESVpsalms.filter((verse) => verse.chapter == ch).find(
      (verse) => verse.verse == "1"
    ).text;
    if (firstVerse.startsWith("<subheading>")) {
      subheading = firstVerse.substring(
        firstVerse.indexOf("<subheading>") + 12,
        firstVerse.lastIndexOf("</subheading>")
      );
    }
    return subheading;
  };
  const getESVtext = (ch) => {
    const curChap = ESVpsalms.filter((verse) => verse.chapter == ch);
    var verses = [];

    curChap.forEach((verse) => {
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
    return curChap.map((verse) => {
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

  const getKJVtext = (ch) => {
    const curChap = KJVbible.verses
      .filter((verse) => verse.book_name == "Psalms")
      .filter((verse) => verse.chapter == ch)
      .filter((verse) => verse.verse > 0);

    return curChap.map((verse) => {
      var text = verse.text.replace("¶", "");

      return (
        <View style={{ flexDirection: "row" }} key={verse.verse}>
          <Text style={[superScript, { flexWrap: "wrap" }]}>{verse.verse}</Text>
          <Text style={regular}>{text}</Text>
        </View>
      );
    });
  };

  const getKJVsubHeading = (ch) => {
    const subheading = KJVbible.verses.find(
      (verse) =>
        verse.book_name == "Psalms" && verse.chapter == ch && verse.verse == 0
    );

    return subheading?.text || undefined;
  };

  useEffect(() => {
    if (route.params && route.params.chap) {
      setChapter(route.params.chap);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: route.params.chap - 1,
          animated: false,
        });
      }
    }
  }, [route.params]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("didFocus", () => {});
    return unsubscribe;
  }, [navigation]);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setChapter(viewableItems[0].item.chapter);
  }).current;

  const renderChapter = (chapter) => {
    return (
      <View style={{ flex: 1 }}>
        {lang == "Latin" ? (
          <ScrollView
            style={{ width: width, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
            ref={mainScrollView}
            nestedScrollEnabled
          >
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <Text style={styles.chapterNum}>
                {showLongmarks
                  ? chapter.chapterLatin
                  : removeLongmarks(chapter.chapterLatin)}
              </Text>
              {chapter.superscription && (
                <Text style={{ fontSize: fontSize, fontStyle: "italic" }}>
                  {showLongmarks
                    ? chapter.superscription
                    : removeLongmarks(chapter.superscription)}
                </Text>
              )}
            </View>
            <View style={{ paddingRight: 20, width: "100%" }}>
              {getLatintext(chapter)}
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={{ width: width, paddingHorizontal: 24 }}
            showsVerticalScrollIndicator={false}
            ref={mainScrollView}
            nestedScrollEnabled
          >
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              {translation === "ESV" ? (
                <>
                  <Text style={styles.chapterNum}>Psalm {chapter.chapter}</Text>
                  {getESVsubheading(chapter.chapter) && (
                    <Text style={{ fontSize: fontSize, fontStyle: "italic" }}>
                      {getESVsubheading(chapter.chapter)}
                    </Text>
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.chapterNum}>{chapter.chapter}</Text>

                  {getKJVsubHeading(chapter.chapter) && (
                    <Text style={{ fontSize: fontSize, fontStyle: "italic" }}>
                      {getKJVsubHeading(chapter.chapter)}
                    </Text>
                  )}
                </>
              )}
            </View>
            <View style={{ paddingRight: 20, width: "100%" }}>
              {translation === "ESV"
                ? getESVtext(chapter.chapter)
                : getKJVtext(chapter.chapter)}
            </View>
          </ScrollView>
        )}
      </View>
    );
  };

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

      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={LatinPsalms}
          renderItem={({ item }) => renderChapter(item)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.chapter}
          onViewableItemsChanged={viewableItemsChanged}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScroll={() => {
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            );
          }}
        />
      </View>
      <View>
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
            borderColor: "#1B572F",
            borderWidth: 1,
            textAlignVertical: "center",
            textAlign: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            backgroundColor: lang === "Latin" ? "#1B572F" : "white",
          }}
        >
          <Text style={{ color: lang === "Latin" ? "white" : "black" }}>
            {t("Latin")}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLang("English");
        }}
      >
        <View
          style={{
            borderColor: "#1B572F",
            borderWidth: 1,
            borderLeftWidth: 0,
            textAlignVertical: "center",
            textAlign: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: lang === "English" ? "#1B572F" : "white",
          }}
        >
          <Text style={{ color: lang === "English" ? "white" : "black" }}>
            {t("English")}
          </Text>
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
});
