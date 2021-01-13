import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from '../styles/global';
//import { Audio } from 'expo-av';
import MyPlayer from '../shared/audioPlayer'

export default function Reader({route, navigation}) {
    const { chapter, text } = route.params;

    const playerRef = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          playerRef.current.pauseVideo();
        });
        return unsubscribe;
    }, [navigation]);

    const fontSize=20
    const superFontSize = Math.floor(fontSize * 0.6)
    const superlineHeight = superFontSize * 1.1

    const superScript = {
        textAlignVertical: 'top',
        fontSize: superFontSize,
        lineHeight: superlineHeight,
        fontFamily: 'serif'

    }

    const regular = {
        textAlignVertical: 'bottom',
        fontSize: fontSize,
        lineHeight: 35,
        fontFamily: 'serif'
    }

    // taken from a comment on http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    const romanizeLower = (num) => {
        var lookup = {m:1000,cm:900,d:500,cd:400,c:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

      const romanizeUpper = (num) => {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

   var verses = [];
       for ( let i = 0; i < text.length; i++){
            verses.push(
            <View key={i} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                {global.language=="English" ? <Text style={superScript}>{text[i].Verse}</Text> : <Text style={superScript}>{romanizeLower(text[i].Verse)}</Text>}
                <Text style={regular}>{' ' + text[i].Text}</Text>
            </View>
            
        )
    } 

    return (
        <View style={globalStyles.mainContainer}>
        <View style={globalStyles.container}>
        <ScrollView 
            style={styles.scroll}
            showsVerticalScrollIndicator ={false}
        >
            {global.language=="English" ? <Text style={styles.chapterNum}>{chapter}</Text> : <Text style={styles.chapterNum}>{romanizeUpper(chapter)}</Text>}
            {verses}
        </ScrollView>
        <MyPlayer playerRef ={playerRef}/>
      </View>
      </View>
    )
}

const styles = StyleSheet.create ({
    chapterNum: {
        fontSize: 30,
        fontFamily: 'serif'

    },
    scroll: {
        height: '80%'
    }

})
