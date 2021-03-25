import React from 'react';
import { AntDesign} from '@expo/vector-icons';
import {StyleSheet, View, Text } from 'react-native';
import colors from '../mics/colors';

const RoundIconBtn = ({antIconName, size, color,style, onPress}) => {
    return (
        <AntDesign 
            name={antIconName}
            size={size || 24}
            color={color || colors.LIGHT}
            style={[styles.icon, {...style}]}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.BLUELIGHT,
        padding: 10,
        borderRadius: 50,
        elevation: 5
    }
})
export default RoundIconBtn;
