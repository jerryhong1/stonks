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
        <Text style={styles.title}> Welcome to Stonks{curUser ? `, ${curUser}` : ""}. </Text>

        <Text style={styles.subtitle}> You have ${curBalance} in your account. </Text>

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
  subtitle: {
      color: 'white',
      margin: 20, 
      fontSize: 18,
  }, 
  title: {
    color: 'white',
    fontSize: 24,
}, 
});
