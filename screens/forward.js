import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

export default function Forward() {
  return (
    <View style={globalStyles.mainContainer}>
      <ScrollView
        style={globalStyles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={globalStyles.paragraph}>
          After my publication of{" "}
          <Text style={{ fontStyle: "italic" }}>
            A Concordance to the Latin Bible of John Calvin
          </Text>{" "}
          in 1985 I received numerous suggestions to publish the text of John
          Calvin’s Latin Bible in a more convenient form. Though the entire text
          of his Bible was published as part of that earlier six volume work,
          many expressed interest in having available in more accessible form
          the Bible text itself, separate from the bulky volumes of the
          concordance. This publication is my response to those suggestions.
        </Text>
        <Text style={globalStyles.paragraph}>
          Information about the text of Calvin’s Latin Bible was already
          published with that earlier publication, but I repeat some of that
          information here. It will help explain how the text of Calvin’s Bible
          was able to be reconstructed, and why a separate publication of it
          seems worthwhile.
        </Text>
        <Text style={globalStyles.paragraph}>
          The text of Calvin’s Latin Bible does not exist independently. No such
          Bible was ever published. Calvin did, however, present a Latin text
          for most parts of the Bible in the course of writing his commentaries
          on the Bible. In his commentaries, Calvin’s Latin version of the
          Biblical text was presented in tandem with his comment. This Latin
          text is, as T.H.L. Parker has demonstrated for the New Testament (
          <Text style={{ fontStyle: "italic" }}>
            Calvin’s New Testament Commentaries
          </Text>
          , Grand Rapids, Mich: Eerdmans, 1971) an independent translation. Even
          though heavily reliant on the Vulgate, and respectful of the work of
          Erasmus and others, it is Calvin’s version based on his own study of
          currently available Greek and Hebrew texts.
        </Text>
        <Text style={globalStyles.paragraph}>
          Thus Calvin’s Latin Bible does exist, but it is scattered throughout
          his commentaries. It is that text which is here collected,
          reconstructed and printed in book by book form. One may now read
          Calvin’s Latin Bible, or check Calvin’s rendering of particular
          passages, without paging through his voluminous commentaries.
        </Text>
        <Text style={globalStyles.paragraph}>
          Since Calvin did not write commentaries on all the books of the Bible,
          there is no text for some books. There is thus no text for the
          historical books of Judges, Ruth, Second Samuel, First and Second
          Kings, First and Second Chronicles, nor for Proverbs, Ecclesiastes,
          and the Song of Solomon. In the New Testament there is no text for
          Second and Third John nor for Revelation. In a few places Calvin does
          not give a particular verse even though there is a full commentary on
          the chapter and book. Such omissions are marked by [--] in text here
          printed.
        </Text>
        <Text style={globalStyles.paragraph}>
          There is no distinctly modern edition of the text of Calvin’s
          commentaries except for that of Romans done recently by T.H.L Parker (
          <Text style={{ fontStyle: "italic" }}>
            Iohannis Calvini Commentarius in Epistolam Pauli ad Romanos
          </Text>
          , Leiden: E.J. Brill, 1981.) For that reason the commentary text used
          to reconstruct the Biblical text is the one given in J.J. Schipper’s
          edition of Calvin’s works, done in Amsterdam, 1667-1671. It is a sound
          text and the best available. Schipper’s text has been followed
          consistently, except for the correcting of about three dozen obviously
          typographical errors.
        </Text>
        <Text style={globalStyles.subHeading}>Variant Readings</Text>
        <Text style={globalStyles.paragraph}>
          Some problems arise in attempting to reconstruct the Biblical text
          from the larger text of the commentaries. The Biblical text Calvin
          presented with his comment on certain verses sometimes overlaps with
          or partially repeats what was already presented with another part.
          Occasionally these two texts are inconsistent with each other and thus
          result in variant readings. No notice is made of such a variant
          reading if the variation consists only of punctuation. But in those
          instances where there is an actual change in words or spelling, the
          reader is alerted to the existence of an alternate reading, not by
          printing both readings in the body of the text, but by an * printed
          directly after the verse number. This signals that a variant reading
          or readings for this verse exist. The essential parts of each of the
          verses thus marked is printed below, with the actual words which make
          up the alternate readings underlined.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 3:6</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              et <Text style={styles.underline}>siste eam</Text>
              {` (`}
              <Text style={styles.underline}>stare facias</Text>
              {`) coram Aharone`}
              sacerdote, ut <Text style={styles.underline}>ministret</Text>
              {" ("}
              <Text style={styles.underline}>ministrent</Text>
              {`) ei.`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 3:7</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              tabernaculo <Text style={styles.underline}>conventionis</Text>
              {" ("}
              <Text style={styles.underline}>ecclessiae</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 3:8</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              tabernaculi <Text style={styles.underline}>conventionis</Text>
              {" ("}
              <Text style={styles.underline}>ecclessiae</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 3:9</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              sunt illi <Text style={styles.underline}>ex</Text>
              {" ("}
              <Text style={styles.underline}>a</Text>
              {`) filiis Israel.`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 3:10</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              suum: externus <Text style={styles.underline}>enim</Text>
              {" ("}
              <Text style={styles.underline}>sane</Text>
              {`) qui accesserit`}
              morietur.
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 33:38</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              montem <Text style={styles.underline}>secundum</Text>
              {" ("}
              <Text style={styles.underline}>iuxta</Text>
              {`) semonem Jehovae: et mortuus est `}
              <Text style={styles.underline}>ibi, anno</Text>
              {" ("}
              <Text style={styles.underline}>anno</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Numb 33:39</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Erat</Text>
              {" ("}
              <Text style={styles.underline}>Eratque</Text>
              {`) Aharon natus centum `}
              <Text style={styles.underline}>ac</Text>
              {" ("}
              <Text style={styles.underline}>et</Text>
              {`) viginti tres annos`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 2:8</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Eripit</Text>
              {" ("}
              <Text style={styles.underline}>Erigit</Text>
              {`) e pulvere tenuem.`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 2:11</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Denique</Text>
              {" ("}
              <Text style={styles.underline}>Et</Text>
              {") abiit Elcana "}
              <Text style={styles.underline}>Ramam</Text>
              {" ("}
              <Text style={styles.underline}>in Ramatha,</Text>
              {") in domum suam…"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 2:25</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Non tamen auscultarunt voci</Text>
              {" ("}
              <Text style={styles.underline}>Et non audierunt vocem</Text>
              {") ... "}
              <Text style={styles.underline}>
                quia volebat Jehova morte afficere eos.
              </Text>
              {" ("}
              <Text style={styles.underline}>
                quia voluit Dominus occidere eos.
              </Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 8:7</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Dixit autem Dominus Ad Samuelem,
              </Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Sed dixit Jehova Samueli,
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 15:6</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>cum</Text>
              {" ("}
              <Text style={styles.underline}>quum</Text>
              {") ascenderent de Aegypto"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 15:15</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Et ait Saul, De <Text style={styles.underline}>Amalec</Text>
              {" ("}
              <Text style={styles.underline}>Hamalech</Text>
              {") adduxerunt"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 15:20</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              et adduxi Agag Regem{" "}
              <Text style={styles.underline}>Hamalec, et Hamalec</Text>{" "}
              interfeci.{"\n\n"}
              <Text style={{ fontStyle: "italic" }}>
                et adduxi Agag Regem,{" "}
              </Text>
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                et Amalec
              </Text>{" "}
              <Text style={{ fontStyle: "italic" }}> interfeci. </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 15:21</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Tulit autem{" "}
              <Text style={styles.underline}>populus de praeda</Text>
              {" ("}
              <Text style={styles.underline}>de praeda populus</Text>
              {") oves et boves"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 17:37</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              ipse <Text style={styles.underline}>liberabit me</Text>
              {" ("}
              <Text style={styles.underline}>me liberabit</Text>
              {") de manu Philistaei hujus"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 19:23</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              et factus est etiam super eum Spiritus{" "}
              <Text style={styles.underline}>Domini</Text>
              {" ("}
              <Text style={styles.underline}>Dei</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>1 Sam 20:13</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Haec faciat Dominus Jonathae, et haec{" "}
              <Text style={styles.underline}>augeat. Si</Text>
              {" ("}
              <Text style={styles.underline}>addat: si</Text>
              {") ..."}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 6:8</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                O siquis daret evenire petitionem meam, et ut exspectationem
                meam daret Deus.
              </Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Quis det ut veniat postulatio mea, et exspectationem meam det
                Deus?
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 6:9</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Et</Text>
              {" ("}
              <Text style={styles.underline}>O si</Text>
              {") placeret Deo"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 8:13</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Ita sunt semitae</Text>
              {" ("}
              <Text style={styles.underline}>Sic semitae sunt</Text>
              {") hypocritarum,"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 20:20</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Nihil in ventriculo sentiet, in quo acquiescat, nec quod cupiit
                poterit servare.
              </Text>
              {"\n\n"}
              <Text
                style={{ textDecorationLine: "underline", fontStyle: "italic" }}
              >
                Non agnoscet satietam in ventre suo, nec servabit desiderium
                suum.
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 27:8</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Quae{" "}
              <Text style={styles.underline}>
                enim spes est hypocritae, quum collegerit, et Deus ipsius
              </Text>
              {"\n\n"}
              <Text style={{ fontStyle: "italic" }}>
                Quae{" "}
                <Text style={styles.underline}>
                  spes est hypocritae, quando collegerit, et Deus illius
                </Text>
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 27:19</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Quando dives <Text style={styles.underline}>dormiet</Text>
              {" ("}
              <Text style={styles.underline}>somno se dabit</Text>
              {") ..."}
              <Text style={styles.underline}>nihil apparebit.</Text>
              {" ("}
              <Text style={styles.underline}>nihil ipsis se offeret.</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 29:13</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              erat,{" "}
              <Text style={styles.underline}>
                ad me perveniebat, et viduae cor consolabar.
              </Text>
              {"\n\n"}
              <Text style={{ fontStyle: "italic" }}>
                erat,{" "}
                <Text style={styles.underline}>
                  super me erat, cor viduae exhilarabam.
                </Text>
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 30:21</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Tu convertisti te adversus me ad crudelitatem, et mihi
                adversaris robore manuum tuarum.
              </Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Convertisti te, tanquam crudelem factum, adversus me, et
                rapuisti me in robore manus tuae.
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 33:14</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Deus semel et bis{" "}
              <Text style={styles.underline}>
                loquitur, non advertente animum homine.
              </Text>
              {" ("}
              <Text style={styles.underline}>
                loquetur, nec tamen audietur.
              </Text>
              {") "}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 33:26</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Deum orabit, et placabit ipsum, et videbit faciem ejus in
                jubilo,
              </Text>
              {" ...\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Deum precabitur, qui ipsi propitius erit: faciem ejus cum jubilo
                videbit,
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 34:26</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Pro impiis percutit eos</Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Percutit ipsos tanquam improbos
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 34:29</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                si abscondat faciem quis intuebitur illum? quin et{" "}
              </Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Quumque faciem suam absconderit, quis illam poterit intueri?
                ipse est
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 35:7</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Non prohibet a justo oculos suos.
              </Text>
              {"\n\n"}
              <Text style={[styles.underline, { fontStyle: "italic" }]}>
                Non avertet oculos suos a justo.
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 36:6</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              Non vivificat{" "}
              <Text style={styles.underline}>
                impium, judicium autem pauperum dat.{" "}
              </Text>
              {" ("}
              <Text style={styles.underline}>
                improbum, et dat judicium afflicitis.
              </Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Job 38:4</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>id declara,</Text>
              {" ("}
              <Text style={styles.underline}>ostende mihi,</Text>
              {") si intelligentia "}
              <Text style={styles.underline}>praeditus es. </Text>
              {" ("}
              <Text style={styles.underline}>es praeditus.</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Jere 24:17</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              ecce <Text style={styles.underline}>ego promulgo</Text>
              {" ("}
              <Text style={styles.underline}>ostende mihi,</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Jere 34:16</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>profanastis</Text>
              {" ("}
              <Text style={styles.underline}>polluistis</Text>
              {") nomen meum…subegistis "}
              <Text style={styles.underline}>ipsos</Text>
              {" ("}
              <Text style={styles.underline}>eos</Text>
              {") …in servos et "}
              <Text style={styles.underline}>ancillas.</Text>
              {" ("}
              <Text style={styles.underline}>in ancillas.</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Jere 49:24</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>Remissa</Text>
              {" ("}
              <Text style={styles.underline}>Debilitata</Text>
              {") est Damascus … eam "}
              <Text style={styles.underline}>ipsos</Text>
              {" ("}
              <Text style={styles.underline}>eos</Text>
              {") …in servos et "}
              <Text style={styles.underline}>tanquam parturientem.</Text>
              {" ("}
              <Text style={styles.underline}>sicut parturientem</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Ezec 16:40</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>
                Et superbe se extulit, et fecit
              </Text>
              …coram{" "}
              <Text style={styles.underline}>
                {" "}
                me, et abstuli ipsos quemadmodum vidi.
              </Text>
              {"\n\n"}
              <Text style={{ fontStyle: "italic" }}>
                <Text style={styles.underline}>extulit se, et fecurunt</Text>…
                coram{" "}
                <Text style={styles.underline}>
                  facie mea, et abstuli eas, quemadmovum volui.
                </Text>
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Mark 4:24</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              qua mensura metimini, eadem{" "}
              <Text style={styles.underline}>fiet vobis admensio,</Text>
              {" ("}
              <Text style={styles.underline}>remetietur vobis.</Text>
              {")"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.paragraph}>Luke 9:26 </Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={globalStyles.paragraph}>
              <Text style={styles.underline}>ac sermonum meorum</Text>
              {" ("}
              <Text style={styles.underline}>meorumque sermonum</Text>
              {") … in "}
              <Text style={styles.underline}>majestate</Text>
              {" ("}
              <Text style={styles.underline}>loria</Text>
              {") sua et Patris "}
              <Text style={styles.underline}>sanctorumque</Text>
              {" ("}
              <Text style={styles.underline}>et sanctorum</Text>
              {")"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: "underline",
  },
});
