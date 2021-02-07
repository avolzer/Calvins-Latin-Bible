import React, {useState, useEffect, useRef, useMemo} from 'react';
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { globalStyles } from '../styles/global';
//import { Audio } from 'expo-av';
import MyPlayer from '../shared/audioPlayer'
import textData from '../assets/csvjson'
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Reader({route, navigation}) {

    React.memo(function Reader (props) {
      return false;
    })
   // const { chapter, text } = route.params;

    const playerRef = useRef();
    const flatListRef = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          playerRef.current.pauseVideo();
        });
        return unsubscribe;
    }, [navigation]);

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

  //  var verses = [];
  //      for ( let i = 0; i < text.length; i++){
  //           verses.push(
  //           <View key={i} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
  //               {global.language=="English" ? <Text style={superScript}>{text[i].Verse}</Text> : <Text style={superScript}>{romanizeLower(text[i].Verse)}</Text>}
  //               <Text style={regular}>{' ' + text[i].Text}</Text>
  //           </View>
            
  //       )
  //   } 

    const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
   // const [currChapter, setCurrChapter] = useState(0);
    var currChapter = 0;

    // const retrieveMore=() => {
    //   const verses = []
    //   if (refreshing){
    //     return null;
    //   }
    //   console.log("here it is")
    //   setRefreshing(true)
    //     for ( let i = current; i < current+200; i++){
    //         verses.push(
    //             psalms[i]
    //         )
    //         //console.log(psalms[i].Text);
    //     } 
    //     setData(verses)
    //     setCurrent(current+200)
    //     setRefreshing(false)
    // };

    //const memoizedValue = useMemo(() => renderItem(), [productsState.product]);

    const chapNum = (item) => {
      if (item.Chapter == currChapter){
      }else{
        currChapter= item.Chapter
        return(
          <Text style={styles.chapterNum}>{item.Chapter}</Text>
        )
      }
    }


    const renderItem = ({ item }) => (
      <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
        {chapNum(item)}
        <Text style={superScript}>{item.Verse}</Text>
        <Text style={regular}>{item.Text}</Text>
      </View>
    )

    // const scrollToIndex = () => {
    //   listRef.current.scrollToIndex({index:20})
    // }
    const getItemLayout = (data, index) => (
      { length: 50, offset: 50 * index, index }
    )

    return (
        <View style={globalStyles.mainContainer}>
        {/* <Button onPress={scrollToIndex()}>Press to scroll</Button> */}
        <View style={globalStyles.container}>
                <FlatList 
                style={styles.scroll}
                data={psalms}
                renderItem={renderItem}
                maxToRenderPerBatch={100}
                showsVerticalScrollIndicator={false}
                ref={flatListRef}
                getItemLayout={getItemLayout}

                //renderItem={({item, index})=>renderItem(item)}
                // onEndReachedThreshold={4}
                // onEndReached={retrieveMore}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshing}
            />
            <TouchableOpacity onPress={() => flatListRef.current.scrollToIndex({index: 300, animated: true })}><Text>PRESS HERE</Text></TouchableOpacity>
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
