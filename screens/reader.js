import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ScrollView, Button, FlatList, List } from "react-native";
import { globalStyles } from '../styles/global';
//import { Audio } from 'expo-av';
import MyPlayer from '../shared/audioPlayer'
//import textData from '../assets/csvjson'
import {db} from '../config';
import firebase from 'firebase';


export default function Reader({route, navigation}) {
    //const { chapter, text } = route.params;
    const fontSize=20
    const superFontSize = Math.floor(fontSize * 0.6)
    const superlineHeight = superFontSize * 1.1

    const superScript = {
        textAlignVertical: 'top',
        fontSize: superFontSize,
        lineHeight: superlineHeight,
        fontFamily: 'serif'

    }

    const regular = {
        textAlignVertical: 'bottom',
        fontSize: fontSize,
        lineHeight: 35,
        fontFamily: 'serif'
    }

    // taken from a comment on http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    const romanizeLower = (num) => {
        var lookup = {m:1000,cm:900,d:500,cd:400,c:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

      const romanizeUpper = (num) => {
        var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
          while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
          }
        }
        return roman;
      }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          playerRef.current.pauseVideo();
        });
        return unsubscribe;
    }, [navigation]);

    const playerRef = useRef();

   // const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')

    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(30);
    const [lastVisible, setLastVisible] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(()=> {
      try{
        console.log(db.ref())
        retrieveData();
      }
      catch (error) {
        console.log(error)
      }
      
    }, []);

    const retrieveData = async () => {
      try{
        setLoading(true)
        console.log('Retrieving Data')

        var ref = db.ref()

        let initialQuery = db.doc('data')
          .where('id', '<=', 40)
          .orderBy('id')
          .limit(limit)

        let documentSnapshots = await initialQuery.get();

        let documentData = documentSnapshots.docs.map(document => document.data());

        console.log(documentData[documentData.length - 1])

        let lastVisible = documentData[documentData.length - 1].id;

        setData(documentData);
        setLastVisible(lastVisible);
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
    //   const verses = []
    //   console.log("here it is")
    //     for ( let i = current; i < current+200; i++){
    //         verses.push(
    //             psalms[i]
    //         )
    //         //console.log(psalms[i].Text);
    //     } 
    //     setData(verses)
    //     setCurrent(current+200)
    };

    const retrieveMore = async () => {
      try{
        setRefreshing(true)
        console.log('Retriving additional Data');

        let additionalQuery = await db.ref('latin-app-data-default-rtdb')
          .where('id', '<=', 40)
          .orderBy('id')
          .startAfter(this.state.lastVisible)
          .limit(this.state.limit)

        let documentSnapshots = await additionalQuery.get();

        let documentData = documentSnapshots.docs.map(document=> document.data());

        let lastVisible = documentData[documentData.length - 1].id;

        setData([...data, ...documentData])
        setLastVisible(lastVisible)
        setRefreshing(false)
      }
      catch (error) {
        console.log(error);
      }
    };

    const renderItem = ({itemData, index}) => {
      //console.log(data[0].Verse)
      if(itemData !== undefined) {
        console.log(itemData);
        <View key={index} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          
            {global.language=="English" ? <Text style={superScript}>1</Text> : <Text style={superScript}>{romanizeLower(1)}</Text>}
            <Text style={regular}>{' ' + 'hey'}</Text>
        </View>
      }
      
      }

      const TheItem = ({item}) => (
        <View>
          <Text>{item.Text}</Text>
        </View>
      )

    //   var verses = [];
    //   for (let ch=0; ch<151; ch++){
    //     const text = psalms.filter((item)=> item.Chapter==ch)
    //     renderChapter(text);
    //   }


    return (
        <View style={globalStyles.mainContainer}>
        <View style={globalStyles.container}>
                <FlatList 
                style={styles.scroll}
                data={data}
                renderItem={({item})=><TheItem item={item} />}

                //renderItem={({item, index})=>renderItem(item)}
                onEndReachedThreshold={0.5}
                onEndReached={retrieveMore}
               // keyExtractor={({item}) => item.Verse.toString()}
            />
        
        <MyPlayer playerRef ={playerRef}/>
      </View>
      </View>
    )
}

const styles = StyleSheet.create ({
    chapterNum: {
        fontSize: 30,
        fontFamily: 'serif'

    },
    scroll: {
        height: '80%'
    }

})
