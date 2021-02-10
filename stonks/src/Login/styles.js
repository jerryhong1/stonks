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
  },
  input: {
      margin: 15,
      height: 40,
      width: 150,
      color: '#fff',
      borderColor: '#009688',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
   },
   submitButton: {
      backgroundColor: '#009688',
      padding: 10,
      margin: 15,
      height: 40,
      width: 150,
      borderRadius: 5,
   },
   submitButtonText:{
      color: 'white',
      textAlign: 'center'
   }
});
