import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

// styled views that represent the app screen "container"
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
