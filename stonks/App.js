import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from './App/Screens/Signup';
import Welcome from './App/Screens/Welcome';
import SplashScreen from './App/Screens/SplashScreen';
import Login from './App/Screens/Login';
import LoginPage from './App/Screens/LoginPage';
import HomeScreen from './App/Screens/HomeScreen';
import StockDetail from './App/Screens/StockDetail';
import BuySellModal from './App/Screens/BuySell';
import Investment from './App/Screens/EducationScreens/Investment';
import Stock from './App/Screens/EducationScreens/Stock';
import Market from './App/Screens/EducationScreens/Market';
import Candlestick from './App/Screens/EducationScreens/Candlestick';
import StartingAmount from './App/Screens/StartingAmount';
import WhyInvest from './App/Screens/EducationScreens/WhyInvest';
import HowTo from './App/Screens/EducationScreens/HowTo';

const MainStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer> 
    <MainStack.Navigator initialRouteName='Splash'>
      <MainStack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }}/>
      <MainStack.Screen name='Welcome' component={Welcome}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Login' component={Login}  options={{ headerShown: false }}/>
      <MainStack.Screen name='Signup' component={Signup} />
      <MainStack.Screen name='LoginPage' component={LoginPage} />
      <MainStack.Screen name='Home' component={HomeScreen}  options={{ headerShown: false, gestureEnabled: false}}/> 
      <MainStack.Screen name='StockDetail' component={StockDetail} />
      <MainStack.Screen name="BuySell" component={BuySellModal} options={{ headerShown: false }} mode="modal"/>
      <MainStack.Screen name="Investment" component={Investment} />
      <MainStack.Screen name="Stock" component={Stock} />
      <MainStack.Screen name="Market" component={Market} />
      <MainStack.Screen name="Candlestick" component={Candlestick} />
      <MainStack.Screen name="StartingAmount" component={StartingAmount}  options={{ headerShown: false }}/>
      <MainStack.Screen name="WhyInvest" component={WhyInvest} />
      <MainStack.Screen name="HowTo" component={HowTo} />
    </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
