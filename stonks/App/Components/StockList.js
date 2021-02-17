import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

import Buttons from "../Styles/Buttons";
import StockItem from "./StockItem";


export default function StockList(props) {

    // TEMP DATA FOR BOTH SCREENS
    const [stockList, setStockList] = useState([
        {ticker: 'GME', company: 'Gamestop', currPrice: '$15.00'},
        {ticker: 'NFLX', company: 'Netflix', currPrice: '$420.00'},
        {ticker: 'MSFT', company: 'Microsoft', currPrice: '$232.00'}
    ]);

    const renderStockItem = ({ index, item }) => {
        return <StockItem data={item}/> 
    };
    
    // DOUBLE CHECK ONCE WE HAVE DATA
    const keyExtractor = (index) => {
        return index.toString();
    };

    return (
        <FlatList
            data={stockList}
            renderItem={renderStockItem}
            keyExtractor={(item, index) => keyExtractor(index)}     // FIX ONCE WE HAVE DATA
        />
    );
}
  
const styles = StyleSheet.create({
    
});