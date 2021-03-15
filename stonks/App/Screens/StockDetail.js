import React, { useEffect, useState, setState}  from 'react';
import { VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";
import { ScrollView, StyleSheet, Text, View, Dimensions, Button, Linking, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { formatMoney } from '../Lib/Utils';
import firebase from 'firebase';
import Svg, {Line} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import { getArticles } from "./News";
import { colors } from '../Styles/colors'
import { LineGraph } from "../Components/StockGraph"
import {stockCache, subscribeStockCache}  from "../Lib/StockCache";

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

function formatCandlestickChartData(data) {
  var chartData = [];
  for (var i = 0; i < data.length; i++) {
    var timestamp = data[i].t //t is the Unix Msec timestamp for the start of the aggregate window
    var datapoint = {x: new Date(timestamp), open: data[i].o, close: data[i].c, high: data[i].h, low: data[i].l}
    chartData.push(datapoint)
  }
  return chartData;
}

//pull data from firestore and feed to chart
export default function DetailsScreen({route, navigation}) {
  const [lineChartData, setLineChartData] = useState([0,0]); //ALL available data we have 
  const [stockdesc, setStockDesc] = useState("No description.");
  const [currPrice, setCurrPrice] = useState(0);
  const ticker = route.params.ticker;
  const company = stockCache[ticker].company;
  const buy = "Purchase";
  const sell = "Sell";
  const [articles, setArticles] = useState([]);
  const [timeframe, setTimeframe] = useState("1D");

  function updateStockData(ticker, data) {
    setCurrPrice(data.currPrice);
    setLineChartData(formatLineChartData(data.results));
    if (data.hasOwnProperty('description')) {
      setStockDesc(data.description);
    }
  }

  // Get stock data for a particular stock from firebase
  useEffect(() => {
    if (stockCache.hasOwnProperty(ticker)) {
      updateStockData(ticker, stockCache[ticker]);
    }

    const getArticleData = async () => {
      const response = await getArticles(company, ticker);
      setArticles(response);
    }
    getArticleData();

    // Subscribe to stock cache changes for $TICKER.
    let unsubStockCache = subscribeStockCache(updateStockData, ticker);

    if (unsubStockCache !== null) {
      return unsubStockCache;
    }
  }, []);

  /*
  formats the data from firebase into a readable format by chart: 
  x: int 
  y: volumne weighted price for interval 
  label: Month day time AM/PM \n price. example: Feb 26 1:00PM \n $34.44
  date: msec timestamp -> this is used to sort data when timeframe is specified  
  */
  function formatLineChartData(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      var date = new Date((data[i].t));
      var labeldate = new Date((data[i].t));
      labeldate.setDate(labeldate.getDate()+7); 
      var label = convertMillisToDay(labeldate) + "\n $" + (data[i].vw.toFixed(2)).toString()// t is the Unix Msec timestamp for the start of the aggregate window
      var datapoint = {x: i, y: data[i].vw, label: label, date: date}
      chartData.push(datapoint)
    }
    return chartData;
  }

  function createCandlestickGraph() {
    return (
      <VictoryCandlestick
        height={150}  
        domainPadding={{y: [8, 8]}} 
        padding={{ top: 5, bottom: 10 }} 
        containerComponent={<VictoryVoronoiContainer/>}
        theme={VictoryTheme.material} 
        candleColors={{ positive: "#05ad6d", negative: "#ff3a3d" }}
        data={candlestickChartDataDisplay}
        style={{data: {stroke: "white", strokeWidth: 0}}}
        wickStrokeWidth={.6}
      />

    );
  }

  function getArticleList(){
    const articleList = [];

    for (let i = 0; i < articles.length; i++) {
      let link = articles[i].url;
      let sourceName = articles[i].source.name;
      articleList[i] = (
        <View key={i} style={styles.articles}>
          <View style={{flex: '1'}}> 
            <Text style={styles.articleTitle}>
              {articles[i].title}
            </Text>
            <Text style={styles.articleText}>
              {articles[i].description}
            </Text>
            <Text style={{color: '#0645AD'}} onPress={() => Linking.openURL(link)}>
              {sourceName}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        {articleList}
      </View>
    );
  };

  class CustomFlyout extends React.Component {
      render() {
          const {x, y} = this.props;
          return ( //svg height and width are hard coded right now 
          <Svg height="800" width="500" style="overflow: visible"> 
              <Line x1={x} y1="30" x2={x} y2="300" stroke="gray" strokeWidth="1" />
          </Svg>
          );
      }
  }

  function createLineGraph(data) {
    return (
      <VictoryGroup theme={VictoryTheme.material} height={150} domainPadding={{y: [0, 50]}} padding={{ top: 0, bottom: 0 }} containerComponent={<VictoryVoronoiContainer/>}>
        <VictoryLine 
          labelComponent={ <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                            flyoutStyle={{stroke: "none", fill: "black"}} y={45}
                            style={{fill: "white", fontSize: 11, fontFamily: "Helvetica Neue"}}/>}
          labels={({ datum }) => datum.x + datum.label}
          style={{data: { stroke: "#ff3a3d", strokeWidth: 1.5 } }}
          theme={VictoryTheme.material}
          data={data}
          x="x"
          y="y"
        />
      </VictoryGroup>
    );
  }

  function displayArticles() {
    return (
      <View style={{marginBottom: 20}}>
        {articles && articles.length > 0 && getArticleList()}
        {(!articles || articles.length === 0) && <Text style={{color: 'white', margin: 10}}> No top headlines to display for this stock. </Text>}
      </View>
    );
  }

  /*  Stock timeframe granularities for line chart 
      1D -> displays data in 5 min increments 
      1W -> displays data in 1 hour increments 
      1M -> displays data in 1 hour increments  

      Stock timeframe granularities for candlestick chart 
      1D -> displays data in 10 min increments 
      1W -> displays data in 1 hour increments 
      1M -> displays data in 1 hour increments  
  */
 function setChartDataGranularity(granularity, type, data) {
  let dateRange = getDateRange(granularity);
  var startDate = dateRange[0]; 
  var endDate = dateRange[1];
  var filteredChartData = [];
  for (var i = 0; i < data.length; i++) {
    let date;
    if (type == "line") {
      date = data[i].date;
    } else if (type == "candlestick") {
      date = data[i].x;
    }
    if (granularity == "1D") { // no need to remove timestamps since we get 5 min data anyways 
      if (date <=  endDate && date >= startDate ) {
        if (type == "candlestick" && (date.getMinutes() % 30) == 0 ) {
          filteredChartData.push(data[i]);
        } else if (type == "line") {
          filteredChartData.push(data[i]);
        }
      }
    } else if (granularity == "1W") {
      if (date <=  endDate && date >= startDate && date.getMinutes() == 0 ) { //gets days in week range 
        filteredChartData.push(data[i]);
      }
    } else if (granularity == "1M") {
      if (date <=  endDate && date >= startDate && date.getMinutes() == 0 && date.getHours() % 3 == 0 ) { //gets days in week range 
        filteredChartData.push(data[i]);
      }
    }
  }
  return filteredChartData;
}

  /*
  given a granularity, returns the date range needed to display 
  NOTE: because polygon only gives us last day data, when 1D is selected we can only show data from 2 days ago :'(
  */
  function getDateRange(granularity) {
    let res = [];
    var endDate = new Date();
    endDate.setDate(endDate.getDate()-7); 
    endDate.setUTCHours(0,0,0,0);
    var startDate = new Date();
    if (granularity == "1D") {
      startDate.setDate(startDate.getDate()-8); 
    } else if (granularity == "1W") {
      startDate.setDate(startDate.getDate()-14); 
    } else if (granularity == "1M") {
      startDate.setDate(startDate.getDate()-39); // if we have time we can change this to actual # of days in a month 
    }
    startDate.setUTCHours(0,0,0,0);
    res.push(startDate);
    res.push(endDate);
    return res; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
       <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{setTimeframe("1D")}}}>
              <Text style={styles.buttonText}>1D</Text>
          </TouchableOpacity> 
        </View>

        <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{setTimeframe("1W")}}}>
              <Text style={styles.buttonText}>1W</Text>
          </TouchableOpacity> 
        </View>

        <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{setTimeframe("1M")}}}>
              <Text style={styles.buttonText}>1M</Text>
          </TouchableOpacity> 
        </View>

      </View>
      <View style={styles.graph}>
        {/* <LineGraph
          data={setChartDataGranularity(timeframe, "line", lineChartData)} 
          renderData={({ datum }) => datum.x + datum.label}
        />  */}
        {createLineGraph(setChartDataGranularity(timeframe, "line", lineChartData))}
      </View>

       {/* Middle section */}
       <View style={styles.stockInfo}>

         {/* Stock Info */}
         <View>
            <Text style = {{color: "white", fontSize: 16}} >
              <Text style = {{fontWeight: "bold"}}>{ticker} </Text>
            • {company}</Text>
            <Text style = {{color: "white", fontSize: 30, marginTop: 4}} >{formatMoney(currPrice)}</Text>
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
              style={{backgroundColor: '#05ad6d'}}
              itemStyle={styles.pickerStyle}
              dropDownStyle={{backgroundColor: 'black'}}
              globalTextStyle={{
                color: 'white',
              }}
              onChangeItem={item => {
                navigation.navigate('BuySell', {
                  ticker: ticker,
                  company: company,
                  buyOrSell: item.value === 'sell' ? sell : buy,
                })
              }}
              arrowColor='white'
            />
          </View>   
      </View>

      {/* News and Description  */}
      <ScrollView style={styles.stocks}>
          <Text style={{color: "white", fontSize: 18, marginVertical: 8, marginHorizontal: 12}}>Description</Text>
          <Text style={{color: "white", fontSize: 14, marginBottom: 10, marginHorizontal: 12}}>{stockdesc}</Text>
          <Text style={{color: "white", fontSize: 18, marginVertical: 8, marginHorizontal: 12}}>News</Text>
          {displayArticles()}
      </ScrollView>

      
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
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: "row-reverse",
    width:'100%', 
  },
  graph: {
    flex: 0.5,
    backgroundColor: "black",
    width: "100%",
    borderBottomColor: "white",
    borderWidth: .5,
  },
  articles: {
    width: '100%',
    borderTopColor: 'white',
    borderBottomColor: 'white',
    borderWidth: 0.3,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  articleTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleText: {
    color: 'grey',
    marginVertical: 5,
  },
  stockInfo: {
    flex: 0.25,
    padding: 12,
    paddingBottom: 0,
    backgroundColor: "black",
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 100,
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
  },
  chartTypeButton: {
    //backgroundColor: '#48494a',
    padding: 8,
  },
  timeframeButton: {
    //backgroundColor: '#48494a',
    padding: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 13
  }
});
