import React, { useEffect, useState, setState}  from 'react';
import { VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";
import { ScrollView, StyleSheet, Text, View, Dimensions, Button, Linking, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { formatMoney } from '../Lib/Utils';
import firebase from 'firebase';
import Svg, {Line} from 'react-native-svg';
import DropDownPicker from 'react-native-dropdown-picker';
import { getArticles } from "./News";

const KEY = "VfpjQL3hxlS56WBVpmcslVQ5jCwm7U2m"
const URL = "https://api.polygon.io/v2/aggs/" //base url for aggs calls 


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
  const [lineChartData, setLineChartData] = useState([0,0]); //ALL available data we have 
  const [candlestickChartData, setCandlestickChartData] = useState([0,0,0,0,0]);  //ALL available data we have
  const [lineChartDataDisplay, setLineChartDataDisplay] = useState([0,0]); //data to be DISPLAYED
  const [candlestickChartDataDisplay, setCandlestickChartDataDisplay] = useState([0,0]); //data to be DISPLAYED
  const [stockdesc, setStockDesc] = useState(""); 
  const stockData = route.params.data;
  const buy = "Purchase";
  const sell = "Sell";
  const [chartFormat, setChartFormat] = useState("line"); 
  const [articles, setArticles] = useState([]);
  const [timeframe, setTimeframe] = useState("1D");

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
      const response = await getArticles(stockData.company);
      setArticles(response.articles);
      setLineChartDataDisplay(lineChartData);
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
      var label = convertMillisToDay(date) + "\n $" + (data[i].vw.toFixed(2)).toString()// t is the Unix Msec timestamp for the start of the aggregate window
      var datapoint = {x: i, y: data[i].vw, label: label, date: date}
      chartData.push(datapoint)
    }
    return chartData;
  }

  function createLineGraph() {
    //setChartDataGranularity(timeframe, "line", lineChartData);
    return (
      <VictoryGroup theme={VictoryTheme.material} height={150} domainPadding={{y: [8, 8]}} padding={{ top: 5, bottom: 12 }} containerComponent={<VictoryVoronoiContainer/>}>
        <VictoryLine 
          labelComponent={ <VictoryTooltip renderInPortal={false} flyoutComponent={<CustomFlyout/>}
                            flyoutStyle={{stroke: "none", fill: "black"}} y={60}
                            style={{fill: "white"}}/>}
          labels={({ datum }) => datum.x + datum.label}
          style={{data: { stroke: "#ff3a3d", strokeWidth: 1.5 }}}
          theme={VictoryTheme.material}
          data={lineChartDataDisplay}
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
      <ScrollView>
        {articleList}
      </ScrollView>
    );
  };

  /* a function to pull data from polygon and upload to firebase 
  note you manually enter utcstart and utc end 
  make sure you are uploading the correct desired granularity
  press upload button to begin upload 
  :D 
  */
  async function uploadData() {
    var utcStart = new Date("2021-03-01"); //manually update this 
    var utcEnd = new Date("2021-03-10"); //manually update this 
    //https://api.polygon.io/v2/aggs/ticker/AAPL/range/5/minute/2020-10-14/2020-10-14?unadjusted=true&sort=asc&limit=5000&apiKey=VfpjQL3hxlS56WBVpmcslVQ5jCwm7U2m
    var fullCall = URL + "ticker/" + stockData.ticker + "/range/30/minute/" + "2021-03-01" + "/" + "2021-03-12" + "?unadjusted=true&sort=asc&limit=5000&apiKey=" + KEY;
    let response = await fetch(fullCall);
    let data = await response.json();
    var toUpload = { 
      results: []
    };
    toUpload.results = data.results;
    console.log('toUpload: ', toUpload);
    console.log('pulled stock');
    await firebase.firestore().collection('stocks').doc(stockData.ticker).set(toUpload, {merge: true});
    console.log("success uploading", stockData.ticker, "data to firestore");
  }

  function displayArticles() {
    //console.log("Articles: ", articles);
    return (
      <View>
        {articles.length > 0 && getArticleList()}
        {articles.length === 0 && <Text style={{color: 'white', margin: 10}}> No top headlines to display for this stock. </Text>}
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
  //console.log("startDate: ", startDate);
  //console.log("endDate: ", endDate);
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
        if (type == "candlestick" && (date.getMinutes() % 10) == 0 ) {
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
      if (date <=  endDate && date >= startDate && date.getUTCHours() == 0) { //gets days in week range 
        filteredChartData.push(data[i]);
      }
    }
  }
  // if (type == "candlestick") {
  //   let result2 = filteredChartData.map(a => a.x.toString());
  //   console.log("filtered dates:");
  //   console.log(result2)
  // }
  if (type == "line") {
    setLineChartDataDisplay(filteredChartData);
  } else if (type == "candlestick") {
    setCandlestickChartDataDisplay(filteredChartData);
  }
}

  /*
  given a granularity, returns the date range needed to display 
  NOTE: because polygon only gives us last day data, when 1D is selected we can only show data from 2 days ago :'(
  */
  function getDateRange(granularity) {
    let res = [];
    var endDate = new Date();
    endDate.setDate(endDate.getDate()-1); 
    endDate.setUTCHours(0,0,0,0);
    var startDate = new Date();
    if (granularity == "1D") {
      startDate.setDate(startDate.getDate()-2); 
    } else if (granularity == "1W") {
      startDate.setDate(startDate.getDate()-8); 
    } else if (granularity == "1M") {
      startDate.setDate(startDate.getDate()-32); // if we have time we can change this to actual # of days in a month 
    }
    startDate.setUTCHours(0,0,0,0);
    res.push(startDate);
    res.push(endDate);
    return res; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <View style={styles.chartTypeButton}> 
          <TouchableOpacity onPress={() => {{chartFormat == "line"? setChartFormat("candlestick") : setChartFormat("line")}}}>
              <Text style={styles.buttonText}>
                {chartFormat == "line"?"Candlestick": "      Line       "}
              </Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{chartFormat == "line"? setChartDataGranularity("1D", "line", lineChartData) : setChartDataGranularity("1D", "candlestick", candlestickChartData)}}}>
              <Text style={styles.buttonText}>1D</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{chartFormat == "line"? setChartDataGranularity("1W", "line", lineChartData) : setChartDataGranularity("1W", "candlestick", candlestickChartData)}}}>
              <Text style={styles.buttonText}>1W</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.timeframeButton}> 
          <TouchableOpacity onPress={() => {{chartFormat == "line"? setChartDataGranularity("1M", "line", lineChartData) : setChartDataGranularity("1M", "candlestick", candlestickChartData)}}}>
              <Text style={styles.buttonText}>1M</Text>
          </TouchableOpacity> 
        </View>
      {/* <Button
        onPress={() => {uploadData()}}
        color="#ffffff"
        title="upload"
      /> */}
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
            <Text style = {{color: "white", fontSize: 30, marginTop: 4}} >{formatMoney(stockData.currPrice)}</Text>
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
          <Text style={{color: "white", fontSize: 18, marginVertical: 8, marginHorizontal: 12}}>Description</Text>
          <Text style={{color: "white", fontSize: 14, marginBottom: 10, marginHorizontal: 12}}>{stockdesc}</Text>
          <Text style={{color: "white", fontSize: 18, marginVertical: 8, marginHorizontal: 12}}>News</Text>
          {displayArticles()}
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
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    flexDirection: "row-reverse",
    width:'100%', 
  },
  graph: {
    flex: 2,
    backgroundColor: "black",
    width: "100%",
    borderBottomColor: "white",
    borderWidth: 1,
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

