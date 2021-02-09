import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Buttons from "../Styles/Buttons";



export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Welcome to Stonks, Lauren </Text>

        <Text style={styles.text}> You have $1000 in your account. </Text>

        <TouchableOpacity style={Buttons.button}
          // onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={Buttons.buttontext}> Get Started </Text> 
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
  },
  text: {
      color: 'white',
      margin: 10, 
      fontSize: 24,
  }, 
});
