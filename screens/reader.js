import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from '../styles/global';
//import { Audio } from 'expo-av';
import MyPlayer from '../shared/audioPlayer'
import { PanGestureHandler, TouchableOpacity } from "react-native-gesture-handler"
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import textData from '../assets/csvjson'
import {MaterialIcons} from '@expo/vector-icons'
import HTML from "react-native-render-html";


export default function Reader({route, navigation}) {

    
    const { chapter, text } = route.params;

    const playerRef = useRef();
    const mainScrollView = useRef();

    const [lang, setLang] = useState("Latin")
    //const [chap, setChap] = useState(1)
    
    // const [chapter, setChapter] = useState(cchapter)
    // const [text, setText] = useState(ttext)

    // const mounted = useRef();
    // useEffect(() => {
    //   if (!mounted.current) {
    //     const { chapter, text } = route.params;
    //     mounted.current = true;
    //   } else {
    //     //console.log("hi");
    //     // setChapter(cchapter);
    //     // setText(ttext);
    //   }
    // });

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          playerRef.current.stopAudio();
        });

        const { chapter, text } = route.params;
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('didFocus', () => {
        console.log("please")
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

   var verses = [];
       for ( let i = 0; i < text.length; i++){
            verses.push(
            <View key={i} style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                {global.language=="English" ? <Text style={superScript}>{text[i].Verse}</Text> : <Text style={superScript}>{romanizeLower(text[i].Verse)}</Text>}
                <Text style={regular}>{' ' + text[i].Text}</Text>
            </View>
            
        )
    } 

    const [latinVerses, setLatinVerses] = useState("<p></p>")
    

    useEffect(() => {
      getEnglish(chapter);      
    }, []);

    const getEnglish = async(ch) => {
      const API_KEY = `c3fd729feb669c03c2d4d5474409d775`;
      var url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/chapters/PSA."+ch + "?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false"

      fetch(url,
      {
          method: 'GET', 
          headers: new Headers({
              'api-key': API_KEY
          }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          setLatinVerses(responseJson.data.content)
      }).catch((error) => {
          alert(error)
      })
    }

    const [num, setNum] = useState(0)


    const flipChaptersForward = () => {
      mainScrollView.current.scrollTo({x: 0, y: 0, animated:false})
      const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')
      const chapterText = psalms.filter((item)=> item.Chapter==(chapter+1))
      playerRef.current.stopAudio();


      navigation.navigate('Reader', {
        name: 'Psalm ' + (chapter+1),
        chapter: (chapter+1),
        text: chapterText
    })
      getEnglish(chapter+1)
    }

    const flipChaptersBack = () => {
      mainScrollView.current.scrollTo({x: 0, y: 0, animated:false})

      const psalms = textData.filter((item)=> item.ShortBook == 'PSAL')
      const chapterText = psalms.filter((item)=> item.Chapter==(chapter-1))
      playerRef.current.stopAudio();

      navigation.navigate('Reader', {
        name: 'Psalm ' + (chapter-1),
        chapter: (chapter-1),
        text: chapterText
    })

      getEnglish(chapter-1)

    }

    // const oldLeftActions = () => {
    //   return (
    //     <View
    //       style={{ flex: 1, justifyContent: 'center' }}>
    //       <Text
    //         style={{
    //           color: 'black',
    //           paddingHorizontal: 10,
    //           fontWeight: '600'
    //         }}>
    //         Left Action
    //       </Text>
    //     </View>
    //   )
    //  }

    //  const [myText, setText] = useState("not swiped")

    //  const onSwipeRight = (gestureState) => {
    // //   navigation.navigate('Reader', {
    // //     name: 'Psalm ' + chapter,
    // //     chapter: chapter,
    // //     text: text
    // // })
    // // console.log("swiped");
    // setText("yep")
    //  }

    const pressLanguage =() => {
      if (lang=="Latin"){
        setLang("English")
      }
      else{
        setLang("Latin")
      }
    }

    return (
      <View style={globalStyles.mainContainer}>
        <View style={[globalStyles.container, {flex: 8}]}>
            <Button title="Toggle Language" onPress={pressLanguage}/>
            {lang=="Latin" ?
              <ScrollView 
                style={styles.scroll}
                showsVerticalScrollIndicator ={false}
                ref={mainScrollView}
              >
                {global.language=="English" ? <Text style={styles.chapterNum}>{chapter}</Text> : <Text style={styles.chapterNum}>{romanizeUpper(chapter)}</Text>}
                {verses}

              </ScrollView>
              : 
              <ScrollView 
                style={styles.scroll}
                showsVerticalScrollIndicator ={false}
                ref={mainScrollView}
              >
                {global.language=="English" ? <Text style={styles.chapterNum}>{chapter}</Text> : <Text style={styles.chapterNum}>{romanizeUpper(chapter)}</Text>}
                  <HTML source={{ html: latinVerses }} />

                  </ScrollView>
               }

            {/* <GestureRecognizer
            style={{height: 100}}
              onSwipeRight={(state) => onSwipeRight(state)}
            >
              <Text>{myText}</Text>
            </GestureRecognizer> */}
         
        </View>
        <View style={{flex:1, flexDirection: 'row'}}>
        {/* <Button 
            style={{flex:1}}
            title="prev chapter"
            onPress={flipChaptersBack}
          /> */}
          {chapter>1 ?
          <TouchableOpacity style={{height: '100%', justifyContent:'center'}} onPress={flipChaptersBack}>
            <MaterialIcons name="navigate-before" size={50} color="gray" style={{paddingLeft:20}}></MaterialIcons>
          </TouchableOpacity>
          : <MaterialIcons name="navigate-before" size={50} color="white" style={{paddingLeft:20}}></MaterialIcons> }
         <MyPlayer chapter={chapter} style={{flex:1}} playerRef ={playerRef} />
         <TouchableOpacity style={{height: '100%', justifyContent:'center'}} onPress={flipChaptersForward}>
            <MaterialIcons name="navigate-next" size={50} color="gray" style={{paddingRight:20}}></MaterialIcons>
          </TouchableOpacity>
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
        flex: 5
    }

})
