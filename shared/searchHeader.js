import React, {useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from 'react-native-elements'

export default function SearchHeader() {

    const navigation = useNavigation();

     const searchInput = useRef(null);

    useEffect(() => {
		searchInput.current.focus();    
    }, []);  

    return (
        <View style={{width: 500}}>
            <TextInput
            ref={searchInput}
            style={styles.searchBar}/>
           
           
            {/* <SearchBar
            containerStyle={{
                backgroundColor: "transparent",
                borderBottomColor: "transparent",
                borderTopColor: "transparent",
                                                flex: 1,
            }}
            inputContainerStyle={{
                backgroundColor: "#EDEDED",
            }}
            inputStyle={{
                backgroundColor: "#EDEDED",
                borderRadius: 10,
                color: "black",
            }}
            searchIcond
            clearIcon
            round
            placeholder="Search"
            
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        fontSize: 24,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    }
});