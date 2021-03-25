import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/stack';
import {StyleSheet, View, Text, ScrollView, Alert, Dimensions } from 'react-native'

import Logo from '../components/Logo';
import RoundIconBtn from '../components/RoundIconBtn';
import { useNotes } from '../contexts/NoteProvider';
import colors from '../mics/colors';
import AddNoteScreen from './AddNoteScreen';

const formatDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes() ;
    const sec = date.getSeconds();

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
};

const NodeDetails = (props) => {
    const [ note, setNote] = useState(props.route.params.note);
    const headerHeight = useHeaderHeight();
    const {setNotes} = useNotes();
    const [ isEdit, setIsEdit ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const displayDeleteAlert = () => {
        Alert.alert('Xóa ghi chú', 'Bạn có muốn khóa nội dung này' , [
            {
                text: 'Xóa',
                onPress: deleteNote
            },
            {
                text: 'Hủy',
                onPress: () => console.log('Đã hũy')
            }
        ],
            {
                cancelable: true
            }
        );
    };
    
    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes')
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => n.id !== note.id);
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
        props.navigation.goBack();
    };

    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    };

    const handleOnClose = () => setShowModal(false);

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);

        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
                n.title = title
                n.desc = desc
                n.isUpdate = true
                n.time = time

                setNote(n)
            }
            return n;
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }

    return (
        <>
        <View style={[{paddingTop: headerHeight, marginBottom: 15} ]}>
            <Logo/>
        </View>
        <ScrollView style={[styles.container]}>
            <Text style={styles.time}>{note.isUpdate ? `Thay đổi lúc: ${formatDate(note.time)}` : `Thêm lúc ${formatDate(note.time)}` }</Text>
            <Text style={styles.title}>{note.title}</Text>
            <View style={styles.devider}/>
            <Text style={styles.desc}>{note.desc}</Text>
        </ScrollView>

        <View style={styles.btnContainer}>
            <RoundIconBtn 
                antIconName='delete'
                style={{backgroundColor: colors.ERROR, marginBottom: 10}}  
                onPress={displayDeleteAlert}
            />
            <RoundIconBtn 
                antIconName='edit'
                style={{backgroundColor: colors.BLUE, marginBottom: 10}} 
                onPress={openEditModal}   
            />
        </View>
        <AddNoteScreen isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
        </>
    )
}
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    time: {
        textAlign: 'right',
        opacity: 0.5
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.BLUELIGHT,
        marginBottom: 10
    },
    devider: {
        borderWidth: 1,
        marginBottom: 20,
        width: width/2,
        opacity: 0.5
    },
    desc: {
        fontSize: 20,
        opacity: 0.6
    },
    btnContainer: {
        position:'absolute',
        right: 15,
        bottom: 50
    }
})
export default NodeDetails
