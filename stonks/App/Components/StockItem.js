import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {stockCache, subscribeStockCache}  from "../Lib/StockCache";
import {formatMoney} from '../Lib/Utils';
import { colors } from '../Styles/colors'


export default function StockItem(props) {
  const [currPrice, setCurrPrice] = useState(0);
  const [dailyChange, setDailyChange] = useState('down');


  const navigation = useNavigation();
  const data = props.data;
  const ticker = data.ticker;
  const company = stockCache[ticker].company;

  // Calculate whether stock price has gone up or down since open
  function calculateDailyChange(ticker) {
    if (stockCache.hasOwnProperty(ticker)) {
      // this sets the default to be the very first entry of the agg time window, never changes. 
      // TODO: make it the open value of the past day
      const openVal = stockCache[ticker].results[0].o; 
      if (currPrice > openVal) return 'up';
      else return 'down'; 
    }
    return 'down'; // TODO: or maybe return grey / error??
  }


  // This is only called when there is a change in the data
  function updateStockData(ticker, data) {
    setCurrPrice(data.currPrice);
    setDailyChange(calculateDailyChange(ticker));
  }


  // Get stock data
  useEffect(() => {
    if (stockCache.hasOwnProperty(ticker)) {
      setCurrPrice(stockCache[ticker].currPrice);
      setDailyChange(calculateDailyChange(ticker));
    }

    // Subscribe to stock cache changes for $TICKER.
    let unsubStockCache = subscribeStockCache(updateStockData, ticker);

    if (unsubStockCache !== null) {
      return unsubStockCache;
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('StockDetail', {ticker: ticker})}
      style={styles.item}
    >
      <View>
        <Text style={{color: "white", fontSize: 18}}>{ticker}</Text>
        <Text style={{color: "grey", fontSize: 14}}>{company}</Text>
      </View>
      <View style={styles.qtyAndChange}>
        {data.count && <Text style={{color: "white", marginRight: 8}}>{data.count} ×</Text>}
        <View style={dailyChange=== 'up' ? styles.dailyChangeBoxUp : styles.dailyChangeBoxDown }>
          <Text style={{color: "white", fontWeight: '500'}}>{formatMoney(currPrice)}</Text>
        </View>
      </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '100%',
    borderBottomColor: 'grey',
    borderWidth: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 0.5
  },
  dailyChangeBoxDown: {
    backgroundColor: colors.RED, 
    borderRadius: 5,
    padding: 8,
    alignItems: 'flex-end',
    // width: '90%',
  },
  dailyChangeBoxUp: {
    backgroundColor: colors.GREEN,   
    borderRadius: 5,
    padding: 8,

    alignItems: 'flex-end',
    // width: '90%',
  },
  qtyAndChange: {
    flexDirection: 'row',
    width: '30%',
    // backgroundColor: 'yellow',
    alignItems: "baseline",
    justifyContent: 'flex-end',
  }
});
