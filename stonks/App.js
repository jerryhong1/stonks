
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
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";


const data = [ //this is sample data for the sample chart on details
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 }
];


// function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}> Stonks </Text>
//       <StatusBar style="auto" />
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Test Details  </Text>
      <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine 
        width={350} 
        style={{data: { stroke: "#c43a31" }}} 
        theme={VictoryTheme.material} 
        data={data} 
        interpolation="natural"
      />
      </VictoryChart>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
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
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
  </NavigationContainer>
    
  );
}

export default App;


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
