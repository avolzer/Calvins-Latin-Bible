import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "./progressBar";
import { MaterialIcons } from "@expo/vector-icons";

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

  const intervalRef = useRef();
  const [sequence, setSequence] = useState(0);

  const loadData = async () => {
    try {
      loadAudio();
    } catch (e) {
      console.log(e);
    }
  };

  const playbackInstance = new Audio.Sound();

  const loadAudio = async () => {
    try {
      const source = paths[(props.chapter - 1) % 22];
      const status = {};
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      playbackInstance.getStatusAsync().then(function (result) {
        setState((curState) => ({
          ...curState,
          playbackInstance,
          durationMillis: result.durationMillis,
          isLoaded: true,
        }));
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    stop();
    const intervalId = intervalRef.current;
    setState((curState) => ({
      ...curState,
      isPlaying: false,
      reachedEnd: false,
    }));
    setSequence(0);
    clearInterval(intervalId);

    loadData();
  }, [props.chapter]);

  const interval = () => {
    intervalRef.current = setInterval(async () => {
      const status = await state.playbackInstance.getStatusAsync();
      recordingEnded = status.positionMillis >= status.playableDurationMillis;
      if (recordingEnded) {
        clearInterval(intervalRef.current);
        await state.playbackInstance.pauseAsync();
        setState((curState) => ({
          ...curState,
          isPlaying: false,
          reachedEnd: true,
          positionMillis: curState.durationMillis,
        }));
      } else setSequence((prevSequence) => prevSequence + 1);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = intervalRef.current;
    setSequence(0);

    // clear on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setState((curState) => ({
      ...curState,
      positionMillis: sequence * 1000,
      sliderValue: (sequence * 1000) / state.durationMillis,
    }));
  }, [sequence]);

  const stop = async () => {
    if (state.isPlaying) {
      await state.playbackInstance.stopAsync();
    }
    playbackInstance.unloadAsync();
    setState((curState) => ({
      ...curState,
      isLoaded: false,
      isPlaying: false,
    }));
  };

  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      await playbackInstance.pauseAsync();
      setState((curState) => ({
        ...curState,
        isPlaying: false,
        reachedEnd: true,
      }));
    }
  };
  const pause = async (playbackInstance) => {
    await playbackInstance.pauseAsync();
    clearInterval(intervalRef.current);
    setState((curState) => ({
      ...curState,
      isPlaying: false,
    }));
  };

  const play = async (playbackInstance) => {
    await playbackInstance.playAsync();
    interval();
    setState((curState) => ({
      ...curState,
      isPlaying: true,
    }));
  };

  const replay = async () => {
    await state.playbackInstance.replayAsync();

    setState((curState) => ({
      ...curState,
      reachedEnd: false,
      isPlaying: true,
      sliderValue: 0,
    }));
    setSequence(0);
    interval();
  };

  const PlayPauseHandler = async () => {
    const { isPlaying, playbackInstance, isLoaded, reachedEnd } = state;

    if (isPlaying) {
      pause(playbackInstance);
    } else {
      play(playbackInstance);
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#636363",
        flex: 1,
        paddingHorizontal: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 40,
        }}
      >
        {props.chapter > 1 ? (
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={props.onPrevious}
          >
            <MaterialIcons
              name="skip-previous"
              size={30}
              color="gray"
              style={{ color: "#EAEAEA" }}
            ></MaterialIcons>
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="skip-previous"
            size={30}
            color="#636363"
            style={{ paddingLeft: 20 }}
          ></MaterialIcons>
        )}
        {state.isPlaying ? (
          <AntDesign
            style={{ color: "white" }}
            name="pausecircle"
            size={45}
            onPress={PlayPauseHandler}
          />
        ) : (
          <>
            {state.reachedEnd ? (
              <AntDesign
                style={{ color: "white" }}
                name="reload1"
                size={45}
                onPress={() => {
                  replay();
                }}
              />
            ) : (
              <AntDesign
                style={{ color: "#EAEAEA" }}
                name="play"
                size={45}
                onPress={PlayPauseHandler}
              />
            )}
          </>
        )}
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={props.onNext}
        >
          <MaterialIcons
            name="skip-next"
            size={30}
            color="gray"
            style={{ color: "#EAEAEA" }}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%" }}>
        <ProgressBar
          durationMillis={state.durationMillis}
          positionMillis={state.positionMillis}
          sliderValue={state.sliderValue}
          onSlidingStart={async () => {
            clearInterval(intervalRef.current);
          }}
          onSeek={async (time) => {
            await state.playbackInstance.playFromPositionAsync(
              time * state.durationMillis
            );
            setSequence(Math.round(time * state.durationMillis) / 1000);

            if (!state.isPlaying) {
              await pause(state.playbackInstance);
            } else {
              interval();

              setState((curState) => ({
                ...curState,
                isPlaying: true,
              }));
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
