import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from "./App/Components/Signup";
import Welcome from "./App/Components/Welcome";
import HomeScreen from "./App/Components/HomeScreen";
import Login from "./App/Components/Login";
import Portfolio from "./App/Components/Portfolio";  
import LoginPage from "./App/Components/LoginPage";
import TabScreen from "./App/Components/TabScreen";

const Stack = createStackNavigator();

export default function App() {
  firebaseTest();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Portfolio" component={Portfolio} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="TabScreen" component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
