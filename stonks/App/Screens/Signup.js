import React, { useState, useRef} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {tryStockUpdate} from '../Lib/StockUpdater';
import Buttons from '../Styles/Buttons';


export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const inputEl = useRef([null, null, null, null]);

  // index of the text input that is being focused on
  const [focusedInput, setFocusedInput] = useState(0)
  const focusNextTextInput = () => {
    if (inputEl.current[focusedInput + 1]){
      inputEl.current[focusedInput + 1].focus();
    }
    setFocusedInput(focusedInput + 1)
  }

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

  function accountSignup(name, email, username, password){
    const defaultBalance = 1000;

    // Make sign in of new user persist even after app is closed
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      })
      .then((userCredential) => {
        // Account created
        const user = userCredential.user;
        const userDoc = firebase.firestore().collection('users').doc(user.uid);

        // Create doc for user with default data
        return Promise.all([
          userDoc,
          user,
          userDoc.set({
            balance: defaultBalance,
            portfolio: {},
            transactions: [],
            username: username,
            startingBalance: defaultBalance,
          }, {merge: true})
        ]);
      })
      .then(([userDoc, user]) => {
        // Set user's display name
        return Promise.all([
          user,
          user.updateProfile({
            displayName: name
          })
        ]);
      })
      .then((user) => {
        // Display welcome page
        tryStockUpdate();
        navigation.navigate('Welcome', {
          name: name,
          email: email,
          username: username,
          balance: defaultBalance
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
        console.log('Account creation failed with error', errorCode);
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}  behavior='padding'>
      <View style = {styles.header}>
        <Text style={{fontWeight: '600', color: 'white', fontSize: 30, lineHeight: 50}}> Sign up for stonks </Text>
        <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}> Create an account to play with stocks and track your performance.</Text>
      </View>

      <View style = {styles.textFields}>
        <TextInput
          key={0}
          style={styles.inputField}
          onFocus={() => setFocusedInput(0)}
          placeholder='Name'
          placeholderTextColor='grey'
          onChangeText = {handleName}
          returnKeyType = 'next'
          onSubmitEditing={focusNextTextInput}
          ref={el => inputEl.current[0] = el}
        />

        <TextInput
          style={styles.inputField}
          onFocus={() => setFocusedInput(1)}
          placeholder='Email'
          keyboardType='email-address'
          placeholderTextColor='grey'
          onChangeText = {handleEmail}
          returnKeyType = 'next'
          onSubmitEditing={focusNextTextInput}
          ref={el => inputEl.current[1] = el}
        />

        <TextInput
          style={styles.inputField}
          onFocus={() => setFocusedInput(2)}
          placeholder='Username'
          placeholderTextColor='grey'
          onChangeText = {handleUsername}
          returnKeyType = 'next'
          ref={inputEl}
          ref={el => inputEl.current[2] = el}
        />

        <TextInput
          style={styles.inputField}
          placeholder='Password (6+ characters)'
          onFocus={() => setFocusedInput(3)}
          placeholderTextColor='grey'
          secureTextEntry
          onChangeText = {handlePassword}
          returnKeyType = 'done'
          ref={el => inputEl.current[3] = el}
        />
      </View>

      <TouchableOpacity
        style = {Buttons.button}
        onPress = {
           () => accountSignup(name, email, username, password)
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
