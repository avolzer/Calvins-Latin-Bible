import React from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function EditingNotes() {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.paragraph}>
          We began by copying each of the biblical texts from Dr. Wevers’ notes,
          which required a degree of re-formatting, as they included a good deal
          of superfluous spacing and often some unintended duplication. There
          were a number of verses which Calvin commented upon, but did not
          translate himself, which we supplied from Theodore Beza’s translation,
          found in his 1598 Jesu Christi Domini nostri Novum Testamentum, sive
          Novum Foedus. When we had a workable text, we used an online
          macronizer to add in most of the correct macra to the text, but there
          were still a number of errors to be fixed. The macronizer had a few
          habitual errors, especially adding a long ē at the end of imperative
          plurals, which we had to correct, along with making a judgment call on
          ambiguous cases determined by context. Third declension feminine
          nominatives ending in -as, for example, we marked short, following
          Lewis and Short, though some sources mark them long.
        </Text>
        <Text style={globalStyles.paragraph}>
          There were also a number of words not recognized by the macronizer,
          mostly non-Latinate words and names, which we carefully noted in order
          to make consistent decisions thereafter.
        </Text>
        <Text style={globalStyles.paragraph}>
          Next, each verse was reviewed to double check the macronization and to
          check the sense of the passage. To assist in this, we utilized the
          rather wooden English translation of Calvin’s text found in the CCEL,
          and read through his commentary when a verse seemed odd. These
          comments sometimes indicate that Calvin himself believed the original
          text to be ambiguous, and this has been reflected in notes. We
          confirmed the macronization of certain unusual or unfamiliar words
          using standard dictionaries.
        </Text>
        <Text style={globalStyles.paragraph}>
          The ultimate authority on a reading, and the source of Dr. Wevers’
          text, was always J. J. Schipper’s 1667-1671 series of editions of
          Calvin’s commentaries. All suspect readings were checked against
          Schipper, revealing occasional errors in Dr. Wever’s notes, or errors
          resident in the digital files we received. The editions were also
          checked for certain matters of formatting, especially concerning
          direct quotations in the text, which Schipper begins with a capital
          letter.
        </Text>
        <Text style={globalStyles.paragraph}>
          These capitalizations almost always match the quotation marks found in
          modern notation, but there are occasional discrepancies. We decided to
          follow Schipper in these instances as well, so that there are a few
          direct quotes which are not indicated in the text.
        </Text>
        <Text style={globalStyles.paragraph}>
          We also followed Schipper in matters of spelling, even where there
          were inconsistencies, such as the various spellings of “Hallelujah”
          throughout the Psalms, or where medieval or non-standard spellings
          were used. Psalm 119 was recorded and presented in separate stanzas
          with transliterated Hebrew letter headings, as this was its division
          in Calvin’s original translation.
        </Text>
      </ScrollView>
    </View>
  );
}
