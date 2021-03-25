import React from 'react'
import {StyleSheet, View, Text, Dimensions } from 'react-native'
import colors from '../mics/colors'

const Logo = ({style}) => {
    return (
        <View style={[styles.container, {...style}]}>
            <View style={styles.devider}/>
            <Text style={styles.nameLogo}>Wann<Text style={{color: colors.BLUELIGHT}}>Todo</Text></Text>
            <View style={styles.devider}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',

    },
    nameLogo: {
        fontSize: 35,
        fontWeight: '700',
        color: colors.GRAY,
        paddingHorizontal: 20
    },
    devider: {
        height: 2,
        flex: 1,
        alignSelf: 'center',
        backgroundColor: colors.BLUELIGHT
    }
})
export default Logo
