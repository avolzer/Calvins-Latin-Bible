import React from 'react';
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from '../styles/global';

export default function Contents( {navigation} ) {

    const pressHandler = () => {
        navigation.push('Psalm 1')
    }

    return (
        <View style={globalStyles.container}>
            <Text>Chapters:</Text>
            <Button title='1' onPress={pressHandler} />
        </View>
    )
}

