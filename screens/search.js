import React, {useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { globalStyles } from '../styles/global';

import textData from '../assets/csvjson'


export default function Search({ navigation, route }) {

    //search term will be blank if coming from icon press, user input if coming from searchHeader submit
    const { search_term } = route.params;

    const [search_results, setSearchResults] = useState([])

    const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')

    //navigate to chapter page of selected verse
    const pressHandler = (ch) => {
        const chapterText = psalms.filter((item)=> item.Chapter==ch)
        navigation.navigate('Reader', {
            name: 'Psalm ' + ch,
            chapter: ch,
            text: chapterText
        })
    };

    const renderResult =(i)=>{
        return <View key={i}>
        <TouchableOpacity onPress={()=>{pressHandler(psalms[i].Chapter)}}>
            <Text style={{fontWeight: "bold"}}>Psalm {psalms[i].Chapter}:{psalms[i].Verse}</Text>
            <Text>{psalms[i].Text}</Text>
            <Text></Text>
        </TouchableOpacity>
    </View>
    }

    const getSearchResults =() => {
        var results = []
        for (var i=0; i<psalms.length; i++){
            if(psalms[i].Text.includes(search_term)){
                results.push(
                    renderResult(i)
                )
            }
        }
        setSearchResults(results)
        if (results.length==0){
            results.push(<Text>No results found</Text>)
        }
    }

    useEffect(() => {
		if (search_term != ''){
            getSearchResults();
        }   
    }, [search_term]);  

    return (
        <View style={globalStyles.mainContainer}>
            <View style={globalStyles.container}>
            {search_term == ''? 
                <TouchableOpacity style={{flex:1}} onPress={()=> navigation.pop()}></TouchableOpacity> 
              : <View>
                    {/* <Text>Results for {search_term}: </Text> */}
                    <Text></Text>
                    <ScrollView 
                        style={{height:'95%'}}
                        showsVerticalScrollIndicator ={false}
                    >
                        {search_results}
                    </ScrollView>
                </View>}
            </View>
        </View>
        
    )
}