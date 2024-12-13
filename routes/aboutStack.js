import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../screens/about";
import EditingNotes from "../screens/editingNotes";
import ContributersAndCredits from "../screens/contributersAndCredits";
import Forward from "../screens/forward";

const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
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
        name="Contributers And Credits"
        component={ContributersAndCredits}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="A Note on Editing Procedures"
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
    </Stack.Navigator>
  );
}
