import React from 'react';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { globalStyles } from '../styles/global';


export default function Reader({route}) {
    const { chapter, text } = route.params;

    console.log(text.length)

   var firstVerse = [];
    for ( let i = 0; i < text.length; i++){
        firstVerse.push(
            <View>
                <Text>{text[i].Verse}{text[i].Text}</Text>
            </View>
            
        )
    } 


    return (
        <ScrollView style={globalStyles.container}>
            <Text>{chapter}</Text>
            {firstVerse}
        </ScrollView>
    )
}

