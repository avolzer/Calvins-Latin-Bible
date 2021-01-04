import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from '../styles/global';

export default function Contents( {navigation} ) {

    const pressHandler = (ch) => {
        navigation.navigate('Reader', {
            chapter: "chapter " + ch,
        })
    };

    var chapters = [];
    for (var i = 1; i <= 150; i++) {
      chapters.push(i);
    }

    let chapterButtons = chapters.map((item, index) => {
        return (
            <View 
                key={index}
                >
                <TouchableOpacity style={styles.button} onPress={()=>{pressHandler(item)}}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </View> 
        )
    })
    

    return (
        <View style={{padding: 20}}>
            <Text>Chapters:</Text>
            <ScrollView
                showsVerticalScrollIndicator ={false}
            >
                <View style={styles.grid} >
                {chapterButtons}
                </View>
            </ScrollView>
           
        </View>
    )
}

const styles=StyleSheet.create({
    button: {
       padding: 25,
        margin: 5,
        width: '100%'
        
    },
    grid: {
        width: '100%',
        flexWrap: "wrap",
        flexDirection: "row",
    }
})
