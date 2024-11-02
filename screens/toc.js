// import React, {useState} from 'react';
// import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
// import { globalStyles } from '../styles/global';

// import textData from '../assets/csvjson'

// export default function Contents( {navigation } ) {

//     //filter text to get only verses from the selected psalm
//     //navigate to page to read that psalm
//     const pressHandler = (ch) => {
//         const chapterText = psalms.filter((item)=> item.Chapter==ch)
//         navigation.navigate('Reader', {
//             name: 'Psalm ' + ch,
//             chapter: ch,
//             text: chapterText
//         })
//     };

//     // taken from a comment on http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
//     const romanize = (num) => {
//         var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
//         for ( i in lookup ) {
//           while ( num >= lookup[i] ) {
//             roman += i;
//             num -= lookup[i];
//           }
//         }
//         return roman;
//       }

//     //array containing consecutive integers for every chapter
//     var chapters = [];
//     for (var i = 1; i <= 150; i++) {
//       chapters.push(i);
//     }

//     //returns pressable numbers for every chapter
//     //rendered as either roman or arabic numerals depending on selected language
//     let chapterButtons = chapters.map((item, index) => {
//         return (
//             <View
//                 key={index}
//                 style={styles.wrapper}
//                 >
//                 <TouchableOpacity style={styles.button} onPress={()=>{pressHandler(item)}}>
//                     {global.language=="English" ? <Text style={{fontFamily: 'serif'}}>{item}</Text> : <Text style={{fontFamily: 'serif'}}>{romanize(item)}</Text>}
//                 </TouchableOpacity>
//             </View>
//         )
//     })

//     //filter out all psalms
//     const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')

//     return (
//         <View style={globalStyles.mainContainer}>
//         <View style={{flex:1}}>
//             <Text style={[globalStyles.subHeading,
//                             {marginLeft: 24, marginTop: 24}]}>
//                 {global.language=="English" ? <Text>Chapters</Text> : <Text>Capitula</Text>}

//             </Text>
//             <ScrollView
//                 showsVerticalScrollIndicator ={false}
//             >
//                 <View style={styles.grid} >
//                 {chapterButtons}
//                 </View>
//             </ScrollView>

//         </View>
//         </View>
//     )
// }

// const styles=StyleSheet.create({
//     button: {
//         padding:10
//     },
//     grid: {
//         width: '100%',
//         flexWrap: "wrap",
//         flexDirection: "row",
//        // backgroundColor: 'blue',
//         justifyContent: 'center',
//     },
//     wrapper: {
//         alignItems: 'center',
//         width: 70,
//     }
// })
