import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from './App/Components/Signup';
import Welcome from './App/Components/Welcome';
import HomeScreen from './App/Components/HomeScreen';
import Login from './App/Components/Login';
import Portfolio from './App/Components/Portfolio';
import LoginPage from './App/Components/LoginPage';
import TabScreen from './App/Components/TabScreen';
import StockDetail from './App/Components/StockDetail';

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
