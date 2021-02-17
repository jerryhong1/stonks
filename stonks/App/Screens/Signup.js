import React, { useState, setState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Buttons from "../Styles/Buttons";

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleName(name) {
    setName(name);
  }
  
  function handleEmail(email) {
    setEmail(email);
  }
  
  function handleUsername(username) {
    setUsername(username);
  }

  function handlePassword(password) {
    setPassword(password);
  }
  
  function createAccount(name, email, username, password){
      alert('name: ' + name + '\r\nemail: ' + email + '\r\nusername: ' + username + '\r\npassword: ' + password);
      // TODO: Add login logic using firebase
      // TODO: Get username and balance using firebase
      let balance = 1000;
      navigation.navigate('Welcome', {
        name: name, 
        email: email, 
        username: username,
        balance: balance
      });
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}  behavior="padding">

      <View style = {styles.header}> 
        <Text style={{fontWeight: "bold", color: "white", fontSize: 30, lineHeight:"50px"}}> Sign up for stonks </Text>
        <Text style={{color: "white", fontSize: 16, textAlign: "center"}}> Create an account to play with stocks and track your performance.</Text>
      </View>


      <View style = {styles.textFields}>
          <TextInput 
            style={styles.inputField} 
            placeholder="Name"
            placeholderTextColor="grey"
            onChangeText = {handleName}
            returnKeyType = {"Next"}
          /> 

          <TextInput 
            style={styles.inputField} 
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText = {handleEmail}
          /> 

          <TextInput 
            style={styles.inputField} 
            placeholder="Username"
            placeholderTextColor="grey"
            onChangeText = {handleUsername}
          /> 


          <TextInput 
            style={styles.inputField} 
            placeholder="Password (8+ characters)"
            placeholderTextColor="grey"
            secureTextEntry
            onChangeText = {handlePassword}
          /> 
        </View> 
          
        <TouchableOpacity
          style = {Buttons.button}
          onPress = {
             () => createAccount(name, email, username, password)
          }
        > 
          <Text style={Buttons.buttontext}> Create Account </Text>
        
        </TouchableOpacity>

        
    </KeyboardAvoidingView>
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
