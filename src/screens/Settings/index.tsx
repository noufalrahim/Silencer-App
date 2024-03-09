import { Alert, Linking, Text, View } from 'react-native'
import React from 'react'
import HeaderBox from '../../components/HeaderBox'
import ModalBox from '../../components/ModalBox'
import { RadioButtonProps } from 'react-native-radio-buttons-group';
import { useMemo } from 'react';
import SettingTiles from './SettingsTile';
import { VolumeManager } from 'react-native-volume-manager';

import {
    useRingerMode,
    RINGER_MODE,
} from 'react-native-volume-manager';


export default function Settings() {
    const [showModal, setShowModal] = React.useState(false);
    const [modeType, setModeType] = React.useState<RadioButtonProps[]>([]);
    React.useEffect(() => {
        const ringerListener = VolumeManager.addRingerListener((status) => {
          console.log(status.mode);
          if(status.mode === 'SILENT'){
            setSelected({
                id: '1',
                mode: 'RINGER_MODE'
            })
          }
          else if(status.mode === 'VIBRATE'){
            setSelected({
                id: '2',
                mode: 'RINGER_MODE'
            })
          }
          else if(status.mode === 'MUTED'){
            setSelected({
                id: '3',
                mode: 'RINGER_MODE'
            })
          }
        });
      
          return () => {
          VolumeManager.removeRingerListener(ringerListener);
        };
      }, []);

    const [selected, setSelected] = React.useState({
            mode: '',
            id: '',
    });

    const { mode, error, setMode } = useRingerMode();

    React.useEffect(() => {
        if (error) {
            Alert.alert('Permission', 'Do not disturb permission is required. Please grant the permission from settings.');
        }
    }, [error])

    const timeFormatMode: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: '12 Hour',
            value: '12Hour'
        },
        {
            id: '2',
            label: '24 Hour',
            value: '24Hour'
        }
    ]), []);

    const ringerMode: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: 'Silent',
            value: 'silentMode'
        },
        {
            id: '2',
            label: 'Vibration',
            value: 'vibrationMode'
        },
        {
            id: '3',
            label: 'Normal',
            value: 'normalMode'
        }
    ]), []);

    const handleIdChange = (id: string, mode: string) => {
        if (mode === 'RINGER_MODE') {
            setSelected({
                id: id,
                mode: mode
            })
        }
        else if (mode === 'TIME_FORMAT') {
            setSelected({
                id: id,
                mode: mode
            })
        }
    }


    const handleModeChange = () => {
        if (selected.mode === 'RINGER_MODE') {
            if (selected.id === '1') {
                setMode(RINGER_MODE.silent)
            } 
            else if (selected.id === '2') {
                setMode(RINGER_MODE.vibrate)
            }
            else if (selected.id === '3') {
                setMode(RINGER_MODE.normal)
            }
        }
        else if (selected.mode === 'TIME_FORMAT') {
            if(selected.id === '1') {
                console.log("12 Hour")
            }
            else{
                console.log("24 Hour")
            }
        }
    }

    React.useEffect(() => {
        handleModeChange()
    }
        , [selected.id, selected.mode])


    const settingsTitles = [{
        heading: "Silent Mode",
        onPress: () => {
            setShowModal(true)
            setSelected({
                ...selected,
                mode: 'RINGER_MODE',
            })
            setModeType(ringerMode)
        },
        icon: "bell-outline",
    },
    {
        heading: "Time Format",
        onPress: () => {
            setShowModal(true)
            setSelected({
                ...selected,
                mode: 'TIME_FORMAT',
            })
            setModeType(timeFormatMode)
        },
        icon: "hours-24",
    },
    {
        heading: "About",
        onPress: () => {
            Alert.alert("About", "Silencer App is a simple app to manage your phone's ringer mode. \n\n© 2024 NOUFAL RAHIM. \n\nALL RIGHTS RESERVED.")
            console.log("About")
        },
        icon: "information-outline",
    },
    {
        heading: "Help",
        onPress: () => {
            Alert.alert("Help", "If you have any queries or need help, please contact me at noufalrahim6784@gmail.com")
            console.log("Help")
        },
        icon: "help-circle-outline",
    },
    {
        heading: "Github Repository",
        onPress: () => {
            const url = "https://github.com/noufalrahim/Silencer-App";
            Linking.openURL(url).catch((err) => console.error('An error occurred', err));
            console.log("Github Repository")
        },
        icon: "chevron-right",
    }
    ];


    return (
        <View
            style={{
                backgroundColor: 'black',
                flex: 1,
            }}>
            <HeaderBox title={"Settings"} showSettingsIcon={false} />
            <View>
                {
                    settingsTitles.map((tile, index) => {
                        return (
                            <SettingTiles
                                key={index}
                                title={tile.heading}
                                onPress={tile.onPress}
                                icon={tile.icon}
                            />
                        )
                    })
                }
            </View>
            {
                showModal &&
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ModalBox
                        modalVisible={showModal}
                        setModalVisible={setShowModal}
                        radioButtonsData={modeType}
                        selectedId={selected.id}
                        handleIdChange={handleIdChange}
                        mode={selected.mode}
                    />
                </View>

            }
        </View >
    )
}

