import React, { useEffect, useState, setState}  from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

//import { polygonClient, restClient, websocketClient } from "polygon.io";
//const rest = restClient("VfpjQL3hxlS56WBVpmcslVQ5jCwm7U2m");
//todo: find way to get current stock 
//todo: determine what type of stock chart we want to implement and add it
// simple option is to chart the 5 min average ? another option is to plot the bars 


function formatChartData(data) {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    var datapoint = [i, data[i].vw]
    chartData.push(datapoint)
  }
  return chartData;
}
// const stockdata = {
//   "results": [
//    {
//     "v": 286953,
//     "vw": 352.3604,
//     "o": 356.1,
//     "c": 348,
//     "h": 384.89,
//     "l": 321.75,
//     "t": 1612170000000,
//     "n": 19710
//    },
//    {
//     "v": 113164,
//     "vw": 341.1046,
//     "o": 347,
//     "c": 337,
//     "h": 356.36,
//     "l": 326.05,
//     "t": 1612173600000,
//     "n": 7636
//    },
//    {
//     "v": 88718,
//     "vw": 333.2106,
//     "o": 338,
//     "c": 328.18,
//     "h": 345,
//     "l": 326.06,
//     "t": 1612177200000,
//     "n": 5549
//    },
//    {
//     "v": 921397,
//     "vw": 310.6149,
//     "o": 327.42,
//     "c": 323.35,
//     "h": 331.9,
//     "l": 288.07,
//     "t": 1612180800000,
//     "n": 52694
//    },
//    {
//     "v": 689532,
//     "vw": 321.1131,
//     "o": 327,
//     "c": 317.8,
//     "h": 333,
//     "l": 288.0501,
//     "t": 1612184400000,
//     "n": 34581
//    },
//    {
//     "v": 6272754,
//     "vw": 292.8018,
//     "o": 317.7,
//     "c": 269.9999,
//     "h": 322,
//     "l": 252,
//     "t": 1612188000000,
//     "n": 334885
//    },
//    {
//     "v": 9174759,
//     "vw": 244.8431,
//     "o": 270,
//     "c": 237.39,
//     "h": 284,
//     "l": 212,
//     "t": 1612191600000,
//     "n": 455775
//    },
//    {
//     "v": 4810622,
//     "vw": 261.1653,
//     "o": 236.775,
//     "c": 259.2,
//     "h": 280,
//     "l": 232.9001,
//     "t": 1612195200000,
//     "n": 218367
//    },
//    {
//     "v": 2502651,
//     "vw": 250.6005,
//     "o": 259,
//     "c": 248,
//     "h": 262.5999,
//     "l": 241,
//     "t": 1612198800000,
//     "n": 132114
//    },
//    {
//     "v": 2997396,
//     "vw": 239.729,
//     "o": 248.4599,
//     "c": 250,
//     "h": 253.8899,
//     "l": 230,
//     "t": 1612202400000,
//     "n": 149954
//    },
//    {
//     "v": 2065638,
//     "vw": 243.8154,
//     "o": 250,
//     "c": 240.1828,
//     "h": 251,
//     "l": 235.51,
//     "t": 1612206000000,
//     "n": 103230
//    },
//    {
//     "v": 4599470,
//     "vw": 226.5165,
//     "o": 240.1096,
//     "c": 227,
//     "h": 240.1096,
//     "l": 214.66,
//     "t": 1612209600000,
//     "n": 225052
//    },
//    {
//     "v": 626967,
//     "vw": 218.0621,
//     "o": 225.46,
//     "c": 207.55,
//     "h": 231,
//     "l": 206,
//     "t": 1612213200000,
//     "n": 49889
//    },
//    {
//     "v": 1577886,
//     "vw": 189.1588,
//     "o": 207.96,
//     "c": 178,
//     "h": 208.79,
//     "l": 173,
//     "t": 1612216800000,
//     "n": 87032
//    },
//    {
//     "v": 495863,
//     "vw": 184.5122,
//     "o": 178,
//     "c": 187.75,
//     "h": 190,
//     "l": 177,
//     "t": 1612220400000,
//     "n": 19207
//    },
//    {
//     "v": 398808,
//     "vw": 193.0442,
//     "o": 186.65,
//     "c": 189.52,
//     "h": 198.99,
//     "l": 186.65,
//     "t": 1612224000000,
//     "n": 16040
//    },
//    {
//     "v": 246548,
//     "vw": 170.4731,
//     "o": 175.3,
//     "c": 171,
//     "h": 178.31,
//     "l": 160,
//     "t": 1612256400000,
//     "n": 13145
//    },
//    {
//     "v": 79576,
//     "vw": 173.0084,
//     "o": 171.7,
//     "c": 174.5,
//     "h": 176.39,
//     "l": 170,
//     "t": 1612260000000,
//     "n": 3839
//    },
//    {
//     "v": 179575,
//     "vw": 161.0798,
//     "o": 174.01,
//     "c": 158.49,
//     "h": 175.21,
//     "l": 153.6,
//     "t": 1612263600000,
//     "n": 8645
//    },
//    {
//     "v": 1521962,
//     "vw": 148.955,
//     "o": 158.24,
//     "c": 138.7,
//     "h": 162.65,
//     "l": 137.01,
//     "t": 1612267200000,
//     "n": 52958
//    },
//    {
//     "v": 1956246,
//     "vw": 133.6806,
//     "o": 139,
//     "c": 127.5,
//     "h": 161,
//     "l": 126,
//     "t": 1612270800000,
//     "n": 69188
//    },
//    {
//     "v": 13083953,
//     "vw": 123.1191,
//     "o": 127.5,
//     "c": 115,
//     "h": 162,
//     "l": 101.3,
//     "t": 1612274400000,
//     "n": 485622
//    },
//    {
//     "v": 19988224,
//     "vw": 94.4213,
//     "o": 114.8882,
//     "c": 91.5,
//     "h": 125,
//     "l": 74.2201,
//     "t": 1612278000000,
//     "n": 630894
//    },
//    {
//     "v": 15756996,
//     "vw": 120.3877,
//     "o": 91.0701,
//     "c": 114.85,
//     "h": 154.3999,
//     "l": 90,
//     "t": 1612281600000,
//     "n": 430116
//    },
//    {
//     "v": 7738481,
//     "vw": 116.7337,
//     "o": 110.05,
//     "c": 117.95,
//     "h": 127.98,
//     "l": 105.17,
//     "t": 1612285200000,
//     "n": 223166
//    },
//    {
//     "v": 4486108,
//     "vw": 109.1021,
//     "o": 118.2996,
//     "c": 104.3724,
//     "h": 118.75,
//     "l": 101.01,
//     "t": 1612288800000,
//     "n": 154379
//    },
//    {
//     "v": 6042536,
//     "vw": 100.4233,
//     "o": 103.6001,
//     "c": 99.9,
//     "h": 110.5499,
//     "l": 91,
//     "t": 1612292400000,
//     "n": 200492
//    },
//    {
//     "v": 5582379,
//     "vw": 94.785,
//     "o": 99.8561,
//     "c": 90.47,
//     "h": 101.9599,
//     "l": 88,
//     "t": 1612296000000,
//     "n": 194024
//    },
//    {
//     "v": 843580,
//     "vw": 89.6006,
//     "o": 90.76,
//     "c": 88.78,
//     "h": 93.89,
//     "l": 85.33,
//     "t": 1612299600000,
//     "n": 45068
//    },
//    {
//     "v": 476352,
//     "vw": 91.0172,
//     "o": 88.82,
//     "c": 92,
//     "h": 96,
//     "l": 86.01,
//     "t": 1612303200000,
//     "n": 24725
//    },
//    {
//     "v": 232127,
//     "vw": 91.6718,
//     "o": 92,
//     "c": 90,
//     "h": 94,
//     "l": 88,
//     "t": 1612306800000,
//     "n": 6766
//    },
//    {
//     "v": 288108,
//     "vw": 86.515,
//     "o": 90,
//     "c": 85.2,
//     "h": 90.5,
//     "l": 85,
//     "t": 1612310400000,
//     "n": 10224
//    }
//   ]
//  }
 

 
//pull data from firestore and feed to chart 
export default function DetailsScreen({ navigation }) {
  const [stockCompany, setStockCompany] = useState('');
  const [currPrice, setCurrPrice] = useState('0');
  const [stockresults, setStockResults] = useState([0,0]);

  // Get stock data from firebase
  useEffect(() => {
    const getStockData = async () => {
      const stock = "GME";  // not sure how to determine which stock we are on
      const stockDoc = firebase.firestore().collection('stocks').doc(stock);
      const stockSnapshot = await stockDoc.get();
      const stockData = stockSnapshot.data();
      console.log(stockData);
      setStockCompany(stockData.company);
      setCurrPrice(stockData.currPrice);
      //put stockData into right format 
      stockData.results = formatChartData(stockData.results);
      setStockResults(stockData.results);

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
      <Text style={styles.text}> {stockCompany} </Text>
      <Text style={styles.text}> ${currPrice}  </Text>
      <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine 
        width={350} 
        style={{data: { stroke: "#c43a31" }}} 
        theme={VictoryTheme.material} 
        data={stockresults} 
        x={0}
        y={1}
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