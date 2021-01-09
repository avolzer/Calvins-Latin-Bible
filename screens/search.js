import React, {useState} from 'react';
import { StyleSheet, View, Text } from "react-native";
import { SearchBar } from 'react-native-elements';

export default function Search() {

    const [search, setSearch] = useState('')

    return (
        <View style={StyleSheet.containter}>
            <SearchBar round
            searchIcon={{ size: 24 }}
            onChangeText={text => console.log(text)} placeholder="Type Here..."
            value={search}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        padding: 24
    }
});