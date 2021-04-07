import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import colors from '../misc/colors';

const SearchBar = ({containerStyle, value, onClear, onChangeText}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
        <TextInput value={value} onChangeText={onChangeText} style={styles.SearchBar} placeholder={'Pesquisar notas...'} />
        {value ? (<AntDesign 
        name="close" 
        size={20} 
        color={colors.PRIMARY} 
        onPress={onClear} 
        style={styles.clearIcon}
        />) : null}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    SearchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    },
    clearIcon: {
       position: 'absolute' ,
       right: 10,
    }
})

export default SearchBar;