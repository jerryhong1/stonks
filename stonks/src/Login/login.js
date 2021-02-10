import React, { useState, setState} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { styles } from './styles';
import Profile from '../Profile'
import { useNavigation } from '@react-navigation/native';


function LoginPage ({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(text){
    setEmail(text);
  }
  function handlePassword(text){
    setPassword(text);
  }

  function login(email, pass){
      alert('email: ' + email + ' password: ' + pass);
      // TODO: Add login logic using firebase
      // TODO: Get username and balance using firebase
      let username = 'testUser';
      let balance = 1000;
      navigation.navigate('Profile', {
        username: username,
        balance: balance
      });
  }

  return (
      <View style={styles.container}>
        <Text style={styles.text}> Login with Email. </Text>
        <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "Email"
             placeholderTextColor = "#009688"
             autoCapitalize = "none"
             onChangeText = {handleEmail}/>

          <TextInput style = {styles.input}
             underlineColorAndroid = "transparent"
             placeholder = "Password"
             placeholderTextColor = "#009688"
             autoCapitalize = "none"
             onChangeText = {handlePassword}/>

          <TouchableOpacity
             style = {styles.submitButton}
             onPress = {
                () => login(email, password)
             }>
             <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
      </View>
    );

}

export default LoginPage;
