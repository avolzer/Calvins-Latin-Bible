import React from 'react';
import { StyleSheet, View, Text } from "react-native";

export default function Settings() {
    return (
        <View style={StyleSheet.containter}>
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24
    }
});