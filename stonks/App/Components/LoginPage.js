import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Buttons from "../Styles/Buttons";

export default function LoginPage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function handleUsername(username) {
    setUsername(username);
  }

  function handlePassword(password) {
    setPassword(password);
  }
  
  function login(username, password){
      alert('username: ' + username + ' password: ' + password);
      // TODO: Add login logic using firebase
      // TODO: Get name, email, username and balance using firebase
      let name = 'tempName';
      let email = 'temp@gmail.com';
      let balance = 0;
      navigation.navigate('Welcome', {
        name: name, 
        email: email,
        username: username,
        balance: balance
      });
  }
  
  return (
    <View style={styles.container}>
      <View style = {styles.header}> 
        <Text style={{fontWeight: "bold", color: "white", fontSize: 30}}> Login to stonks </Text>
      </View>
      <View style = {styles.textFields}>
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
            onChangeText = {handlePassword}
          /> 
        </View> 
          
        <TouchableOpacity
          style = {Buttons.button}
          onPress = {
             () => login(username, password)
          }
        > 
          <Text style={Buttons.buttontext}> Login </Text>
        
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
