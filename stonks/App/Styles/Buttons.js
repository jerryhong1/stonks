import { Dimensions } from 'react-native';
import { colors } from './theme'
import styled from 'styled-components/native'


export const StonksTouchable = styled.TouchableOpacity`
  backgroundColor: ${props => props.variant === "secondary" ? "#000" : colors.GREEN};
  fontSize: 40;
  color: ${props => props.variant === "secondary" ? "#000" : colors.GREEN};
  width: ${props => props.width || Dimensions.get('window').width * .6};
  padding: 8;
  margin: 6;
  borderRadius: 4;
`

export const ButtonText = styled.Text`
  color: ${props.disabled ? colors.GREEN : 'white'};
  fontSize: 16;
  textAlign: center;
`

// button component with:
//  primary = green background
// secondary = text only (no background)
// size: width. if not specified, full-width
export const StonksButton = function({variant, width, disabled, text, onPress}) {
  console.log(variant, width, disabled, text, onPress)
  return (
  <StonksTouchable 
    variant={variant}
    onPress={onPress} 
    disabled={disabled}
    width={width}
  >
    <ButtonText disabled={disabled}>{text}</ButtonText>
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
  buttontext: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
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
