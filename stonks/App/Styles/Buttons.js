import {Dimensions} from 'react-native';

const Buttons = {
    button: {
        backgroundColor: "#009688",
        fontSize: 40,
        color: "#009688",
        padding: 10,
        margin: 6,
        borderRadius: 4,
        width: Dimensions.get('window').width * .6,
      },
    buttontext: {
      color: '#fff',
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
    }

}

export default Buttons