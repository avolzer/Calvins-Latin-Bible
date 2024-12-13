import "./gesture-handler";
import React, { useState } from "react";
import Navigator from "./routes/tabNav";
import { SettingsContextProvider } from "./context/settingsContext";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";

const ref = createNavigationContainerRef();

export default function App() {
  const [routeName, setRouteName] = useState();
  return (
    <SettingsContextProvider>
      <NavigationContainer
        ref={ref}
        onReady={() => {
          setRouteName(ref.getCurrentRoute().name);
        }}
        onStateChange={async () => {
          const previousRouteName = routeName;
          const currentRouteName = ref.getCurrentRoute().name;
          setRouteName(currentRouteName);
        }}
      >
        <Navigator routeName={routeName} />
      </NavigationContainer>
    </SettingsContextProvider>
  );
}
