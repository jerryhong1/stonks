import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Buttons from '../Styles/Buttons';


export default function Education({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.head}> Welcome to Stonks Education. </Text>
      
      <TouchableOpacity style={styles.education}
        onPress={() => navigation.navigate('TabScreen')}
      >
        <Text style={styles.title}>What is an investment? </Text>
        <Text style={styles.subtitle}>An investment is an asset bought with the expectation that it will generate some future income or profit. </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.education}
        onPress={() => navigation.navigate('TabScreen')}
      >
        <Text style={styles.title}>What is a stock? </Text>
        <Text style={styles.subtitle}>A stock is a unit of ownership in a company. </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.education}
        onPress={() => navigation.navigate('TabScreen')}
      >
        <Text style={styles.title}>What is the stock market? </Text>
        <Text style={styles.subtitle}>The stock market is where buyers and sellers come together to trade shares in eligible companies. </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        color: 'white',
        fontSize: 26,
        marginBottom: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'left',
    },
    subtitle: {
        color: 'white',
        margin: 20,
        fontSize: 18,
        textAlign: 'left',
    },
    education: {
        width: "90%",
        backgroundColor: '#05ad6d',
        borderRadius: 5,
        margin: 20,
        height: 150,
        overflow: 'scroll',
    }
});
