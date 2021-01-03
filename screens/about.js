import React from 'react';
import { StyleSheet, View, Text } from "react-native";

export default function About() {
    return (
        <View style={StyleSheet.containter}>
            <Text>About screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24
    }
});