import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList} from 'react-native';

import firebase from 'firebase';

import {stockCache, subscribeStockCache}  from "../Lib/StockCache";
import StockItem from "./StockItem";

// This component currently acts for a general stock list (e.g. in search) and a list of stocks that a user owns.
// The key difference is the latter also includes a quantity of owned stocks.

// NOTE: this also needs to accept a parameter from search that filters 
export default function StockList({userStockList = null, searchText = null}) {
  const [stockList, setStockList] = useState(userStockList);

  const renderStockItem = ({ index, item }) => {
    return <StockItem data={item}/> 
  };
  
  // DOUBLE CHECK ONCE WE HAVE DATA
  const keyExtractor = (index) => {
    return index.toString();
  };

  // Filter by searchtext
  const searchStockList = () => {
    if (searchText) {
      var filtered = stockList.filter(function (stock) {
        return (stock.company.toLowerCase().includes(searchText) | stock.ticker.toLowerCase().includes(searchText));
      });
      return filtered;
    } else {
      return stockList;
    }
  }

  useEffect(() => {
    if (stockList === null) {
      setStockList(Object.keys(stockCache).map((e, i) => ({ticker: e})));
    }
  }, []);

  useEffect(() => {
    setStockList(userStockList);
  }, [userStockList]);

  // Generates a flatlist from all the data passed into it. Eventually, we will do props.data for data
  return (
    <FlatList
      data={searchStockList()}
      renderItem={renderStockItem}
      keyExtractor={(item, index) => keyExtractor(index)}     // FIX ONCE WE HAVE DATA
    />
  );
}
