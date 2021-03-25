import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View, Text, StatusBar, Dimensions, TextInput } from 'react-native'

import Logo from '../components/Logo'
import Roundiconbtn from '../components/RoundIconBtn'
import colors from '../mics/colors'

const HomeScreen = ({onFinish}) => {
    const [name, setName] = useState('');

    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if (onFinish) onFinish();
    }

    return (
        <>
        <StatusBar/>
        <View style={styles.container}>
            <Logo style={styles.logo}/>
            <View style={styles.header}>
                <TextInput 
                    style={styles.input}
                    value={name}
                    placeholder={"Nhập tên của bạn..."}    
                    onChangeText={(text) => setName(text)}
                />
            </View>
            {name.trim().length >= 3 ? (
            <Roundiconbtn 
                style={styles.addBtn}
                antIconName='arrowright' 
                style={{marginTop: 25}}
                onPress={handleSubmit}
            />
            ): null }
            
            <View style={styles.footer}>
                <Text>Nguyễn Thành Quang</Text>
                <Text>Email: thanhquang8426@gmail.com</Text>
            </View>
        </View>
        
        </>
    )
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    logo: {
        marginTop: width/2.9
    },
    header: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    input: {
        width: width - 50 ,
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.BLUELIGHT,
        marginTop: 120,
        padding: 10,
        fontSize: 20
    }, 
    addBtn: {
        zIndex: 1
    },
    footer: {
        marginTop: 320,
        marginRight: 80,
        opacity: 0.6
    }
})
export default HomeScreen