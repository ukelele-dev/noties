import React from 'react';
import { StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import colors from '../misc/colors';

const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
  return (
      <AntDesign 
      name={antIconName} 
      size={size || 24} 
      color={color || colors.LIGHT} 
      style={[styles.icon, {...style}]} 
      onPress={onPress}
      />
  )
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#c444e8',
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    }
})

export default RoundIconBtn;