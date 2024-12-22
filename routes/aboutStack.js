import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../screens/about";
import EditingNotes from "../screens/editingNotes";
import ContributersAndCredits from "../screens/contributersAndCredits";
import Forward from "../screens/forward";
import BackgroundAndPronunciation from "../screens/backgroundAndPronunciation";
import LatinPerDiem from "../screens/LatinPerDiem";
import MossMethod from "../screens/mossMethod";

const Stack = createStackNavigator();
export default function AboutStack({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: "black",
        },
      }}
    >
      <Stack.Screen name="About" component={About} />
      <Stack.Screen
        name="Contributers and Credits"
        component={ContributersAndCredits}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Editing Procedures"
        component={EditingNotes}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Prefatory Material from Dr. Richard Wevers' Edition"
        component={Forward}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Background and Pronunciation"
        component={BackgroundAndPronunciation}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="LatinPerDiem"
        component={LatinPerDiem}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="MossMethod for Greek"
        component={MossMethod}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
