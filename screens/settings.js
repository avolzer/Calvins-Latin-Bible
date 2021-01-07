import React, { useState } from 'react';
import { StyleSheet, View, Text, Picker } from "react-native";

export default function Settings() {
    const [selectedValue, setSelectedValue] = useState("English");

    return (
        <View style={StyleSheet.containter}>
            <Text>App Language</Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => 
                   { global.language = itemValue;
                    setSelectedValue(itemValue)}}
            >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Latin" value="Latin" />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24
    }
});