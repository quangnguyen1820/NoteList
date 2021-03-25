import { AntDesign } from '@expo/vector-icons'
import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, Modal, TextInput } from 'react-native'
import Logo from '../components/Logo'
import RoundIconBtn from '../components/RoundIconBtn'
import colors from '../mics/colors'

const AddNoteScreen = ({visible, onClose, onSubmit, isEdit, note}) => {
    const [ title, setTitle ] = useState('')
    const [ desc, setDesc ] = useState('');

    useEffect(() => {
        if(isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        }
    },[isEdit])

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor === 'desc') setDesc(text);
    };
    
    const handleSubmit = () => {
        if (!title.trim() && desc.trim()) return onClose()
        
        if (isEdit) {
            onSubmit(title, desc, Date.now())
        }else {
            onSubmit(title, desc),
            setTitle('');
            setDesc('');
        }
        onClose();
    };

    const closeModal = () => {
        if (!isEdit) {
            setDesc('')
            setTitle('');
        }
        onClose();
    }

    return (
        <Modal visible={visible} animationType="fade">
            <AntDesign
                name='arrowleft'
                size={30}
                style={{padding: 10}}
                onPress={closeModal}
            />

            <View style={{flex:1}}>
                <Logo style={styles.logo}/>
                <View style={styles.conten}>
                    <TextInput
                        style={[styles.input, styles.title]}
                        value={title}
                        placeholder={"Tiêu đề..."}
                        onChangeText={(text) => handleOnChangeText(text, 'title')}
                    />
                    <TextInput
                        style={[styles.input, styles.desc]}
                        multiline
                        value={desc}
                        placeholder={"Nội dung..."}
                        onChangeText={(text) => handleOnChangeText(text, 'desc')}
                    />
                    <View style={styles.btnContainer}>
                        <RoundIconBtn
                            antIconName='check'
                            onPress={handleSubmit}
                            size={20}
                        />
                        {title.trim() || desc.trim() ? (
                            <RoundIconBtn
                            antIconName='close'
                            style={{marginLeft: 15}}
                            onPress={closeModal}
                            size={20}
                            />
                        ): null}
                        
                    </View>

                    <View style={styles.footer}>
                        <Text>Nguyễn Thành Quang</Text>
                        <Text>Email: thanhquang8426@gmail.com</Text>
                    </View>
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: 50
    },
    conten: {
        paddingHorizontal: 20,
        paddingTop: 15,
        marginTop: 45,
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 18,
        color: colors.DARK,
        borderColor: colors.BLUELIGHT,
        padding: 5
    },
    title: {
        height: 45,
        marginBottom: 15,
        fontWeight: '700'
    },
    desc: {
        height: 120
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
    },
    footer: {
        marginTop: 163,
        opacity: 0.5
    }
})
export default AddNoteScreen
