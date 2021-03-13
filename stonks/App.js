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
import Education from './App/Screens/Education';
import Investment from './App/Screens/EducationScreens/Investment';
import Stock from './App/Screens/EducationScreens/Stock';
import Market from './App/Screens/EducationScreens/Market';
import Candlestick from './App/Screens/EducationScreens/Candlestick';


const MainStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer> 
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name='Welcome' component={Welcome}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Login' component={Login}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Signup' component={Signup} />
      <MainStack.Screen name='LoginPage' component={LoginPage} />
      <MainStack.Screen name='TabScreen' component={TabScreen}  options={{ headerShown: false, gestureEnabled: false}}/> 
      <MainStack.Screen name='StockDetail' component={StockDetail} />
      <MainStack.Screen name="BuySell" component={BuySellModal} options={{ headerShown: false }} mode="modal"/>
      <MainStack.Screen name="Education" component={Education} />
      <MainStack.Screen name="Investment" component={Investment} />
      <MainStack.Screen name="Stock" component={Stock} />
      <MainStack.Screen name="Market" component={Market} />
      <MainStack.Screen name="Candlestick" component={Candlestick} />

    </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
