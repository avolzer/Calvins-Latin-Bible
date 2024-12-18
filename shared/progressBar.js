import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

const ProgressBar = ({
  positionMillis,
  durationMillis,
  sliderValue,
  onSlidingStart,
  onSeek,
}) => {
  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    const secString = secs < 10 ? `0${secs}` : secs;

    return mins + ":" + secString;
  }
  var sliderVal = msToTime(positionMillis);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
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
        onSlidingStart={onSlidingStart}
        onSlidingComplete={(value) => {
          onSeek(value);
        }}
        value={sliderValue}
        style={styles.slider}
        minimumTrackTintColor="#1B572F"
        maximumTrackTintColor="#737373"
        thumbTintColor="#1B572F"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  slider: {
    width: "100%",
  },
  text: {
    color: "black",
  },
});

export default ProgressBar;
