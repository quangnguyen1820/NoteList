import React from 'react'
import {StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../mics/colors';

const Note = ({item, onPress}) => {
    const {title, desc} = item;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.desc} numberOfLines={3}>{desc}</Text>
        </TouchableOpacity>
    )
};

const {width}  = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: (width -40 )/2 - 5,
        backgroundColor: colors.BLUELIGHT,
        padding: 10,
        borderRadius: 10,
        marginBottom: 7
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.LIGHT
    },
})
export default Note
