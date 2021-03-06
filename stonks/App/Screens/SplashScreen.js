import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import firebase from 'firebase';

import {firebaseInit} from '../Lib/Firebase';
import {stockUpdater} from '../Lib/StockUpdater';
import {initStockCache} from '../Lib/StockCache';

export default function SplashScreen({navigation}) {
  const [shouldShow, setShouldShow] = useState(false);

  // Call once only on mount
  useEffect(() => {
    // Initialize app
    if (firebase.apps.length === 0) {
      firebaseInit();
    }

    // Setup stock cache, then display login/home page once cache is loaded
    const unsubStockCache = initStockCache(() => {
      // Check if user is already signed in
      const authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        // Don't need to keep calling this every time auth state changes,
        // unsubscribe after first call.
        authUnsubscribe();

        // Navigate to portfolio if already signed in
        if (user) {
          navigation.navigate('Home');
        } else {
          setShouldShow(true);
        }
      });
    });

    // Update stock data once per minute
    const unsubUpdater = stockUpdater();
    const unsub = () => {
      unsubUpdater();
      unsubStockCache();
    };
    return unsub;
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
