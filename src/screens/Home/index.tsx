import {StyleSheet, Text, View, Pressable} from 'react-native';
import {VolumeManager} from 'react-native-volume-manager';
import React from 'react';
import TimePicker from '../../components/Time/TimePicker';
import TimeDisplay from '../../components/Time/TimeDisplay';
import AddBtn from '../../components/AddBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderBox from '../../components/HeaderBox';

export default function Home({navigation}: any) {
  VolumeManager.showNativeVolumeUI({enabled: true});

  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
      }}>
      <HeaderBox
        title={'Silencer'}
        showSettingsIcon={true}
        navigation={navigation}
      />

      <View>
        <TimePicker />
        <Pressable style={styles.TimeDisplayContainer}>
          <TimeDisplay />
          <Text style={styles.subText}>to</Text>
          <TimeDisplay />
          <Ionicons
            name="trash"
            size={24}
            color="grey"
            style={styles.subText}
          />
        </Pressable>
        <Pressable style={styles.TimeDisplayContainer}>
          <TimeDisplay />
          <Text style={styles.subText}>to</Text>
          <TimeDisplay />
          <Ionicons
            name="trash"
            size={24}
            color="grey"
            style={styles.subText}
          />
        </Pressable>
      </View>
      <AddBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  TimeDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 20,
  },
});
