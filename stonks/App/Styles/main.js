import { ThemeProvider } from '@react-navigation/native';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native'
import { colors, fontSizes} from './theme'

// container
export const Container = styled.View`
    flex: 1;
    backgroundColor: black;
    alignItems: center;
    justifyContent: center;
    alignContent: space-between;
    flexDirection: column;
    width: ${Dimensions.get('window').width};
`

export const SafeAreaContainer = styled.SafeAreaView`
    flex: 1;
    alignItems: center;
    justifyContent: center;
    alignContent: space-between;
    flexDirection: column;
    width: ${Dimensions.get('window').width};
`

// text
export const H1 = styled.Text`
    fontSize: 30;
    lineHeight: 40;
    fontWeight: 500;
    color: white;
`
export const H2 = styled.Text`
    fontSize: 24;
    lineHeight: 32;
    fontWeight: 500;
    color: white;
`
export const H3 = styled.Text`
    fontSize: 18;
    lineHeight: 24;
    fontWeight: 500;
    color: white;
`

export const H4 = styled.Text`
    fontSize: 16;
    lineHeight: 20;
    fontWeight: 500;
    color: white;
`

export const Body1 = styled.Text`
    fontSize: 14;
    lineHeight: 18;
    color: white;
`

export const Body2 = styled.Text`
    fontSize: 12;
    lineHeight: 16;
    color: white;
`

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
    backgroundColor: colors.GREEN + '88',
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
