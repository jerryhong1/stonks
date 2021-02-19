import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Portfolio from './Portfolio';
import Profile from './Profile';
import Search from './Search';


const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel:false,
        inactiveBackgroundColor: 'black',
        activeBackgroundColor: '#009688',
      }}
    >
      <Tab.Screen
        name='Stocks'
        component={Portfolio}
        options={{
          tabBarLabel: 'Stocks',
          tabBarIcon: () => (
            <Image source={require('../../imgs/stock.png')}/>
          ),
        }}
      />
      <Tab.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <Image source={require('../../imgs/search.png')}/>
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <Image source={require('../../imgs/profile.png')}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
