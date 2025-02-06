import React, { useState } from "react";

export const SettingsContext = React.createContext();

export const SettingsContextProvider = (props) => {
  const [appLanguage, setAppLanguage] = useState("en");
  const [showLongmarks, setShowLongmarks] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [translation, setTranslation] = useState("ESV");

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
