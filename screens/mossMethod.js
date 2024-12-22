import React from "react";
import { ScrollView, Text, View, Linking, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

export default function MossMethod({}) {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.paragraph}>
          This app is also supported by{" "}
          <Text style={{ fontStyle: "italic" }}>MossMethod for Greek</Text> the
          program Dr. Noe developed to help learners go from neophyte to
          erudite. Anyone who has attempted to learn Greek from the leading
          textbooks available today – whether for Koine or Attic – can easily
          see for themselves how little actual Greek language the majority of
          them contain. Most of these textbooks contain only a small amount of
          actual Greek, and mostly explain rules and grammar. Some do this well,
          some poorly, but few provide nearly enough Greek sentences and
          exercises, volume, for a student to make any progress, gain any
          confidence.
        </Text>
        <Text style={globalStyles.paragraph}>
          Make no mistake, the understanding of grammar and constructions,
          learning forms and rules and applying them, is essential to a strong
          knowledge of Greek. But these skills arise from working with Greek and
          must not be learned in isolation.
        </Text>
        <Text style={globalStyles.paragraph}>
          In this way, MossMethod is quite different: the student begins reading
          simple, connected Greek prose on the first day and continues to do so
          until the end of the course. You can see Dr. Noe’s many free Greek
          lessons at{" "}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/latinperdiem");
            }}
          >
            youtube.com/latinperdiem
          </Text>
          , or sign up for his Greek courses at{" "}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL("https://www.MossMethod.com");
            }}
          >
            MossMethod.com
          </Text>
          .
        </Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});
