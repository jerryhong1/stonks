import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';

import Buttons from '../Styles/Buttons';


export default function Search({navigation}) {
  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <Image source={require('../../imgs/tempSearch.jpg')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    flexDirection: 'column',
  },
});
