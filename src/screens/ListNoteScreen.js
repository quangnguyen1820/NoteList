import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Logo from '../components/Logo';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import { useNotes } from '../contexts/NoteProvider';
import AddNoteScreen from './AddNoteScreen';
import Note from './Note';
import NotFound from './NotFound';


const ListNoteScreen = ({user, navigation}) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    //useNotes() dùng để thay thế const [ notes, setNotes] = useState([]);
    const { notes, setNotes, findNotes} = useNotes(); 
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ resultNotFound, setResultNotFound ] = useState(false)

    const handleOnSubmit = async (title, desc) => {
        const note = {id: Date.now(), title, desc, time: Date.now()};
        const updateNote = [...notes, note];
        setNotes(updateNote)
        await AsyncStorage.setItem('notes', JSON.stringify(updateNote))
    };

    const openNote = note => {
        navigation.navigate('NodeDetails', {note})
    };

    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()){
            setSearchQuery('');
            setResultNotFound(false);
            return await findNotes();
        };
        const filteredNotes = notes.filter(note => {
            if(note.title.toLowerCase().includes(text.toLowerCase())){
                return note
            };
        });

        if (filteredNotes.length){
            setNotes([...filteredNotes])
        }else{
            setResultNotFound(true)
        }
    };

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
    };

    return (
        <>
        <StatusBar barStyle='light-content' />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                    <Logo style={{marginTop: 18}}/>

                <View style={styles.content}>
                    {notes.length ? (
                        <SearchBar 
                        style={styles.inputSearch}
                        value={searchQuery}
                        onChangeText={handleOnSearchInput}
                        onClear={handleOnClear}    
                    />
                    ): null}
                    

                    {resultNotFound ? ( <NotFound/> ) : (
                        <FlatList
                        data={notes}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <Note onPress={() => openNote(item)} item={item}/>
                        )}
                    />
                    )}
                    
                    {!notes.length ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>Danh sách</Text>
                        </View>
                    ): null}

                    <View style={styles.footer}>
                        <Text>Nguyễn Thành Quang</Text>
                        <Text>Email: thanhquang8426@gmail.com</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>

        <RoundIconBtn 
            antIconName='plus'
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
        />
        <AddNoteScreen
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleOnSubmit}
        />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        zIndex: -1,
        flex: 1
    },
    inputSearch: {
        marginTop: 10,
        marginBottom: 20
    },
    emptyHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: '700',
        opacity: 0.2
    },
    addBtn: {
        position: 'absolute',
        right: 17,
        bottom: 36
    },
    footer: {
        opacity: 0.5,
        marginBottom: 35
    }
})
export default ListNoteScreen
