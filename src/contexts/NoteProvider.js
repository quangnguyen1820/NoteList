import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteContext = createContext();
const NoteProvider = ({children}) => {
    const [ notes, setNotes] = useState([]);

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result))
    };

    useEffect(() => {
        findNotes();
    },[]);

    return (
        <NoteContext.Provider value={{notes, setNotes, findNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => useContext(NoteContext); 
//thay vì khai báo ở tất cả các trang thì dùng export để các trang khác lấy về
export default NoteProvider
