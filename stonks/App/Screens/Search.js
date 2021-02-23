import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, Keyboard, FlatList} from 'react-native';

import Buttons from "../Styles/Buttons";
import {Ionicons} from '@expo/vector-icons';

// import StockItem from "../Components/StockItem";
import StockList from "../Components/StockList";


export default function Search({navigation}) {

  const [text, setText] = useState("");
  
  return (
    <View style={styles.container}>

      <View style = {styles.search}> 
        <Text style = {styles.headerText}> Search for stocks </Text> 

        <View style = {styles.searchBar}>
          <TextInput 
            style = {styles.textInputField}
            placeholder="ex: GME, Apple"
            placeholderTextColor='grey'
            value = {text}
            onChangeText = { (input) => setText(input)}
          />
          {/* Note: This would be best removed, and the searching should occur in real-time as the user is inputting text */}
          <TouchableOpacity
            onPress = { () => {console.log("Searching!!"); setText(""); Keyboard.dismiss();}}
          >
            <Ionicons name="ios-search-outline" size={35} color="white" />
          </TouchableOpacity> 
        </View>
      </View>


      <View style = {styles.stockResults}> 
        <StockList />
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
  },
  search: {
    flexDirection: 'column',
    height: "20%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: "bold",
  },
  textInputField: {
    width: Dimensions.get('window').width * .7,
    borderRadius: 5,
    margin: 5,
    padding: 5, 
    borderColor: "white",
    borderWidth : 1,
    color: 'white'
  },
  stockResults: {
    height: "80%",
  }
  
});
