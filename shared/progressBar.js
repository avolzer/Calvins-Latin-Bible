import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

const ProgressBar = ({ positionMillis, durationMillis, sliderValue }) => {
  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return mins + ":" + secs;
  }
  var sliderVal = msToTime(positionMillis);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "red",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.text, { width: 40 }]}>{sliderVal}</Text>
        <Text style={[styles.text, { width: 40 }]}>
          {msToTime(durationMillis)}
        </Text>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        style={styles.slider}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="rgba(255, 255, 255, 0.14)"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "green",
  },
  slider: {
    width: "100%",
  },
});

export default ProgressBar;
