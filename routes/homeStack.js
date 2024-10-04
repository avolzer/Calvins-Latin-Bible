import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Reader from "../screens/reader";
import Search from "../screens/search";
import SearchHeader from "../shared/searchHeader";
import ChapterSelection from "../screens/chapters";

const Stack = createStackNavigator();
export default function HomeStack({ navigation }) {
  // function headerText() {
  //   if (global.language == "English") {
  //     return "Calvin's Latin Psalter";
  //   } else {
  //     return "Psalmi Ab Iohanne Calvini";
  //   }
  // }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgba(34, 36, 40, 1)",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="Reader"
        component={Reader}
        options={{
          headerShown: false,
          // headerTitle: () => <ReaderHeader />,
          // headerRight: () => <HomeHeader navigation={navigation} />,
        }}
        // options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Search Bar"
        component={Search}
        options={{
          headerTitle: () => <SearchHeader navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="Chapter Selection"
        component={ChapterSelection}
        options={{
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
}
