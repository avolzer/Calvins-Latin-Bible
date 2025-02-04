import React from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function ContributorsAndCredits() {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.paragraph}>
          The following individuals contributed their time and expertise to this
          project and are gratefully acknowledged. {`\n\n`}Joan Crist (research
          supervisor){`\n\n`}Mishka Fernando (audio engineer) {`\n\n`}Natalie
          Mouw (research assistant) {`\n\n`}
          David Noe (audio recordings, project supervisor) {`\n\n`}Jillian Noe
          (research assistant){`\n\n`}Adrienne Ora (research assistant)
          {`\n\n`}Patrick Owens (Latin consultant) {`\n\n`}April Volzer
          (programmer)
          {`\n\n`}Tyson Watson (research assistant)
          {`\n\n`}
          SOLI DEO GLORIA
        </Text>
      </ScrollView>
    </View>
  );
}
