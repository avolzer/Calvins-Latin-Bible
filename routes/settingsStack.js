import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Contents from "../screens/toc";
import Settings from "../screens/settings";
import DrawerHeader from "../shared/drawerHeader";

const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: "black",
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: () => <DrawerHeader navigation={navigation} />,
        }}
      />
    </Stack.Navigator>
  );
}
