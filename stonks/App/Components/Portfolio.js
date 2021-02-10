import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Buttons from "../Styles/Buttons";

export default function Portfolio({navigation}) {
  return (
    <View style={styles.container}>

        {/* graph view */}
        <View style = {styles.graph}> 


        </View>

        {/* Your portfolio statistics */}
        <View style = {styles.urPrtflio}> 
            <Text style = {{color: "white"}} > Your Portfolio </Text> 
            <Text style = {{color: "white"}} > $0.00 </Text> 
        </View>


        {/* Stocks */}
        <View style = {styles.stocks}> 


        </View>

        {/* 3 icons for nav */}
        <View style = {styles.navBar}> 
 
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
    alignContent: "space-between",
    flexDirection: 'column',
    width: Dimensions.get('window').width,
  },
  graph: {
      flex: 2,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  },
  urPrtflio: {
      flex: 1,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
      alignItems: "flex-start",
      flexDirection: "column",
      justifyContent: "center",
  },
  stocks: {
      flex: 4,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,

  },
  navBar: {
      flex: 1,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  }
});
