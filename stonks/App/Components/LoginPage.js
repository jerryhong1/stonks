import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import Buttons from "../Styles/Buttons";

export default function LoginPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }
  
  async function login(email, password){
      alert('email: ' + email + ' password: ' + password);
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const testDoc = firebase.firestore().collection('users').doc('test');
        return Promise.all([testDoc.get(), userCredential]);
      })
      .then(([testSnapshot, userCredential]) => {
        let testData = testSnapshot.data();
        var user = userCredential.user;
        let name = user.displayName;
        let username = "foo" // TODO: connect username
        let balance = testData.cash; 
        navigation.navigate('Welcome', {
          name: name, 
          email: email,
          username: username,
          balance: balance
        });
      }) 
      .catch((error) => {
        console.log(error);
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Login error:" + errorMessage);
        console.log("Login failed with error", errorCode);
      });

      // TODO: Add login logic using firebase
      // TODO: Get name, email, username and balance using firebase
     
  }
  
  return (
    <View style={styles.container}>
      <View style = {styles.header}> 
        <Text style={{fontWeight: "bold", color: "white", fontSize: 30}}> Login to stonks </Text>
      </View>
      <View style = {styles.textFields}>
          <TextInput 
            style={styles.inputField} 
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText = {handleEmail}
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
             () => login(email, password)
          }
        > 
          <Text style={Buttons.buttontext}> Login </Text>
        
        </TouchableOpacity>
        <TouchableOpacity
          style = {Buttons.secondary}
          onPress = {
             () => {
              firebase.auth().sendPasswordResetEmail(email).then(function() {
                alert(`Password reset email sent to ${email}.`);
              }).catch(function(error) {
                alert("Error with password reset email")
              });
            }
          }
        > 
          <Text style={Buttons.buttontext}> Reset Password </Text>
        
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
