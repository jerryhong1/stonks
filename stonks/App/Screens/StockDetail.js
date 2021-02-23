import React from 'react';
import { VictoryLine, VictoryGroup, VictoryTheme } from "victory-native";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Buttons from '../Styles/Buttons';

const data = [ //this is sample data for the sample chart on details
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 },
  { x: 5, y: 12000 }
];


export default function DetailsScreen({route, navigation}) {
  const stockData = route.params.data;
  return (
    <View style={styles.container}>
      <View  style={styles.graph}>
        <VictoryGroup theme={VictoryTheme.material} height={200}>
          <VictoryLine 
            style={{data: { stroke: "red" }}} 
            theme={VictoryTheme.material} 
            data={data} 
          />
        </VictoryGroup>
      </View>

       {/* Your portfolio statistics */}
       <View style={styles.urPrtflio}> 
          <Text style = {{color: "white", fontSize: 16}} > 
            <Text style = {{fontWeight: "bold"}}>{stockData.ticker} </Text> 
          ({stockData.company}) </Text> 
          <Text style = {{color: "white", fontSize: 30, marginTop: 5}} > {'$' + stockData.currPrice} </Text> 
          <TouchableOpacity style={Buttons.smallButton}
            onPress={() => navigation.navigate('TabScreen')}
          >
            <Text style={Buttons.buttontext}>Buy/Sell</Text>
          </TouchableOpacity>
      </View>

      {/* Your stocks list */}
      <View style={styles.stocks}>
          <Text style={{color: "white", fontSize: 16, margin: 8}}>News</Text>
      </View>
          
      <StatusBar />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
      padding: 8,
      flex: 1.5,
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

  }
});
