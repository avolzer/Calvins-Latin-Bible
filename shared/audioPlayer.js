
import React, {useState, useEffect, useImperativeHandle} from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from '../styles/global';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';


export default function MyPlayer( props ){

	const paths = [
		require('../assets/PSALM-1-TEST.mp3'),
	    require('../assets/PSALM-2-TEST.mp3'),
		require('../assets/PSALM-3-TEST.mp3'),
		require('../assets/PSALM-4-TEST.mp3'),
		require('../assets/PSALM-5-TEST.mp3'),
		require('../assets/PSALM-6-TEST.mp3')
	]

	const loadData = async () => {
		try {
			loadAudio();
		} catch (e) {
			console.log(e);
		}
	};
	
	useEffect(()=>
	{
		console.log(props.chapter);
		
		loadData();
	}, [props.chapter]);

 
	const playbackInstance = new Audio.Sound();

	const [ state, setState ] = useState({
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		isBuffering: true,
		isLoaded: false,
		reachedEnd: false,
    });

    const stop = async () => {
        if(state.isPlaying){
            await state.playbackInstance.stopAsync();
		};
		playbackInstance.unloadAsync();
		setState((curState) => ({
			...curState,
			isLoaded: false
		}));
		
    }
    
    useImperativeHandle(props.playerRef, () => ({
        stopAudio: () => {
			const { isPlaying, playbackInstance } = state;
			setState((curState) => ({
                ...curState,
				isPlaying: false,
            }));
			stop();
        },
	  }));
	  
	const _onPlaybackStatusUpdate = async (playbackStatus) => {
		  if (playbackStatus.didJustFinish){
			await playbackInstance.pauseAsync();
			  setState((curState) => ({
                ...curState,
				isPlaying: false,
				reachedEnd: true,
			}));
		  }
	  }

	const loadAudio = async () => {
		const { isPlaying } = state;

		try {
			const source = paths[(props.chapter - 1)%6]
			const status = {
				shouldPlay: isPlaying,
			};
			//playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
			playbackInstance.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
			await playbackInstance.loadAsync(source, status, false);

			setState((curState) => ({
				...curState,
				playbackInstance,
			}));
			setState((curState) => ({
                ...curState,
                isLoaded: true,
			}));

		} catch (e) {
			console.log(e);
		}
	};
 
	const PlayPauseHandler = async () => {
        
        const { isPlaying, playbackInstance, isLoaded, reachedEnd } = state;
        
        if (isPlaying){
            await playbackInstance.pauseAsync();
            setState((curState) => ({
                ...curState,
                isPlaying: false
            }));
        } else{
			if (reachedEnd)
			{
				playbackInstance.replayAsync();
				setState((curState) => ({
					...curState,
					reachedEnd: false,
					isPlaying: true,
				}));
			}
            else{
				await playbackInstance.playAsync();
            setState((curState) => ({
                ...curState,
                isPlaying: true
            }));}
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
