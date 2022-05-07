import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';

import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';

import React,{useState} from 'react';
import AudioRecorderStyle from './AudioRecorderStyle';
import RNFetchBlob from 'rn-fetch-blob';

const styles = StyleSheet.create(AudioRecorderStyle);

const screenWidth = Dimensions.get('screen').width;

const AudioRecorder = ({}) => {
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: 'hello.m4a',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
  };

  const meteringEnabled = false;

  const [recordTime, setRecordTime] = useState('-');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [recordSecs, setRecordSecs] = useState('-');
  const [currentPositionSec, setCurrentPositionSec] = useState('-');
  const [currentDurationSec, setCurrentDurationSec] = useState('-');
  const [playTime, setPlayTime] = useState('-');
  const [duration, setDuration] = useState('-');

  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.1); // optional. Default is 0.5

  let playWidth = (currentPositionSec / currentDurationSec) * (screenWidth - 56);
  if (!playWidth) {
      playWidth = 0;
  }

  const onStatusPress = (e) => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const playWidth =
      (currentPositionSec / currentDurationSec) *
      (screenWidth - 56);
    console.log(`currentPlayWidth: ${playWidth}`);

    const currentPosition = Math.round(currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const onStartRecord = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('write external stroage', grants);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    console.log('audioSet', audioSet);
    //? Custom path
    // const uri = await this.audioRecorderPlayer.startRecorder(
    //   this.path,
    //   audioSet,
    // );

    //? Default path
    const uri = await audioRecorderPlayer.startRecorder(undefined,audioSet,meteringEnabled);

    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('record-back', e);
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
    });
    console.log(`uri: ${uri}`);
  };

  const onPauseRecord = async () => {
    try {
      await audioRecorderPlayer.pauseRecorder();
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);

    //? Default path
    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener((e) => {
      setCurrentDurationSec(e.duration);
      setCurrentPositionSec(e.currentPosition);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleTxt}>Audio Recorder Player</Text>
        <Text style={styles.txtRecordCounter}>{recordTime}</Text>
        <View style={styles.viewRecorder}>
          <View style={styles.recordBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={onStartRecord}
              title="Grabar"
            />

            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={onPauseRecord}
              title="Pausar"
            />
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={onResumeRecord}
              title="Reiniciar"
            />
            <Button
              style={[styles.btn, {marginLeft: 12}]}
              onPress={onStopRecord}
              title="Detener"
            />
          </View>
        </View>
        <View style={styles.viewPlayer}>
          <TouchableOpacity
            style={styles.viewBarWrapper}
            onPress={onStatusPress}
          >
            <View style={styles.viewBar}>
              <View style={[styles.viewBarPlay, {width: playWidth}]} />
            </View>
          </TouchableOpacity>
          <Text style={styles.txtCounter}>
            {playTime} / {duration}
          </Text>
          <View style={styles.playBtnWrapper}>
            <Button
              style={styles.btn}
              onPress={onStartPlay}
              title="Reproducir"
            />
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={onPausePlay}
              title="Pausar"
            />
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={onResumePlay}
              title="Continuar"
            />
            <Button
              style={[
                styles.btn,
                {
                  marginLeft: 12,
                },
              ]}
              onPress={onStopPlay}
              title="Detener"
            />
          </View>
        </View>
      </SafeAreaView>
  );
}
export default AudioRecorder;
