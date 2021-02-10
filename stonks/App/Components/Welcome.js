import { StatusBar } from 'expo-status-bar';
import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Buttons from "../Styles/Buttons";



export default function Welcome({route, navigation}) {
  const {name, email, username, balance} = route.params;
  const [curUser, setUsername] = useState(name);
  const [curBalance, setBalance] = useState(balance);
  
  return (
    <View style={styles.container}>
        <Text style={styles.text}> Welcome to Stonks, {curUser} </Text>

        <Text style={styles.text}> You have ${curBalance} in your account. </Text>

        <TouchableOpacity style={Buttons.button}
          onPress={() => navigation.navigate('TabScreen')}
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
