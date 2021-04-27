import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';

import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';
import pauta from '../assets/line.png'

const formatDate = ms => {
    const date = new Date(ms)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hrs = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
}

const NoteDetail = props => {
    const [note, setNote] = useState(props.route.params.note)
    const headerHeight = useHeaderHeight()
    const {setNotes} = useNotes()
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if(result !== null) notes = JSON.parse(result)
    
        const newNotes = notes.filter(n => n.id !== note.id)
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
        props.navigation.goBack()
    }
    
    const displayDeleteAlert = () => {
        Alert.alert('Tem certeza?', 'Isso apagará a nota permanentemente!', [{
            text: 'Apagar',
            onPress: deleteNote
        },
        {
            text: 'Não, obrigado',
            onPress: () => console.log('Não, obrigado')
        }
    ], {
        cancelable: true
    })
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if(result !== null) notes = JSON.parse(result)

        const newNotes = notes.filter(n => {
            if(n.id === note.id){
                n.title = title
                n.desc = desc
                n.isUpdated = true 
                n.time = time

                setNote(n)
            }
            return n
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }

    const handleOnClose = () => setShowModal(false)

    const openEditModal = () => {
        setIsEdit(true)
        setShowModal(true)
    }

    return (
      <>
      <ScrollView contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
          <Text style={styles.time}>{note.isUpdated ? `Atualizada em ${formatDate(note.time)}` : `Criada em ${formatDate(note.time)}`}</Text>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
              <RoundIconBtn 
              antIconName='delete' 
              style={{backgroundColor: colors.ERROR, marginBottom: 15}} 
              onPress={displayDeleteAlert}
              />
              <RoundIconBtn 
              antIconName='edit'
              onPress={openEditModal}
              />
          </View>
          <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
      </>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        
    },
    title: {
        fontSize: 25,
        color: colors.DARK,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 20,
        opacity: 0.6,
        color: colors.DARK,
        borderWidth: 0.5,
        padding: 5,
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5,
    },
    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    }
})

export default NoteDetail;