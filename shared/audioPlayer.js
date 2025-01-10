import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "./progressBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import firebaseConfig from "../firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

export default function MyPlayer(props) {
  initializeApp(firebaseConfig);

  const [url, setUrl] = useState();

  useEffect(() => {
    const getAudio = async () => {
      try {
        const storage = getStorage();

        const r = ref(storage, `PS${props.chapter}_FINAL.mp3`);
        await getDownloadURL(r).then((res) => {
          setUrl(res);
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (state.playbackInstance) stop();
    const intervalId = intervalRef.current;
    setState((curState) => ({
      ...curState,
      isPlaying: false,
      reachedEnd: false,
    }));
    setSequence(0);
    clearInterval(intervalId);
    getAudio();
  }, [props.chapter]);

  const [state, setState] = useState({
    isPlaying: false,
    playbackInstance: null,
    currentIndex: 0,
    isBuffering: false,
    isLoaded: false,
    reachedEnd: false,
    durationMillis: 1,
    positionMillis: 0,
    sliderValue: 0,
    isSeeking: false,
  });

  const intervalRef = useRef();
  const [sequence, setSequence] = useState(0);
  const loadingIdRef = useRef(0);
  const shouldPlay = useRef(false);

  useEffect(() => {
    let isCancelled = false;
    loadingIdRef.current += 1;
    const currentLoadingId = loadingIdRef.current;
    async function loadAudio() {
      if (state.playbackInstance) {
        await state.playbackInstance.unloadAsync();
      }
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
        });
        const sound = new Audio.Sound();
        await sound.loadAsync({
          uri: url,
          shouldPlay: false,
          isLooping: false,
        });
        if (!isCancelled && currentLoadingId === loadingIdRef.current) {
          sound.getStatusAsync().then(function (result) {
            setState((curState) => ({
              ...curState,
              playbackInstance: sound,
              durationMillis: result.durationMillis,
              isLoaded: true,
            }));
          });

          if (shouldPlay.current) {
            await sound.playAsync();
            interval(state.playbackInstance);
            shouldPlay.current = false;
          }
        } else {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.error("Error loading audio:", error);
        alert(error);
      }
    }
    if (url) loadAudio();
    return () => {
      isCancelled = true;
    };
  }, [url]);

  const interval = (playbackInstance) => {
    intervalRef.current = setInterval(async () => {
      const status = await playbackInstance.getStatusAsync();

      const recordingEnded =
        status.positionMillis >= status.playableDurationMillis;

      if (recordingEnded) {
        clearInterval(intervalRef.current);
        await playbackInstance.pauseAsync();
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
    state.playbackInstance.unloadAsync();
    setState((curState) => ({
      ...curState,
      isLoaded: false,
      isPlaying: false,
    }));
  };

  const pause = async () => {
    await state.playbackInstance.pauseAsync();
    clearInterval(intervalRef.current);
    setState((curState) => ({
      ...curState,
      isPlaying: false,
    }));
  };

  const play = async () => {
    setState((curState) => ({
      ...curState,
      isPlaying: true,
    }));

    try {
      if (state.isLoaded) {
        await state.playbackInstance.playAsync();
        interval(state.playbackInstance);
      } else {
        shouldPlay.current = true;
      }
    } catch (e) {
      console.log(e);
    }
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
    interval(state.playbackInstance);
  };

  const PlayPauseHandler = async () => {
    const { isPlaying } = state;

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 40,
          paddingTop: 20,
        }}
      >
        {props.chapter > 1 ? (
          <TouchableOpacity onPress={props.onPrevious}>
            <MaterialIcons
              name="skip-previous"
              size={30}
              style={styles.controls}
            ></MaterialIcons>
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="skip-previous"
            size={30}
            style={{ color: "white" }}
          ></MaterialIcons>
        )}
        {state.isPlaying ? (
          <AntDesign
            style={styles.controls}
            name="pausecircle"
            size={45}
            onPress={PlayPauseHandler}
          />
        ) : (
          <>
            {state.reachedEnd ? (
              <AntDesign
                style={styles.controls}
                name="reload1"
                size={45}
                onPress={() => {
                  replay();
                }}
              />
            ) : (
              <AntDesign
                style={styles.controls}
                name="play"
                size={45}
                onPress={PlayPauseHandler}
              />
            )}
          </>
        )}
        {props.chapter !== 150 ? (
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={props.onNext}
          >
            <MaterialIcons
              name="skip-next"
              size={30}
              style={styles.controls}
            ></MaterialIcons>
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="skip-next"
            size={30}
            style={styles.controls}
          ></MaterialIcons>
        )}
      </View>
      <View style={{ width: "100%", paddingHorizontal: 24, paddingBottom: 20 }}>
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

            if (state.reachedEnd) {
              setState((curState) => ({ ...curState, reachedEnd: false }));
            }

            if (!state.isPlaying) {
              await pause(state.playbackInstance);
            } else {
              interval(state.playbackInstance);

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

const styles = StyleSheet.create({
  controls: {
    color: "#1B572F",
  },
});
