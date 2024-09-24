import React, { useState, useEffect, useImperativeHandle } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { globalStyles } from "../styles/global";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import ProgressBar from "./progressBar";

export default function MyPlayer(props) {
  const paths = [
    require("../assets/PS1_v2.mp3"),
    require("../assets/PS2.mp3"),
    require("../assets/PS3.mp3"),
    require("../assets/PS4.mp3"),
    require("../assets/PS5_v2.mp3"),
    require("../assets/PS6.mp3"),
    require("../assets/PS7_v2.mp3"),
    require("../assets/PS8.mp3"),
    require("../assets/PS9.mp3"),
    require("../assets/PS10.mp3"),
    require("../assets/PS11_v2.mp3"),
    require("../assets/PS12.mp3"),
    require("../assets/PS13.mp3"),
    require("../assets/PS14.mp3"),
    require("../assets/PS15.mp3"),
    require("../assets/PS16.mp3"),
    require("../assets/PS17.mp3"),
    require("../assets/PS18.mp3"),
    require("../assets/PS19.mp3"),
    require("../assets/PS20.mp3"),
    require("../assets/PS21.mp3"),
    require("../assets/PS22.mp3"),
  ];

  const loadData = async () => {
    try {
      loadAudio();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(props.chapter);

    loadData();
  }, [props.chapter]);

  const playbackInstance = new Audio.Sound();

  const [state, setState] = useState({
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    isBuffering: true,
    isLoaded: false,
    reachedEnd: false,
    durationMillis: 1,
    positionMillis: 0,
    sliderValue: 0,
    isSeeking: false,
  });

  const stop = async () => {
    if (state.isPlaying) {
      await state.playbackInstance.stopAsync();
    }
    playbackInstance.unloadAsync();
    setState((curState) => ({
      ...curState,
      isLoaded: false,
    }));
  };

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

  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      await playbackInstance.pauseAsync();
      setState((curState) => ({
        ...curState,
        isPlaying: false,
        reachedEnd: true,
      }));
    }
    setState((curState) => ({
      ...curState,
      durationMillis: playbackStatus.durationMillis,
      positionMillis: playbackStatus.positionMillis,
      sliderValue:
        playbackStatus.positionMillis / playbackStatus.durationMillis,
    }));
  };

  const loadAudio = async () => {
    const { isPlaying } = state;

    try {
      const source = paths[(props.chapter - 1) % 22];
      const status = {
        shouldPlay: isPlaying,
      };
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      // playbackInstance.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
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
  // startInterval = () => {
  //   const interval = setInterval(() => {
  //     setState({
  //       sliderValue: state.positionMillis / state.durationMillis,
  //     });
  //   }, 1000);
  // };

  const PlayPauseHandler = async () => {
    const { isPlaying, playbackInstance, isLoaded, reachedEnd } = state;

    if (isPlaying) {
      await playbackInstance.pauseAsync();
      setState((curState) => ({
        ...curState,
        isPlaying: false,
      }));
    } else {
      if (reachedEnd) {
        playbackInstance.replayAsync();
        setState((curState) => ({
          ...curState,
          reachedEnd: false,
          isPlaying: true,
        }));
      } else {
        await playbackInstance.playAsync();
        // startInterval();
        setState((curState) => ({
          ...curState,
          isPlaying: true,
        }));
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 64,
      }}
    >
      {state.isPlaying ? (
        <AntDesign name="pausecircleo" size={50} onPress={PlayPauseHandler} />
      ) : (
        <AntDesign name="playcircleo" size={50} onPress={PlayPauseHandler} />
      )}
      <ProgressBar
        durationMillis={state.durationMillis}
        positionMillis={state.positionMillis}
        sliderValue={state.sliderValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  audio: {
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
  },
  icon: {
    paddingLeft: 20,
  },
});
