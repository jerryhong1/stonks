import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {stockCache, subscribeStockCache}  from "../Lib/StockCache";
import {formatMoney} from '../Lib/Utils';

export default function StockItem(props) {
  const [currPrice, setCurrPrice] = useState(0);
  const navigation = useNavigation();
  const data = props.data;
  const ticker = data.ticker;
  const company = stockCache[ticker].company;

  function updateStockData(ticker, data) {
    setCurrPrice(data.currPrice);
  }

  // Get stock data
  useEffect(() => {
    if (stockCache.hasOwnProperty(ticker)) {
      setCurrPrice(stockCache[ticker].currPrice);
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
        <View style={styles.dailyChangeBox}>
          <Text style={{color: "white", margin: 3}}> {formatMoney(currPrice)} </Text>
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
  },
  dailyChangeBox: {
    backgroundColor: "red",     // should become a conditional render
    borderRadius: 5,
  },
  qtyAndChange: {
    flexDirection: 'row',
    alignItems: "baseline",
  }
});
