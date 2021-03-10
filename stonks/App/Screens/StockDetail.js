import React, { useEffect, useState, setState}  from 'react';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import Svg, {Line} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


import Buttons from '../Styles/Buttons';

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//converts milliseconds to date time 
function convertMillisToDay(millis) {
  var date = new Date(millis); 
  var prettyDate = date.toString().slice(4, 10) + " " + formatAMPM(date)
  return prettyDate; //returns string in format [month date time] ie Feb 22 2:00 PM
}

function formatLineChartData(data) {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    var date = convertMillisToDay(data[i].t) + "\n $" + (data[i].vw.toFixed(2)).toString()// t is the Unix Msec timestamp for the start of the aggregate window
    var datapoint = {x: i, y: data[i].vw, label: date}
    chartData.push(datapoint)
  }
  return chartData;
}

function formatCandlestickChartData(data) {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    var timestamp = data[i].t //t is the Unix Msec timestamp for the start of the aggregate window
    var datapoint = {x: new Date(timestamp), open: data[i].o, close: data[i].c, high: data[i].h, low: data[i].l}
    chartData.push(datapoint)
  }
  return chartData;
}

class CustomFlyout extends React.Component {
  render() {
    const {x, y} = this.props;
    return ( //svg height and width are hard coded right now 
      <Svg height="800" width="500" style="overflow: visible"> 
        <Line x1={x} y1="0" x2={x} y2="300" stroke="gray" strokeWidth="1" />
      </Svg>
    );
  }
}

//pull data from firestore and feed to chart
export default function DetailsScreen({route, navigation}) {
  const [lineChartData, setLineChartData] = useState([0,0]);
  const [candlestickChartData, setCandlestickChartData] = useState([0,0,0,0,0]);
  const [stockdesc, setStockDesc] = useState(""); 
  const stockData = route.params.data;
  const buy = "Purchase";
  const sell = "Sell";
  const [chartFormat, setChartFormat] = useState("line"); 
  
  

  // Get stock data for a particular stock from firebase //TODO: Once StockList pulls from firebase, should this still write to firebase?
  useEffect(() => {
    const getStockData = async () => {
      const stock = stockData.ticker; 
      const stockDoc = firebase.firestore().collection('stocks').doc(stock);
      const stockSnapshot = await stockDoc.get();
      const stockDataFirebase = stockSnapshot.data();
      //put stockData into right format
      setLineChartData(formatLineChartData(stockDataFirebase.results));
      setCandlestickChartData(formatCandlestickChartData(stockDataFirebase.results));
      setStockDesc(stockDataFirebase.description);

      //if you want to write some data uncomment below and:
      // change stockdata to the data you want to upload
      // change the below firebase.set command to the correct stock you want to upload data to
      // uncomment here
      // console.log("before upload");
      // const res = await firebase.firestore().collection('stocks').doc(stock).set(stockdata, {merge: true});
      // console.log("success ");
      // to here
    }
    getStockData();
  }, []);

  function createLineGraph() {
      return (
        <VictoryGroup theme={VictoryTheme.material} height={150} domainPadding={{y: [8, 8]}} padding={{ top: 5, bottom: 12 }} containerComponent={<VictoryVoronoiContainer/>}>
          <VictoryLine 
            labelComponent={ <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                             flyoutStyle={{stroke: "none", fill: "black"}} y={60}
                             style={{fill: "white"}}/>}
            labels={({ datum }) => datum.x + datum.label}
            style={{data: { stroke: "red" }}}
            theme={VictoryTheme.material}
            data={lineChartData}
            x="x"
            y="y"
          />
        </VictoryGroup>
      );
  }

  function createCandlestickGraph() {
    return (
      <VictoryCandlestick
        height={150}  
        domainPadding={{y: [8, 8]}} 
        padding={{ top: 5, bottom: 10 }} 
        containerComponent={<VictoryVoronoiContainer/>}
        theme={VictoryTheme.material} 
        candleColors={{ positive: "green", negative: "red" }}
        data={candlestickChartData}
        style={{data: {stroke: "white", strokeWidth: 1}}}
      />

    );
}

  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <Button
          onPress={() => {
            {chartFormat == "line"? setChartFormat("candlestick") : setChartFormat("line")}
            
          }}
          color="#ffffff"
          title={chartFormat == "line"?"Candlestick": "Line"}
        />
      </View>
      <View style={styles.graph}>
        {chartFormat == "line"? createLineGraph() : createCandlestickGraph()}
      </View>

       {/* Middle section */}
       <View style={styles.stockInfo}>

         {/* Stock Info */}
         <View>
            <Text style = {{color: "white", fontSize: 16}} >
              <Text style = {{fontWeight: "bold"}}>{stockData.ticker} </Text>
            • {stockData.company}</Text>
            <Text style = {{color: "white", fontSize: 30, marginTop: 4}} >{'$' + stockData.currPrice}</Text>
         </View>
          {/* Drop down picker */}
          <View style={{width: '28%'}}>
            <DropDownPicker 
              items={[
                  {label: 'Buy', value: 'buy' },
                  {label: 'Sell', value: 'sell' },
              ]}
              placeholder="+ Trade"
              containerStyle={{height: 40, width: '100%'}}
              style={{backgroundColor: '#1EDD4E'}}
              itemStyle={styles.pickerStyle}
              dropDownStyle={{backgroundColor: 'black'}}
              globalTextStyle={{
                color: 'white',
              }}
              onChangeItem={item => {
                navigation.navigate('BuySell', {
                  stockData: stockData,
                  buyOrSell: item.value === 'sell' ? sell : buy,
                })
              }}
              arrowColor='white'
            />
          </View>   

          
          

      </View>

      {/* News and Description  */}
      <View style={styles.stocks}>
          <Text style={{color: "white", fontSize: 16, marginVertical: 8, marginHorizontal: 12}}>Description</Text>
          <Text style={{color: "white", fontSize: 12, marginBottom: 8, marginHorizontal: 12}}>{stockdesc}</Text>
          <Text style={{color: "white", fontSize: 16, marginVertical: 8, marginHorizontal: 12}}>News</Text>
          <Text style={{color: "white", fontSize: 12, marginBottom: 8, marginHorizontal: 12}}>Articles will appear here</Text>
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
    height: '100%'
  },
  button: {
    alignItems: 'flex-end',
    flexDirection: "row-reverse",
    backgroundColor:'#1E6738',
  },
  graph: {
      flex: 2,
      backgroundColor: "black",
      width: "100%",
      borderBottomColor: "white",
      borderWidth: 1,
  },
  stockInfo: {
      flex: 1,
      padding: 12,
      paddingBottom: 0,
      backgroundColor: "black",
      width: "100%",
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      zIndex: 100
  },
  stocks: {
      flex: 4,
      backgroundColor: "black",
      width: "100%",
  },
  buySell: {
    flex: 1,
    flexDirection: "row",
    marginTop: 4,
  },
  // super confusing how all the styles overlap in the picker so please edit lol
  pickerStyle: {
    backgroundColor: 'black',
    justifyContent: 'flex-start'
  }
});

