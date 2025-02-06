import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const About = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.mainContainer}>
      <View style={{ paddingTop: 60 }}>
        <Text style={{ fontSize: 35, paddingBottom: 24, paddingLeft: 24 }}>
          About
        </Text>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("Background and Pronunciation");
          }}
        >
          <Text style={globalStyles.text}>Background and Pronunciation</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("Editing Procedures");
          }}
        >
          <Text style={globalStyles.text}>Editing Procedures</Text>
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
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("Contributors and Credits");
          }}
        >
          <Text style={globalStyles.text}>Contributors and Credits</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("LatinPerDiem");
          }}
        >
          <Text style={globalStyles.text}>LatinPerDiem</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.option}
          underlayColor={"#e0e0e0"}
          onPress={() => {
            navigation.navigate("MossMethod for Greek");
          }}
        >
          <Text style={globalStyles.text}>MossMethod for Greek</Text>
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
