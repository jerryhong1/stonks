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
import BuySellModal from './App/Screens/BuySell';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

function MainStackApp() {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name='Welcome' component={Welcome}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Login' component={Login}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Signup' component={Signup} />
      <MainStack.Screen name='LoginPage' component={LoginPage} />
      <MainStack.Screen name='TabScreen' component={TabScreen}  options={{ headerShown: false, gestureEnabled: false}}/> 
      <MainStack.Screen name='Portfolio' component={Portfolio} />
      <MainStack.Screen name='StockDetail' component={StockDetail} />
    </MainStack.Navigator>
  );
}



function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Main"
          component={MainStackApp}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="BuySell" component={BuySellModal} options={{ headerShown: false }} mode="modal"/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
