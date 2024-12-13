import React from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.mainContainer}>
      <View style={{ paddingTop: 75 }}>
        <Text style={{ fontSize: 35, paddingBottom: 10, paddingLeft: 20 }}>
          About
        </Text>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("Contributers And Credits");
          }}
        >
          <Text style={globalStyles.text}>Contributers and Credits</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("A Note on Editing Procedures");
          }}
        >
          <Text style={globalStyles.text}>A Note on Editing Procedures</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate(
              "Prefatory Material from Dr. Richard Wevers' Edition"
            );
          }}
        >
          <Text style={globalStyles.text}>
            Prefatory Material from Dr. Richard Wevers' Edition
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{ backgroundColor: "#f9f9f9", height: "100%" }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  option: {
    paddingVertical: 14,
    color: "#f9f9f9",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    paddingLeft: 20,
  },
});

export default About;
