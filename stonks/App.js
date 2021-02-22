import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from './App/Screens/Signup';
import Welcome from './App/Screens/Welcome';
import HomeScreen from './App/Screens/HomeScreen';
import Login from './App/Screens/Login';
import Portfolio from './App/Screens/Portfolio';  
import LoginPage from './App/Screens/LoginPage';
import TabScreen from './App/Screens/TabScreen';
import StockDetail from './App/Screens/StockDetail';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Portfolio' component={Portfolio} />
        <Stack.Screen name='LoginPage' component={LoginPage} />
        <Stack.Screen name='TabScreen' component={TabScreen} />
        <Stack.Screen name='StockDetail' component={StockDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
