import "./gesture-handler";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Platform } from "react-native";
import Navigator from "./routes/tabNav";
import { SettingsContextProvider } from "./context/settingsContext";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import "intl-pluralrules";

SplashScreen.preventAutoHideAsync();
const ref = createNavigationContainerRef();

export default function App() {
  const [routeName, setRouteName] = useState();
  const [animationCompleted, setAnimationComplete] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActionSheetProvider>
        {!animationCompleted ? (
          <View style={{ backgroundColor: "#1B572F" }}>
            <LottieView
              source={require("./assets/splash.json")}
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                setAnimationComplete(true);
              }}
            />
          </View>
        ) : (
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
        )}
      </ActionSheetProvider>
    </SafeAreaView>
  );
}
