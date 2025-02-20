import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export const SettingsContextProvider = (props) => {
  const [appLanguage, setAppLanguage] = useState("en");
  const [showLongmarks, setShowLongmarks] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [translation, setTranslation] = useState("ESV");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem("appSettings");
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setAppLanguage(parsedSettings.appLanguage ?? "en");
          setShowLongmarks(parsedSettings.showLongmarks ?? true);
          setFontSize(parsedSettings.fontSize ?? 20);
          setTranslation(parsedSettings.translation ?? "ESV");
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        const settings = { appLanguage, showLongmarks, fontSize, translation };
        await AsyncStorage.setItem("appSettings", JSON.stringify(settings));
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    };
    saveSettings();
  }, [appLanguage, showLongmarks, fontSize, translation]);

  const toggleLongmarks = () => {
    setShowLongmarks(!showLongmarks);
  };

  return (
    <SettingsContext.Provider
      value={{
        appLanguage,
        setAppLanguage,
        showLongmarks,
        toggleLongmarks,
        fontSize,
        setFontSize,
        translation,
        setTranslation,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
