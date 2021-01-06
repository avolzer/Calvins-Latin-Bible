import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from '../styles/global';

import textData from '../assets/csvjson'

export default function Contents( {navigation} ) {

    const pressHandler = (ch) => {
        const chapterText = psalms.filter((item)=> item.Chapter==ch)
        navigation.navigate('Reader', {
            chapter: ch,
            text: chapterText
        })
    };

    const romanize = (num) => {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

    var chapters = [];
    for (var i = 1; i <= 150; i++) {
      chapters.push(i);
    }

    let chapterButtons = chapters.map((item, index) => {
        return (
            <View 
                key={index}
                style={styles.wrapper}
                >
                <TouchableOpacity style={styles.button} onPress={()=>{pressHandler(item)}}>
                    <Text>{romanize(item)}</Text>
                </TouchableOpacity>
            </View> 
        )
    })

    const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')
   
    return (
        <View style={{flex:1}}>
            <Text style={[globalStyles.subHeading,
                            {marginLeft: 24, marginTop: 24}]}>
                Select a chapter
            </Text>
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
        padding:10
    },
    grid: {
        width: '100%',
        flexWrap: "wrap",
        flexDirection: "row",
       // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    wrapper: {  
        alignItems: 'center',
        width: 70,  
    }
})
