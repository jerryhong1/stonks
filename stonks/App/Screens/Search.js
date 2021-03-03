import React, { useState, setState} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Dimensions, TouchableOpacity, Image, Keyboard, FlatList} from 'react-native';

import Buttons from "../Styles/Buttons";
import {Ionicons} from '@expo/vector-icons';

// import StockItem from "../Components/StockItem";
import StockList from "../Components/StockList";


export default function Search({navigation}) {

  const [text, setText] = useState("");
  
  return (
    <SafeAreaView style={styles.container}>

      <View style = {styles.search}> 
        <Text style = {styles.headerText}> Search for stocks </Text> 

        <View style = {styles.searchBar}>
          <TextInput 
            style = {styles.textInputField}
            placeholder="ex: GME, Apple"
            placeholderTextColor='grey'
            value = {text}
            onChangeText = { (input) => setText(input)}
            onSubmitEditing = { () => {console.log("Searching!!"); setText(""); Keyboard.dismiss();}}
          />
          
        </View>
      </View>


      <View style = {styles.stockResults}> 
        <Text style = {styles.suggestedText}> Suggested </Text> 
        <StockList searchText={text.toLowerCase()}/>
      </View>

    </SafeAreaView>
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
    fontWeight: "600",
    marginBottom: 8
  },
  textInputField: {
    width: Dimensions.get('window').width - 24,
    borderRadius: 5,
    margin: 4,
    padding: 8, 
    borderColor: "white",
    borderWidth : 1,
    color: 'white'
  },
  stockResults: {
    height: "80%",
  },
  suggestedText: {
    color: 'grey',
    fontSize: 18,
    marginLeft: 12,
    marginBottom: 8
  }
  
});
