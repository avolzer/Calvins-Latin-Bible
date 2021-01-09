
import React, {useState, useEffect, useImperativeHandle} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from '../styles/global';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';


export default function MyPlayer( props ){
    const path = require('../assets/PSALM-1-TEST.mp3')
 
    const playbackInstance = new Audio.Sound();

	const [ state, setState ] = useState({
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		isBuffering: true
    });

    const pause = async () => {

        if(state.isPlaying){
            await state.playbackInstance.stopAsync();
        }
    }
    
    useImperativeHandle(props.playerRef, () => ({
        pauseVideo: () => {
            pause();
        },
      }));

	const loadAudio = async () => {
		const { isPlaying } = state;

		try {
			const source = path
			const status = {
				shouldPlay: isPlaying,
			};
			//playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			await playbackInstance.loadAsync(source, status, false);

			setState((curState) => ({
				...curState,
				playbackInstance
			}));
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		const loadData = async () => {
			try {
				loadAudio();
			} catch (e) {
				console.log(e);
			}
		};
        loadData();    
    }, []);  
 
	const PlayPauseHandler = async () => {
        
        const { isPlaying, playbackInstance } = state;
        
        if (isPlaying){
            await playbackInstance.pauseAsync();
            setState((curState) => ({
                ...curState,
                isPlaying: false
            }));
        } else{
            await playbackInstance.playAsync();
            setState((curState) => ({
                ...curState,
                isPlaying: true
            }));
        }        
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
           {state.isPlaying ? <AntDesign name='pausecircleo' size={50} onPress={PlayPauseHandler}/> : <AntDesign name='playcircleo' size={50} onPress={PlayPauseHandler}/>}
		</View>
	);
};

const styles = StyleSheet.create ({
    audio: {
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 1
    },
    icon: {
        paddingLeft: 20
    }
})
