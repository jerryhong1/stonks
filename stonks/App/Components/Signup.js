import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Buttons from "../Styles/Buttons";

export default function Signup({navigation}) {
  return (
    <View style={styles.container}>

      <View style = {styles.header}> 
        <Text style={{fontWeight: "bold", color: "white", fontSize: 30}}> Sign up for stonks </Text>
        <Text style={{color: "white", fontSize: 16}}> Create an account to play with stocks and track your performance.</Text>
      </View>


      <View style = {styles.textFields}>
          <TextInput 
            style={styles.inputField} 
            placeholder="First Name"
            placeholderTextColor="grey"
          /> 

          <TextInput 
            style={styles.inputField} 
            placeholder="Email"
            placeholderTextColor="grey"
          /> 

          <TextInput 
            style={styles.inputField} 
            placeholder="Username"
            placeholderTextColor="grey"
          /> 


          <TextInput 
            style={styles.inputField} 
            placeholder="Password (8+ characters)"
            placeholderTextColor="grey"
          /> 
        </View> 
          
        <TouchableOpacity
          style = {Buttons.button}
          onPress={() => navigation.navigate('Welcome')}
        > 
          <Text style={Buttons.buttontext}> Create Account </Text>
        
        </TouchableOpacity>

        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: "space-between",
    flexDirection: 'column',
  },
  header: {
    alignItems: "center",
    justifyContent: "center", 
    width: Dimensions.get('window').width * .8,
  },
  textFields: {
    margin: 20, 
  },
  text: {
      color: 'white',
  },
  inputField: {
    backgroundColor: 'white', 
    width: Dimensions.get('window').width * .6,
    borderRadius: 10, 
    padding: 10, 
    margin: 5
  }, 

});
