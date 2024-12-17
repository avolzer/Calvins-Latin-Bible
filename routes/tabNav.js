import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../routes/homeStack";
import AboutStack from "../routes/aboutStack";
import Settings from "../screens/settings";
import { FontAwesome } from "@expo/vector-icons";

export default function Navigator(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Read"
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#4BA669",
        tabBarInactiveTintColor: "#737373",
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,

        headerShown: true,
        tabBarStyle: {
          display: props.routeName == "Search Bar" ? "none" : "flex",
          backgroundColor: "white",
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 5,
          height: 70,
        },
      })}
    >
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          headerTintColor: "white",
          headerShown: false,

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome
                name="info-circle"
                size={25}
                color={focused ? "#4BA669" : "#737373"}
              ></FontAwesome>
            );
          },
        }}
      />

      <Tab.Screen
        name="Read"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome
                name="book"
                size={25}
                color={focused ? "#4BA669" : "#737373"}
              ></FontAwesome>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <FontAwesome
                name="gear"
                size={25}
                color={focused ? "#4BA669" : "#737373"}
              ></FontAwesome>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
