import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {StyleSheet, View, Text, TextInput, Dimensions } from 'react-native'
import colors from '../mics/colors'

const SearchBar = ({style, value, onChangeText, onClear }) => {
    return (
        <View style={[styles.container, {...style}]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.inputSearch}
                placeholder={'Tìm tại đây...'}
            />
            <AntDesign 
                name='close'
                size={20}
                color={colors.BLUELIGHT}
                onPress={onClear}
                style={styles.clearIcon}
            />
        </View>
    )
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        justifyContent:'center'
    },
    inputSearch: {
        width: width - 50,
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 18,
        padding: 8
    },
    clearIcon:{
        position:'absolute',
        right: 15
    }
})
export default SearchBar
