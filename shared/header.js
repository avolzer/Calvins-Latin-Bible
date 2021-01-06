import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation();

    const pressHandler = () => {
        navigation.navigate('Search')
    }

 

    return (
        <View>
            <EvilIcons name='search' size={28} onPress={pressHandler}/>
        </View>
    );
};