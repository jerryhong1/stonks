import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

import {firebaseInit} from '../Lib/Firebase';
import Login from './Login';
import Buttons from '../Styles/Buttons';

// Update stock data on Firestore
function stockUpdate() {
  const globalStocksDoc = firebase.firestore().collection('global').doc('stocks');

  try {
    // Contend for right to pull data from polygon. Whoever succeeds in
    // committing a successful transaction to Firestore first wins.
    firebase.firestore().runTransaction(async (t) => {
      const doc = await t.get(globalStocksDoc);
      const polygonDelegate = doc.get('delegate'); // Debug: can remove this
      const remoteTimestamp = doc.get('update_timestamp');
      const localTimestamp = Math.floor(Date.now() / 60000);

      // Debug: can remove this
      console.log(`UID = "${polygonDelegate}"; LOCAL = ${localTimestamp}; REMOTE = ${remoteTimestamp}`);

      // Update timestamp if no other user has already updated it
      if (remoteTimestamp < localTimestamp) {
        t.update(globalStocksDoc, {
          delegate: firebase.auth().currentUser.uid,
          update_timestamp: localTimestamp
        });
      } else {
        // Fail if another user updated the timestamp before us
        throw 'too slow!';
      }
    }).then(() => {
      console.log('Transaction success!');
      // TODO: make polygon API call here
    }).catch((error) => {
      console.log(error);
    });
  } catch (e) {
    console.log(`Transaction failure: ${e}`);
  }
}

export default function HomeScreen({navigation}) {
  const [shouldShow, setShouldShow] = useState(false);

  // Call once only on mount
  useEffect(() => {
    // Initialize app
    if (firebase.apps.length === 0) {
      firebaseInit();
    }

    // Check if user is already signed in
    const authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // Don't need to keep calling this every time auth state changes,
      // unsubscribe after first call.
      authUnsubscribe();

      // Navigate to portfolio if already signed in
      if (user) {
        navigation.navigate('TabScreen');
      } else {
        setShouldShow(true);
      }
    });

    // Update stock data once per minute
    const updateInterval = 10000; // 1 minute
    stockUpdate();
    let type = 'timeout';
    let interval = 0;

    const timeout = setTimeout(() => {
      type = 'interval';

      interval = setInterval(() => {
        stockUpdate();
      }, updateInterval);

      stockUpdate();
    }, updateInterval - (Date.now() % updateInterval));

    return () => {
      if (type === 'timeout') {
        clearTimeout(timeout);
      } else if (type === 'interval') {
        clearInterval(interval);
      } else {
        console.error('uh oh');
      }
    }
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
