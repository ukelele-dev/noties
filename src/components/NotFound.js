import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// import { Container } from './styles';
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

const NotFound = () => {
  return (
  <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <AntDesign name="frowno" size={90} color='white' />
      <Text style={{marginTop: 20, fontSize: 20, color: colors.TEXT}}>Não encontrado</Text>
  </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1
    }
})

export default NotFound;