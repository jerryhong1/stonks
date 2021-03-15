import React from 'react';
import { Dimensions, View } from 'react-native';
import { colors } from './colors'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons';


export const StonksTouchable = styled.TouchableOpacity`
  backgroundColor: ${props => props.variant === "secondary" ? "#000" : props.disabled ? colors.GREEN + '66' : colors.GREEN};
  fontSize: 40px;
  color: ${props => props.variant === "secondary" ? "#000" : colors.GREEN};
  width: ${props => props.width || Dimensions.get('window').width * .6}px;
  padding: 8px;
  margin: 6px;
  borderRadius: 4px;
  alignSelf: center;
`

export const ButtonText = styled.Text`
  color: ${props => props.variant === "secondary" ? colors.GREEN : props.disabled ? '#FFFFFF66' : 'white'};
  fontSize: 16px;
  textAlign: center;
  fontWeight: 500;
`

// button component with:
//  primary = green background
// secondary = text only (no background)
// width = width. if not specified, full-width
export const StonksButton = function({variant, width, disabled, text, onPress, style}) {
  return (
  <StonksTouchable 
    variant={variant}
    onPress={onPress} 
    disabled={disabled}
    width={width}
    style={style}
  >
    <ButtonText disabled={disabled} variant={variant}>{text}</ButtonText>
  </StonksTouchable>
  )
}

export const StonksIconButton = function({variant, width, disabled, text, onPress, style, iconName}) {
  return (
  <StonksTouchable 
    onPress={onPress} 
    disabled={disabled}
    width={width}
    style={style}
  >
    <View style={{flexDirection: 'row', alignItems: 'center'}} > 
        <Ionicons name={iconName} size={24} color='white' style={{marginRight: 10}} />
        <ButtonText disabled={disabled}  variant={variant}>{text}</ButtonText>
    </View>
  </StonksTouchable>
  )
}

const Buttons = {
  button: {
    backgroundColor: colors.GREEN,
    fontSize: 40,
    color: colors.GREEN,
    padding: 8,
    margin: 6,
    borderRadius: 4,
    width: Dimensions.get('window').width * .6,
  },
  welcomeButton: {
    backgroundColor: colors.WHITE,
    fontSize: 40,
    paddingVertical: 14,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 10,
    width: Dimensions.get('window').width * .8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75
  },
  buttontext: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  welcomeButtonText: {
    color: 'black',
    // textAlign: 'flex-start',
    fontSize: 25,
    fontWeight: 'bold',
  },
  triangle: {
    marginTop: 12,
  },
  buttontextdisabled: {
    color: colors.GREEN,
    fontSize: 15,
    textAlign: 'center',
  },
  secondary: {
      backgroundColor: "#000",
      fontSize: 24,
      color: "#FFF",
      padding: 10,
      margin: 6,
      borderRadius: 4,
      width: Dimensions.get('window').width * .6,
  },
  disabled: {
    backgroundColor: colors.GREEN + '66',
    fontSize: 40,
    color: colors.GREEN,
    padding: 8,
    margin: 6,
    borderRadius: 4,
    width: Dimensions.get('window').width * .6,
  },
  smallButton: {
    backgroundColor: colors.GREEN,
    fontSize: 40,
    color: colors.GREEN,
    padding: 8,
    margin: 6,
    borderRadius: 4,
  }

}
export default Buttons
