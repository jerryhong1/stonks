import React, { setState, useState } from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { styles } from './styles';

function Profile ({route, navigation} ) {
  const {username, balance} = route.params;
  const [curUser, setUsername] = useState(username);
  const [curBalance, setBalance] = useState(balance);
  
  return (
      <View style={styles.container}>
        <Text style={styles.text}> 
          Welcome, {curUser}. {"\n"}
          Your balance is ${curBalance}.
        </Text>
      </View>
    );
}

export default Profile;
