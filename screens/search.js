import React from 'react';
import { StyleSheet, View, Text } from "react-native";

export default function Search() {
    return (
        <View style={StyleSheet.containter}>
            <Text>Search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24
    }
});