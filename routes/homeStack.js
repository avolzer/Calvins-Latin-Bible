import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Reader from "../screens/reader";
import Search from "../screens/search";
import SearchHeader from "../shared/searchHeader";
import ChapterSelection from "../screens/chapters";

const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: "black",
        },
      }}
    >
      <Stack.Screen
        name="Reader"
        component={Reader}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search Bar"
        component={Search}
        options={{
          headerTitle: () => <SearchHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen
        name="Chapter Selection"
        component={ChapterSelection}
        options={{
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
}
