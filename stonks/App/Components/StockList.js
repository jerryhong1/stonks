import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList} from 'react-native';

import firebase from 'firebase';

import StockItem from "./StockItem";

// TODO: deprecate this and replace with data from our "stocks" Firestore document: See useEffect below
// It's constructed as a dictionary so that we can easily pull out a subset based on a user's portfolio.
export const fullStockDict = {
  'GME': {ticker: 'GME', company: 'Gamestop', currPrice: 15.00},
  'NFLX': {ticker: 'NFLX', company: 'Netflix', currPrice: 420.00},
  'MSFT': {ticker: 'MSFT', company: 'Microsoft', currPrice: 232.00}
}
const fullStockList = Object.values(fullStockDict)


// This component currently acts for a general stock list (e.g. in search) and a list of stocks that a user owns.
// The key difference is the latter also includes a quantity of owned stocks.

// NOTE: this also needs to accept a parameter from search that filters 
export default function StockList({userStockList = null, searchText = null}) {
  const [fullStockList, setFullStockList] = useState([]);
  // TEMP DATA FOR BOTH SCREENS
  const stockList = userStockList ? userStockList : fullStockList;

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
    let stockList = [];

    firebase.firestore().collection('stocks').get()
    .then((allStocksSnapshot) => {
      allStocksSnapshot.forEach((doc) => {
        const ticker = doc.id;
        const results = doc.data().results;
        const currPrice = doc.data().currPrice;
        stockList.push({
          ticker: ticker,
          company: 'test', // TODO: add this to Firestore
          currPrice: currPrice
        });
        setFullStockList(stockList);
      });
    });
  }, []);

  // Generates a flatlist from all the data passed into it. Eventually, we will do props.data for data
  return (
    <FlatList
      data={searchStockList()}
      renderItem={renderStockItem}
      keyExtractor={(item, index) => keyExtractor(index)}     // FIX ONCE WE HAVE DATA
    />
  );
}
