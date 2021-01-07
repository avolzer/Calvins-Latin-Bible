import React from 'react';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { globalStyles } from '../styles/global';


export default function Reader({route}) {
    const { chapter, text } = route.params;

    const fontSize=15
    const superFontSize = Math.floor(fontSize * 0.6)
    const superlineHeight = superFontSize * 1.1

   var firstVerse = [];
       for ( let i = 0; i < text.length; i++){
            firstVerse.push(
            <View key={i}>
                <Text style={globalStyles.text}>{text[i].Verse + ' '}{text[i].Text}</Text>
            </View>
            
        )
    } 

    return (
        <ScrollView 
            style={globalStyles.container}
            showsVerticalScrollIndicator ={false}
        >
            <Text style={styles.chapterNum}>{chapter}</Text>
            {firstVerse}
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    chapterNum: {
        fontSize: 30,
        
    },
})
