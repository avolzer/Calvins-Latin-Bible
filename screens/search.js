import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { SearchBar } from 'react-native-elements';
import { globalStyles } from '../styles/global';


export default function Search({ navigation }) {

    return (
        <View style={globalStyles.mainContainer}>
            <TouchableOpacity style={{flex:1}} onPress={()=> navigation.pop()}>

            </TouchableOpacity>
        </View>
        
    )
}