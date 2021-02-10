import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';

import Login from "./Login";

import Buttons from "../Styles/Buttons";



export default function HomeScreen({navigation}) {

    // const [shouldShow, setShouldShow] = useState(false);
  
    // useEffect(() => {
    //     setTimeout(() => {
    //     setShouldShow(true);
    //     }, 2000);
    // });

  return (
    <View style={styles.container}>
        <Text style={styles.text}> stonks </Text>
        <StatusBar style="auto" />

        {/* {shouldShow ? 
            <Button
            title="Go to Login"
            onPress={() => navigation.navigate('Login')}
            />
            // <Login /> 
        : 
            <ActivityIndicator/> 
        } */}

        <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        />

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



