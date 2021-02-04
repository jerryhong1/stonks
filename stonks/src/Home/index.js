import React, { Component, useEffect, useState } from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import { styles } from './styles';

function Home( {navigation} ) {
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
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
        : null}
    </View>
    );
}

export default Home;
