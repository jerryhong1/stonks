import React, { useState, setState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore';

import Buttons from '../Styles/Buttons';

export default function LoginPage({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }

  function accountLogin(email, password) {
    // Make sign in persist even after app is closed
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userDoc = firebase.firestore().collection('users').doc(user.uid);

        // Get user data
        return Promise.all([user, userDoc.get()]);
      })
      .then(([user, userSnapshot]) => {
        const userData = userSnapshot.data();

        // Display Portfolio page
        navigation.navigate('TabScreen', {
          name: user.displayName,
          email: user.email,
          username: userData.username,
          balance: userData.balance
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert('Login error:' + errorMessage);
        console.log('Login failed with error', errorCode);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style = {styles.header}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}> Login to stonks </Text>
      </View>
      <View style = {styles.textFields}>
        <TextInput
          style={styles.inputField}
          placeholder='Email'
          keyboardType='email-address'
          placeholderTextColor='grey'
          onChangeText = {handleEmail}
        />
        <TextInput
          style={styles.inputField}
          placeholder='Password (6+ characters)'
          secureTextEntry
          placeholderTextColor='grey'
          onChangeText = {handlePassword}
        />
      </View>

      <TouchableOpacity
        style = {Buttons.button}
        onPress = {
           () => accountLogin(email, password)
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
              alert('Error with password reset email')
            });
          }
        }
      >
        <Text style={Buttons.buttontext}> Reset Password </Text>

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
    alignContent: 'space-between',
    flexDirection: 'column',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
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
