import React from "react";
import { ScrollView, Text, View, Linking, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

export default function LatinPerDiem({}) {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.paragraph}>
          <Text style={{ fontStyle: "italic" }}>Calvin’s Latin Bible</Text> is
          supported by <Text style={{ fontStyle: "italic" }}>LatinPerDiem</Text>
          . Since 2015, LPD has been bringing a worldwide audience manageable
          Latin and Greek lessons in about four minutes, with in-depth lexical,
          grammatic, syntactic, and semantic analysis. With now more than 2,100
          lessons available on our channel,{" "}
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/latinperdiem");
            }}
          >
            youtube.com/latinperdiem
          </Text>
          , our pedagogical philosophy is that people learn language best when
          they see real-life uses in context, not merely abstractions. We
          provide Latin instruction using actual authors and texts, drawn from
          2300 years of the corpus. We cover a variety of great authors of the
          Latin corpus, including Cicero, Caesar, Vergil, Augustine, Thomas
          Aquinas, Erasmus, Theodore Beza, and other Protestant Reformers. You
          can also sign up for asynchronous courses from beginner to advanced.
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
