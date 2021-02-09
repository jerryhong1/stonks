import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from "./App/Components/Signup";
import Welcome from "./App/Components/Welcome";
import Home from './src/Home';
import Login from './src/Login'



const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return ( 
    <View style={styles.container}>
      <Text style={styles.text}> Stonks </Text>
      <StatusBar style="auto" />
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')}
      />

      <Button
        title="Go to Welcome"
        onPress={() => navigation.navigate('Welcome')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />


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
