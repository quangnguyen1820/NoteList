import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import {StyleSheet, View, Text } from 'react-native'

const NotFound = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject, styles.container]}>
            <AntDesign name='frowno' size={90} color='black' />
            <Text style={{marginTop: 20, fontSize: 25}}>Từ khóa không có</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1
    }
})
export default NotFound
