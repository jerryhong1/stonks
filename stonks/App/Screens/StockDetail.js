import React, { useEffect, useState, setState}  from 'react';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryTheme } from "victory-native";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

import Buttons from '../Styles/Buttons';


function formatChartData(data) {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    var datapoint = [i, data[i].vw]
    chartData.push(datapoint)
  }
  return chartData;
}

//pull data from firestore and feed to chart
export default function DetailsScreen({route, navigation}) {
  const [stockresults, setStockResults] = useState([0,0]);
  const stockData = route.params.data;
  const buy = "Purchase";
  const sell = "Sell";

  // Get stock data from firebase
  useEffect(() => {
    const getStockData = async () => {
      const stock = "GME";  // not sure how to determine which stock we are on
      const stockDoc = firebase.firestore().collection('stocks').doc(stock);
      const stockSnapshot = await stockDoc.get();
      const stockDataFirebase = stockSnapshot.data();
      console.log(stockDataFirebase);
      //put stockData into right format
      stockDataFirebase.results = formatChartData(stockDataFirebase.results);
      setStockResults(stockDataFirebase.results);

      //if you want to write some data uncomment below and:
      // change stockdata to the data you want to upload
      // change the below firebase.set command to the correct stock you want to upload data to
      // uncomment here
      // console.log("before upload");
      // const res = await firebase.firestore().collection('stocks').doc(stock).set(stockdata);
      // console.log("success ");
      // to here
    }
    getStockData();
  }, []);

  return (
    <View style={styles.container}>
      <View  style={styles.graph}>
        <VictoryGroup theme={VictoryTheme.material} height={200}>
          <VictoryLine
            style={{data: { stroke: "red" }}}
            theme={VictoryTheme.material}
            data={stockresults}
            x={0}
            y={1}
            interpolation="natural"
          />
        </VictoryGroup>
      </View>

       {/* Info about the stock */}
       <View style={styles.stockInfo}>
          <Text style = {{color: "white", fontSize: 16}} >
            <Text style = {{fontWeight: "bold"}}>{stockData.ticker} </Text>
          ({stockData.company}) </Text>
          <Text style = {{color: "white", fontSize: 30, marginTop: 5}} > {'$' + stockData.currPrice} </Text>
          <View style={styles.buySell}>
            <View>
              <TouchableOpacity style={Buttons.smallButton}
                onPress={() => navigation.navigate('BuySell', {
                  stockData: stockData,
                  buyOrSell: buy,
                })}
              >
                <Text style={Buttons.buttontext}>Buy</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={Buttons.smallButton}
                onPress={() => navigation.navigate('BuySell', {
                  stockData: stockData,
                  buyOrSell: sell,
                })}
              >
                <Text style={Buttons.buttontext}>Sell</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>

      {/* News */}
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
  stockInfo: {
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

  },
  buySell: {
    flex: 1,
    flexDirection: "row"
  }
});

