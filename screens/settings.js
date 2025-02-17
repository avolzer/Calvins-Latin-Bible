import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";
import { SettingsContext } from "../context/settingsContext";
import "../assets/i18n/i18n";
import { useTranslation } from "react-i18next";
import { useActionSheet } from "@expo/react-native-action-sheet";
import SubscriptionModal from "../shared/subscriptionModal";
import useRevenueCat from "../hooks/useRevenueCat";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
  const { isProMember } = useRevenueCat();
  // const isProMember = true;

  const { t, i18n } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const [subscribeModalVisible, setSubscribeModalVisible] = useState(false);
  const [unsubscribeModalVisible, setUnsubscribeModalVisible] = useState(false);

  const onPressAppLanguage = () => {
    const options = [t("English"), t("Latin"), t("Cancel")];
    const indexToVal = { 0: "en", 1: "ltn" };

    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: cancelButtonIndex,
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

    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: cancelButtonIndex,
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

    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex: cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex !== cancelButtonIndex) {
          setTranslation(options[selectedIndex]);
        }
      }
    );
  };
  const fontSizes = {
    14: "Small",
    20: "Medium",
    24: "Large",
    30: "Extra Large",
  };

  return (
    <View style={[globalStyles.mainContainer]}>
      <View style={{ paddingTop: 60, flex: 1 }}>
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
      <View
        style={{
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        {isProMember ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setUnsubscribeModalVisible(true);
              }}
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
            </TouchableOpacity>
            <SubscriptionModal
              modalVisible={unsubscribeModalVisible}
              setModalVisible={setUnsubscribeModalVisible}
              subscribed={true}
            />
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                setSubscribeModalVisible(true);
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
              <Text style={{ color: "white", fontSize: 18 }}>
                Upgrade to Premium
              </Text>
            </TouchableOpacity>
            <SubscriptionModal
              modalVisible={subscribeModalVisible}
              setModalVisible={setSubscribeModalVisible}
              subscribed={false}
            />
          </>
        )}
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
