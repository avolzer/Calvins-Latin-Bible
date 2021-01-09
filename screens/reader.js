import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from '../styles/global';
import { Audio } from 'expo-av';


export default function Reader({route}) {
    const { chapter, text } = route.params;

    const [sound, setSound] = useState();

    const fontSize=20
    const superFontSize = Math.floor(fontSize * 0.6)
    const superlineHeight = superFontSize * 1.1

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
           require('../assets/PSALM-1-TEST.mp3')
        );
        setSound(sound);
        await sound.setRateAsync(1, true);

        await sound.playAsync(); }
    
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); }
            : undefined;
    }, [sound]);

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
            
            showsVerticalScrollIndicator ={false}
        >
            <Text style={styles.chapterNum}>{chapter}</Text>
            {verses}
        </ScrollView>
        <View style={styles.audio}>
             <Button title="Play Sound" onPress={playSound} />
         </View>
      </View>
    )
}

const styles = StyleSheet.create ({
    chapterNum: {
        fontSize: 30,
    },
    audio: {
        padding: 20
    }
})
