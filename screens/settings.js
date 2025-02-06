import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
} from "react-native";
import { globalStyles } from "../styles/global";
import { SettingsContext } from "../context/settingsContext";
import { useNavigation } from "@react-navigation/native";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function Settings() {
  const {
    appLanguage,
    setAppLanguage,
    showLongmarks,
    toggleLongmarks,
    fontSize,
    setFontSize,
    translation,
    setTranslation,
  } = useContext(SettingsContext);

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressAppLanguage = () => {
    const options = [t("English"), t("Latin"), t("Cancel")];
    const valToIndex = { en: 0, ltn: 1 };
    const indexToVal = { 0: "en", 1: "ltn" };

    const selectedIndex = valToIndex[appLanguage];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: selectedIndex,
      },
      (selectedIndex) => {
        if (selectedIndex !== cancelButtonIndex) {
          i18n.changeLanguage(indexToVal[selectedIndex]);
          setAppLanguage(indexToVal[selectedIndex]);
        }
      }
    );
  };
  const onPressFontSize = () => {
    const options = [
      t("Small"),
      t("Medium"),
      t("Large"),
      t("Extra Large"),
      t("Cancel"),
    ];
    const indexToFontSize = { 0: 14, 1: 20, 2: 24, 3: 30 };
    const fontSizeToIndex = { 14: 0, 20: 1, 24: 2, 30: 3 };

    const selectedIndex = fontSizeToIndex[fontSize] ?? -1;
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: selectedIndex,
      },
      (selectedIndex) => {
        if (selectedIndex in indexToFontSize) {
          if (selectedIndex !== cancelButtonIndex) {
            setFontSize(indexToFontSize[selectedIndex]);
          }
        }
      }
    );
  };
  const onPressTranslation = () => {
    const options = ["ESV", "KJV", t("Cancel")];

    const selectedIndex = options.indexOf(translation);
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: selectedIndex,
      },
      (selectedIndex) => {
        if (selectedIndex !== cancelButtonIndex) {
          setTranslation(options[selectedIndex]);
        }
      }
    );
  };
  const fontSizes = {
    12: "Small",
    20: "Medium",
    24: "Large",
    30: "Extra Large",
  };

  return (
    <View style={globalStyles.mainContainer}>
      <View style={{ paddingTop: 60 }}>
        <Text style={{ fontSize: 35, paddingBottom: 24, paddingLeft: 24 }}>
          {t("Settings")}
        </Text>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={onPressAppLanguage}
        >
          <View style={{ gap: 8 }}>
            <Text style={styles.text}>{t("App language")}</Text>
            <Text style={styles.label}>
              {appLanguage == "en" ? t("English") : t("Latin")}
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.option]}
          underlayColor={"#e0e0e0"}
          onPress={onPressFontSize}
        >
          <View style={{ gap: 8 }}>
            <Text style={styles.text}>{t("Font size")}</Text>
            <Text style={styles.label}>{t(fontSizes[fontSize])}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.option]}
          underlayColor={"#e0e0e0"}
          onPress={onPressTranslation}
        >
          <View style={{ gap: 8 }}>
            <Text style={styles.text}>{t("Translation")}</Text>
            <Text style={styles.label}>{translation}</Text>
          </View>
        </TouchableHighlight>
        <View style={[styles.option]}>
          <Text style={styles.text}>{t("Show long marks")}</Text>
          <View>
            <Switch
              style={{ flex: 1 }}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={global.showLongmarks ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleLongmarks();
              }}
              value={showLongmarks}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
  },
  option: {
    paddingVertical: 20,
    color: "#f9f9f9",
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
