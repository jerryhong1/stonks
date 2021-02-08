import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Welcome to Stonks COMPONENT, Lauren </Text>

        <Text style={styles.text}> $1000 </Text>

        <Text style={styles.text}> Get started </Text>

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
      color: 'white',
  }
});
