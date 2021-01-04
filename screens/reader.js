import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from '../styles/global';


export default function Reader({route}) {
    const { chapter } = route.params;
    return (
        <View style={globalStyles.container}>
            <Text>{chapter}</Text>
        </View>
    )
}

