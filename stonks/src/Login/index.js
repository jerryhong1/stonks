import React, { Component } from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { styles } from './styles';

function Login ({navigation} ) {
  return (
      <View style={styles.container}>
        <Text style={styles.text}> Learn the stock market at no cost. </Text>
        
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttontext}> Sign up with email </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('LoginPage')}>
          <Text style={styles.buttontext}> Login </Text> 
        </TouchableOpacity>
        
      </View>
    );
}

export default Login;
