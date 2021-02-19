import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { styles } from './styles';

import Buttons from '../../Styles/Buttons';


function Login ({navigation} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Learn the stock market at no cost. </Text>

      <TouchableOpacity style={Buttons.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={Buttons.buttontext}> Sign up with email </Text>
      </TouchableOpacity>

      <TouchableOpacity style={Buttons.button}
        onPress={() => navigation.navigate('LoginPage')}>
        <Text style={Buttons.buttontext}> Login </Text>
      </TouchableOpacity>
    </View>
    );
}

export default Login;
