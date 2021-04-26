import React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import colors from '../misc/colors';


const Note = ({item, onPress}) => {
    const {title, desc} = item;

  return (
      <>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity 
            onPress={onPress} 
            style={[styles.container, {transform: [
                { rotateZ: "-5deg" }]}]}
            >
                <AntDesign name="star" style={styles.pin} size={25} color={'black'} />
                <Text numberOfLines={2} style={styles.title}>{title}</Text>
                <Text numberOfLines={3}>{desc}</Text>
            </TouchableOpacity>
        </View>
    </> 
    );
}

const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: colors.BG_NOTE,
        width: width / 2 - 10,
        padding: 8,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
    },
    pin: {
        textAlign: 'center',
        top: -20,
    },
})

export default Note;