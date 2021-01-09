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
        lineHeight: superlineHeight
    }

    const regular = {
        textAlignVertical: 'bottom',
        fontSize: fontSize,
        lineHeight: 35
    }

   var verses = [];
       for ( let i = 0; i < text.length; i++){
            verses.push(
            <View key={i} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                <Text style={superScript}>{text[i].Verse}</Text>
                <Text style={regular}>{' ' + text[i].Text}</Text>
            </View>
            
        )
    } 

    return (
        <View style={globalStyles.container}>
        <ScrollView 
            style={styles.scroll}
            showsVerticalScrollIndicator ={false}
        >
            <Text style={styles.chapterNum}>{chapter}</Text>
            {verses}
        </ScrollView>
        <MyPlayer playerRef ={playerRef}/>
      </View>
    )
}

const styles = StyleSheet.create ({
    chapterNum: {
        fontSize: 30,
    },
    scroll: {
        height: '80%'
    }

})
