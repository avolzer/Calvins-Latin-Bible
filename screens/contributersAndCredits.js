import React from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function ContributersAndCredits() {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.subHeading}>Background</Text>
        <Text style={globalStyles.paragraph}>
          In 1557 John Calvin completed and published his commentaries on the
          book of Psalms, Commentarii in Librum Psalmorum. The work came from
          the press of Robert Etienne in Geneva. As had been his practice with
          other books of the Bible, Calvin included at the beginning of each
          Psalm on which he commented his own translation of the text from the
          Hebrew. Like many men of his generation, Calvin was dissatisfied with
          the Vulgate rendering and – like Desiderius Erasmus, Guillaume Budé,
          Jacques Lefèvre d'Étaples, and many others – sought to improve on
          Jerome’s work by bringing to bear the tools of 16th-century philology.
        </Text>
        <Text style={globalStyles.paragraph}>
          This edition was originally prepared by Dr. Richard Wevers, emeritus
          Prof. of Classics at Calvin College, based on the work of the late
          Ford Lewis Battles. The whole of it appeared as a hardbound, handheld
          “Calvin’s Bible” from Dr. Wever’s own Digamma Publishers (Grand
          Rapids, MI). A very limited run of these was released and they are now
          rare items.
        </Text>
        <Text style={globalStyles.subHeading}>Note on pronunciation</Text>
        <Text style={globalStyles.paragraph}>
          Broadly speaking, there are two major approaches to the pronunciation
          of Latin. The first is called the pronuntiatus restitutus, i.e. the
          restored or Classical pronunciation. This is based on careful
          philological research and presents the best possible estimate as to
          what Latin sounded like in the Golden Age of Rome. The second
          pronunciation is called the pronuntiatus ecclesiasticus, or church
          Latin. In reality, this is an Italianate way of speaking Latin, as
          there were as many dialects of the spoken language as there were
          nationalities. We use the classical pronunciation in this work, with
          as much consistency and expressiveness as the reader could manage.
        </Text>
        <Text style={globalStyles.paragraph}>
          The text itself and the natural quantities of each of the vowels were
          carefully researched and applied, using the dictionaries of Lewis and
          Short, DuCange, Gaffiot, etc. We welcome all feedback, especially if
          any errors have been discovered. Please send them to:
          info@latinperdiem.com.
        </Text>
        <Text style={globalStyles.paragraph}>
          The following individuals contributed their time and expertise to this
          project and are gratefully acknowledged. {`\n\n`}Joan Crist (research
          supervisor){`\n\n`}Mishka Fernando (audio engineer) {`\n\n`}Natalie
          Mouw (research assistant) {`\n\n`}Jillian Noe (research assistant){" "}
          {`\n\n`}
          David Noe (audio recordings, project supervisor) {`\n\n`}Adrienne Ora
          (research assistant)
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
