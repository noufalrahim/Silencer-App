import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function AddBtn() {
  return (
    <TouchableOpacity
      style={styles.container}
    >
        <Ionicons name="add" size={24} color="white" style={styles.text}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        height: 50,
        width: 50,
        borderRadius: 25,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        color: 'white',
    },
})