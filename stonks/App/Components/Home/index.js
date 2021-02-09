import React, { useEffect, useState } from 'react';
import {Button, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { styles } from './styles';
import Login from "../Login";

function Home( {navigation} ) {
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('Login');
      setShouldShow(true);
    }, 2000);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}> stonks </Text>
        
        {shouldShow ? 
          <Button
            title="Go to Login"
            onPress={() => navigation.navigate('Login')}
          />
          // <Login /> 
        : 
          <ActivityIndicator/> 
      
      }


    </View>
    );
}

export default Home;
