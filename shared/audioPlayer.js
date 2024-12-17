import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import ProgressBar from "./progressBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function MyPlayer(props) {
  const paths = [
    require("../assets/audio/PS1_FINAL.mp3"),
    require("../assets/audio/PS2_FINAL.mp3"),
    require("../assets/audio/PS3_FINAL.mp3"),
    require("../assets/audio/PS4_FINAL.mp3"),
    require("../assets/audio/PS5_FINAL.mp3"),
    require("../assets/audio/PS6_FINAL.mp3"),
    require("../assets/audio/PS7_FINAL.mp3"),
    require("../assets/audio/PS8_FINAL.mp3"),
    require("../assets/audio/PS9_FINAL.mp3"),
    require("../assets/audio/PS10_FINAL.mp3"),
    require("../assets/audio/PS11_FINAL.mp3"),
    require("../assets/audio/PS12_FINAL.mp3"),
    require("../assets/audio/PS13_FINAL.mp3"),
    require("../assets/audio/PS14_FINAL.mp3"),
    require("../assets/audio/PS15_FINAL.mp3"),
    require("../assets/audio/PS16_FINAL.mp3"),
    require("../assets/audio/PS17_FINAL.mp3"),
    require("../assets/audio/PS18_FINAL.mp3"),
    require("../assets/audio/PS19_FINAL.mp3"),
    require("../assets/audio/PS20_FINAL.mp3"),
    require("../assets/audio/PS21_FINAL.mp3"),
    require("../assets/audio/PS22_FINAL.mp3"),
    require("../assets/audio/PS23_FINAL.mp3"),
    require("../assets/audio/PS24_FINAL.mp3"),
    require("../assets/audio/PS25_FINAL.mp3"),
    require("../assets/audio/PS26_FINAL.mp3"),
    require("../assets/audio/PS27_FINAL.mp3"),
    require("../assets/audio/PS28_FINAL.mp3"),
    require("../assets/audio/PS29_FINAL.mp3"),
    require("../assets/audio/PS30_FINAL.mp3"),
    require("../assets/audio/PS31_FINAL.mp3"),
    require("../assets/audio/PS32_FINAL.mp3"),
    require("../assets/audio/PS33_FINAL.mp3"),
    require("../assets/audio/PS34_FINAL.mp3"),
    require("../assets/audio/PS35_FINAL.mp3"),
    require("../assets/audio/PS36_FINAL.mp3"),
    require("../assets/audio/PS37_FINAL.mp3"),
    require("../assets/audio/PS38_FINAL.mp3"),
    require("../assets/audio/PS39_FINAL.mp3"),
    require("../assets/audio/PS40_FINAL.mp3"),
    require("../assets/audio/PS41_FINAL.mp3"),
    require("../assets/audio/PS42_FINAL.mp3"),
    require("../assets/audio/PS43_FINAL.mp3"),
    require("../assets/audio/PS44_FINAL.mp3"),
    require("../assets/audio/PS45_FINAL.mp3"),
    require("../assets/audio/PS46_FINAL.mp3"),
    require("../assets/audio/PS47_FINAL.mp3"),
    require("../assets/audio/PS48_FINAL.mp3"),
    require("../assets/audio/PS49_FINAL.mp3"),
    require("../assets/audio/PS50_FINAL.mp3"),
    require("../assets/audio/PS51_FINAL.mp3"),
    require("../assets/audio/PS52_FINAL.mp3"),
    require("../assets/audio/PS53_FINAL.mp3"),
    require("../assets/audio/PS54_FINAL.mp3"),
    require("../assets/audio/PS55_FINAL.mp3"),
    require("../assets/audio/PS56_FINAL.mp3"),
    require("../assets/audio/PS57_FINAL.mp3"),
    require("../assets/audio/PS58_FINAL.mp3"),
    require("../assets/audio/PS59_FINAL.mp3"),
    require("../assets/audio/PS60_FINAL.mp3"),
    require("../assets/audio/PS61_FINAL.mp3"),
    require("../assets/audio/PS62_FINAL.mp3"),
    require("../assets/audio/PS63_FINAL.mp3"),
    require("../assets/audio/PS64_FINAL.mp3"),
    require("../assets/audio/PS65_FINAL.mp3"),
    require("../assets/audio/PS66_FINAL.mp3"),
    require("../assets/audio/PS67_FINAL.mp3"),
    require("../assets/audio/PS68_FINAL.mp3"),
    require("../assets/audio/PS69_FINAL.mp3"),
    require("../assets/audio/PS70_FINAL.mp3"),
    require("../assets/audio/PS71_FINAL.mp3"),
    require("../assets/audio/PS72_FINAL.mp3"),
    require("../assets/audio/PS73_FINAL.mp3"),
    require("../assets/audio/PS74_FINAL.mp3"),
    require("../assets/audio/PS75_FINAL.mp3"),
    require("../assets/audio/PS76_FINAL.mp3"),
    require("../assets/audio/PS77_FINAL.mp3"),
    require("../assets/audio/PS78_FINAL.mp3"),
    require("../assets/audio/PS79_FINAL.mp3"),
    require("../assets/audio/PS80_FINAL.mp3"),
    require("../assets/audio/PS81_FINAL.mp3"),
    require("../assets/audio/PS82_FINAL.mp3"),
    require("../assets/audio/PS83_FINAL.mp3"),
    require("../assets/audio/PS84_FINAL.mp3"),
    require("../assets/audio/PS85_FINAL.mp3"),
    require("../assets/audio/PS86_FINAL.mp3"),
    require("../assets/audio/PS87_FINAL.mp3"),
    require("../assets/audio/PS88_FINAL.mp3"),
    require("../assets/audio/PS89_FINAL.mp3"),
    require("../assets/audio/PS90_FINAL.mp3"),
    require("../assets/audio/PS91_FINAL.mp3"),
    require("../assets/audio/PS92_FINAL.mp3"),
    require("../assets/audio/PS93_FINAL.mp3"),
    require("../assets/audio/PS94_FINAL.mp3"),
    require("../assets/audio/PS95_FINAL.mp3"),
    require("../assets/audio/PS96_FINAL.mp3"),
    require("../assets/audio/PS97_FINAL.mp3"),
    require("../assets/audio/PS98_FINAL.mp3"),
    require("../assets/audio/PS99_FINAL.mp3"),
    require("../assets/audio/PS100_FINAL.mp3"),
    require("../assets/audio/PS101_FINAL.mp3"),
    require("../assets/audio/PS102_FINAL.mp3"),
    require("../assets/audio/PS103_FINAL.mp3"),
    require("../assets/audio/PS104_FINAL.mp3"),
    require("../assets/audio/PS105_FINAL.mp3"),
    require("../assets/audio/PS106_FINAL.mp3"),
    require("../assets/audio/PS107_FINAL.mp3"),
    require("../assets/audio/PS108_FINAL.mp3"),
    require("../assets/audio/PS109_FINAL.mp3"),
    require("../assets/audio/PS110_FINAL.mp3"),
    require("../assets/audio/PS111_FINAL.mp3"),
    require("../assets/audio/PS112_FINAL.mp3"),
    require("../assets/audio/PS113_FINAL.mp3"),
    require("../assets/audio/PS114_FINAL.mp3"),
    require("../assets/audio/PS115_FINAL.mp3"),
    require("../assets/audio/PS116_FINAL.mp3"),
    require("../assets/audio/PS117_FINAL.mp3"),
    require("../assets/audio/PS118_FINAL.mp3"),
    require("../assets/audio/PS119_FINAL.mp3"),
    require("../assets/audio/PS120_FINAL.mp3"),
    require("../assets/audio/PS121_FINAL.mp3"),
    require("../assets/audio/PS122_FINAL.mp3"),
    require("../assets/audio/PS123_FINAL.mp3"),
    require("../assets/audio/PS124_FINAL.mp3"),
    require("../assets/audio/PS125_FINAL.mp3"),
    require("../assets/audio/PS126_FINAL.mp3"),
    require("../assets/audio/PS127_FINAL.mp3"),
    require("../assets/audio/PS128_FINAL.mp3"),
    require("../assets/audio/PS129_FINAL.mp3"),
    require("../assets/audio/PS130_FINAL.mp3"),
    require("../assets/audio/PS131_FINAL.mp3"),
    require("../assets/audio/PS132_FINAL.mp3"),
    require("../assets/audio/PS133_FINAL.mp3"),
    require("../assets/audio/PS134_FINAL.mp3"),
    require("../assets/audio/PS135_FINAL.mp3"),
    require("../assets/audio/PS136_FINAL.mp3"),
    require("../assets/audio/PS137_FINAL.mp3"),
    require("../assets/audio/PS138_FINAL.mp3"),
    require("../assets/audio/PS139_FINAL.mp3"),
    require("../assets/audio/PS140_FINAL.mp3"),
    require("../assets/audio/PS141_FINAL.mp3"),
    require("../assets/audio/PS142_FINAL.mp3"),
    require("../assets/audio/PS143_FINAL.mp3"),
    require("../assets/audio/PS144_FINAL.mp3"),
    require("../assets/audio/PS145_FINAL.mp3"),
    require("../assets/audio/PS146_FINAL.mp3"),
    require("../assets/audio/PS147_FINAL.mp3"),
    require("../assets/audio/PS148_FINAL.mp3"),
    require("../assets/audio/PS149_FINAL.mp3"),
    require("../assets/audio/PS150_FINAL.mp3"),
  ];

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
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused) {
      pause();
    }
  }, [focused]);

  const intervalRef = useRef();
  const [sequence, setSequence] = useState(0);
  const loadingIdRef = useRef(0);
  const shouldPlay = useRef(false);

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

    let isCancelled = false;
    loadingIdRef.current += 1;
    const currentLoadingId = loadingIdRef.current;
    async function loadAudio() {
      if (state.playbackInstance) {
        await state.playbackInstance.unloadAsync();
      }

      try {
        const source = paths[props.chapter - 1];

        const sound = new Audio.Sound();
        await sound.loadAsync(source, {
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
      }
    }

    loadAudio();

    return () => {
      isCancelled = true;
    };
  }, [props.chapter]);

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
