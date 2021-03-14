import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from  './colors'

// styled views that represent the app screen "container"
export const Container = styled.View`
    flex: 1;
    backgroundColor: ${colors.BACKGROUND};
    alignItems: center;
    justifyContent: center;
    alignContent: space-between;
    flexDirection: column;
    width: ${Dimensions.get('window').width}px;
`

export const SafeAreaContainer = styled.SafeAreaView`
    flex: 1;
    backgroundColor: ${colors.BACKGROUND};
    alignItems: center;
    justifyContent: center;
    alignContent: space-between;
    flexDirection: column;
    width: ${Dimensions.get('window').width}px;
`

// container for stocks
export const GraphView = styled.View`
    flex: 2;
    backgroundColor: ${colors.BACKGROUND};
    width: 100%, 
    borderBottomColor: white;
    borderWidth: 1;
`

// container for transaction history