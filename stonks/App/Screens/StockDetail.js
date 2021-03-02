import React, { useEffect, useState, setState}  from 'react';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip } from 'victory-native';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import Svg, {Line} from 'react-native-svg';

import Buttons from '../Styles/Buttons';

//converts milliseconds to date time
function convertMillisToDay(millis) {
  var date = new Date(millis);
  var prettyDate = date.toString().slice(4, 10) + ' ' + date.toString().slice(16, 21)
  return prettyDate; //returns string in format [month date time] ie Feb 22 12:00
}

function formatChartData(data) {
  var chartData = [];

  for (var i = 0; i < data.length; i++) {
    var date = convertMillisToDay(data[i].t) // t is the Unix Msec timestamp for the start of the aggregate window
    var datapoint = {x: i, y: data[i].vw, label: date}

    chartData.push(datapoint)
  }

  return chartData;
}

class CustomFlyout extends React.Component {
  render() {
    const {x, y} = this.props;
    return ( //svg height and width are hard coded right now
      <Svg height='800' width='500' style='overflow: visible'>
        <Line x1={x} y1='0' x2={x} y2='300' stroke='gray' strokeWidth='1' />
      </Svg>
    );
  }
}

//pull data from firestore and feed to chart
export default function DetailsScreen({route, navigation}) {
  const [stockresults, setStockResults] = useState([0,0]);
  const [stockdesc, setStockDesc] = useState('');
  const stockData = route.params.data;
  const buy = 'Purchase';
  const sell = 'Sell';

  // Get stock data for a particular stock from firebase //TODO: Once StockList pulls from firebase, should this still write to firebase?
  useEffect(() => {
    const getStockData = async () => {
      const stock = stockData.ticker;
      const stockDoc = firebase.firestore().collection('stocks').doc(stock);
      const stockSnapshot = await stockDoc.get();
      const stockDataFirebase = stockSnapshot.data();
      //put stockData into right format
      stockDataFirebase.results = formatChartData(stockDataFirebase.results);
      setStockResults(stockDataFirebase.results);
      setStockDesc(stockDataFirebase.description);

      //if you want to write some data uncomment below and:
      // change stockdata to the data you want to upload
      // change the below firebase.set command to the correct stock you want to upload data to
      // uncomment here
      // console.log('before upload');
      // const res = await firebase.firestore().collection('stocks').doc(stock).set(stockdata, {merge: true});
      // console.log('success ');
      // to here
    }
    getStockData();
  }, []);

  return (
    <View style={styles.container}>
      <View  style={styles.graph}>
        <VictoryGroup theme={VictoryTheme.material} height={150} domainPadding={{y: [8, 8]}} padding={{ top: 5, bottom: 5 }} containerComponent={<VictoryVoronoiContainer/>}>
          <VictoryLine
            labelComponent={ <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                             flyoutStyle={{stroke: 'none',fill: 'none'}} y={60}
                             style={{fill: 'white'}}/>}
            labels={({ datum }) => datum.x + datum.label}
            style={{data: { stroke: 'red' }}}
            theme={VictoryTheme.material}
            data={stockresults}
            x='x'
            y='y'
            interpolation='natural'
          />

        </VictoryGroup>
      </View>

       {/* Info about the stock */}
       <View style={styles.stockInfo}>
          <Text style = {{color: 'white', fontSize: 16}} >
            <Text style = {{fontWeight: 'bold'}}>{stockData.ticker} </Text>
          ({stockData.company}) </Text>
          <Text style = {{color: 'white', fontSize: 30, marginTop: 5}} > {'$' + stockData.currPrice} </Text>
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

      {/* News and Description  */}
      <View style={styles.stocks}>
          <Text style={{color: 'white', fontSize: 16, margin: 8}}>Description</Text>
          <Text style={{color: 'white', fontSize: 12, margin: 8}}>{stockdesc}</Text>
          <Text style={{color: 'white', fontSize: 16, margin: 8}}>News</Text>
          <Text style={{color: 'white', fontSize: 12, margin: 8}}>Articles will appear here</Text>
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
    alignContent: 'space-between',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
  },
  graph: {
    flex: 2,
    backgroundColor: 'black',
    width: '100%',
    borderBottomColor: 'white',
    borderWidth: 1,
  },
  stockInfo: {
    padding: 8,
    flex: 1.5,
    backgroundColor: 'black',
    width: '100%',
    borderBottomColor: 'white',
    borderWidth: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  stocks: {
    flex: 4,
    backgroundColor: 'black',
    width: '100%',
    borderBottomColor: 'white',
    borderWidth: 1,
  },
  buySell: {
    flex: 1,
    flexDirection: 'row'
  }
});

