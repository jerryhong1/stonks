import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Portfolio from './Portfolio';
import Profile from './Profile';
import Search from './Search';
import Education from './Education';


import {Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel:false,
        inactiveBackgroundColor: 'black',
        activeBackgroundColor: '#1EDD4E',
      }}
    >
      <Tab.Screen 
        name='Stocks' 
        component={Portfolio} 
        options={{
          tabBarLabel: 'Stocks',
          tabBarIcon: () => (
            <FontAwesome name='line-chart' size={28} color='white' />
          ),
        }
      }
      />
      <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => (
            <Ionicons name='ios-search-outline' size={28} color='white' />                
          ),
        }}
      />
      <Tab.Screen 
        name='Education' 
        component={Education}
        options={{
          tabBarLabel: 'Edcucation',
          tabBarIcon: () => (
            <FontAwesome name='graduation-cap' size={28} color='white' />                
          ),
        }}
      />
      <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <FontAwesome name='user-circle-o' size={28} color='white' />                
          ),
        }}
      />
    </Tab.Navigator>
  );
}
