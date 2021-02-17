import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

import {firebaseInit} from '../Lib/Firebase';
import Login from './Login';
import Buttons from '../Styles/Buttons';



export default function HomeScreen({navigation}) {
  const [shouldShow, setShouldShow] = useState(false);

  // Call once only on mount
  useEffect( () => {
    // Initialize app 
    if (firebase.apps.length === 0) {
      firebaseInit();
    }

    // Check if user is already signed in
    firebase.auth().onAuthStateChanged((user) => {
      // Navigate to portfolio if already signed in
      if (user) {
        navigation.navigate('TabScreen');
      } 
      // Show login button once firebase is loaded and auth state is determined
      setShouldShow(true);
    });
    // return authUnsubscribe; // return in useEffect is called when it unmounts
  }, []);
 
  

  return (
    <View style={styles.container}>
        <Text style={styles.text}> stonks </Text>
        <StatusBar style='auto' />
        {
          shouldShow ?
          <Button title='Login or Create Account'
            onPress={() => navigation.navigate('Login')}
          />
          : null
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    color: '#fff'
  }
});
