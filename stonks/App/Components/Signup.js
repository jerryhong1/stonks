import React, { useState, setState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

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
      alert('name: ' + name + 'email: ' + email + 'username: ' + username + ' password: ' + password);
      // TODO: Get username and balance using firebase
      let balance = 1000;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in     
          const user = userCredential.user;
          const userDoc = firebase.firestore().collection('users').doc(user.uid);
          return Promise.all([userDoc, user, userDoc.set({cash: 1000, username: username}, {merge: true})]);
        })
        .then(([userDoc, user]) => {
          console.log("User Info", user);
          console.log("User Doc", userDoc);
          return Promise.all([userDoc.get(), user, user.updateProfile({
            displayName: name
          })]);
        })
        .then(([userSnapshot, user]) => {
          let userData = userSnapshot.data();
          console.log(user, user.displayName);
          navigation.navigate('Welcome', {
            name: user.displayName, 
            email: user.email, 
            username: userData.username,
            balance: userData.cash
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          console.log("Account creation failed with error", error.code);
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
