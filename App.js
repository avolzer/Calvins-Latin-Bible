import "./gesture-handler";
import React from "react";
import Navigator from "./routes/tabNav";
import { SettingsContextProvider } from "./context/settingsContext";

export default function App() {
  return (
    <SettingsContextProvider>
      <Navigator />
    </SettingsContextProvider>
  );
}
