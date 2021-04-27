import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import Note from '../components/Note';
import {useNotes} from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';
import bg_img from '../assets/steel.jpg'

const reverseData = data => {
    return data.sort((a, b) => {
        const aInt = parseInt(a.time)
        const bInt = parseInt(b.time)
        if(aInt < bInt) return 1
        if (aInt == bInt) return 0
        if (aInt > bInt) return -1
    })
}


const NoteScreen = ({user, navigation}) => {
    const [greet, setGreet] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const {notes, setNotes, findNotes} = useNotes()
    const [resultNotFound, setResultNotFound] = useState(false)

    const findGreet = () => {
        const hrs = new Date().getHours()
        if(hrs === 0 || hrs < 12) return setGreet('Bom dia')
        if(hrs === 1 || hrs < 17) return setGreet('Boa tarde')
        setGreet('Boa noite')
    }

    useEffect(() => {
        findGreet()
    }, [])

    const reverseNotes = reverseData(notes)

    const handleOnSubmit = async (title, desc) => {
        const note = {id: Date.now(), title, desc, time: Date.now()}
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    const openNote = (note) => {
        navigation.navigate('NoteDetail', {note})
    }

    const handleOnSearchInput = async text => {
        setSearchQuery(text)
        if(!text.trim()){
            setSearchQuery('')
            setResultNotFound(false)
            return await findNotes()
        }
        const filteredNotes = notes.filter(note => {
            if(note.title.toLowerCase().includes(text.toLowerCase())){
                return note
            }
        })

        if(filteredNotes.length){
            setNotes([...filteredNotes])
        }else{
            setResultNotFound(true)
        }
    }

    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findNotes()
    }

    function randomColor() {
        return '#' + parseInt((Math.random() * 0xFFFFFF))
        .toString(16)
        .padStart(6, '0')
    }
  

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.header}>{`${greet}, ${user.name}!`}</Text>
            {notes.length ?  <SearchBar 
                value={searchQuery}
                onChangeText={handleOnSearchInput} 
                containerStyle={{marginVertical: 15}}
                onClear={handleOnClear}
                /> : null}

                {resultNotFound ? <NotFound/> : 
                <View style={{flex: 1}}>
                 <ImageBackground source={bg_img} style={{width: '100%', height: '100%'}} >
                    
                <FlatList
                    data={reverseNotes} 
                    numColumns={2} 
                    columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15 }}
                    keyExtractor={item => item.id.toString()} 
                    renderItem={({item}) => 
                    <Note onPress={() => openNote(item)} item={item} bgcolor={randomColor()} />} 
                />

                 </ImageBackground>
                </View>
                }
               
                
                {!notes.length ? (
                    <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>Add Notes</Text>
                </View>)
                : null}
                
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn onPress={() => setModalVisible(true)} antIconName='plus' style={styles.addBtn} />
        <NoteInputModal visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
        />
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACKGROUND,
        paddingHorizontal: 10,
        flex: 1,
        zIndex: 1
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.TEXT,
        marginTop: 20,
        textAlign: 'right'
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1
    }
})

export default NoteScreen;