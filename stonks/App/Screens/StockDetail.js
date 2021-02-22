import React from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const data = [ //this is sample data for the sample chart on details
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 }
];


export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Test Details  </Text>
      <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine 
        width={350} 
        style={{data: { stroke: "#c43a31" }}} 
        theme={VictoryTheme.material} 
        data={data} 
        interpolation="natural"
      />
      </VictoryChart>
      <StatusBar style="auto" />
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
  text: {
    fontSize: 40,
    color: '#fff'
  }
});