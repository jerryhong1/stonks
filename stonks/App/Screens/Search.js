import React, { useState, setState} from 'react';
import { StyleSheet, Text, SafeAreaView, View, TextInput, Dimensions, Keyboard} from 'react-native';
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
            onSubmitEditing = { () => {setText(""); Keyboard.dismiss();}}
          />
          
        </View>
      </View>


      <View style = {styles.stockResults}> 
        <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}> 
          <Text style = {styles.suggestedText}>Stock </Text> 
          <Text style = {styles.suggestedText}>Current price </Text> 
        </View>
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: "500",
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
    marginHorizontal: 12,
    marginBottom: 8
  },
  
});
