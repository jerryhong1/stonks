import {Dimensions} from 'react-native';


const Buttons = {
  button: {
      backgroundColor: "#1EDD4E",
      fontSize: 40,
      color: "#1EDD4E",
      padding: 8,
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
  },
  smallButton: {
    backgroundColor: "#1EDD4E",
    fontSize: 40,
    color: "#1EDD4E",
    padding: 8,
    margin: 6,
    borderRadius: 4,
  }

}

export default Buttons
