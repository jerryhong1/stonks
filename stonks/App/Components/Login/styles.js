import { StyleSheet, Dimensions } from "react-native";


export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  text: {
      textAlign: 'center',
      fontSize: 25,
      color: '#fff'
    },

  // TO MOVE INTO STYLES 
  button: {
      backgroundColor: "#009688",
      fontSize: 40,
      color: "#009688",
      padding: 10,
      margin: 6,
      borderRadius: 4,
      width: 180,
    },
  buttontext: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  }
});
