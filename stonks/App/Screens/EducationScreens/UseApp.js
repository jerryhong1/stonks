import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import EducationPage from "./Template"
import * as T from "../../Styles/text"
import {StockItem} from "../../Components/StockItem"; 

export default function UseApp() {
  return (
    <EducationPage
    title={"How do I use this app?"}
    subtitle={"We give you the money. You decide the stocks, the quantity to buy or sell, and the timing."}
    pageName={'UseApp'}
    > 
        <Text style={styles.text}> 
            {/* TODO: FILL THESE OUT.{"\n\n"} */}
            <T.B>Find a Stock</T.B>
            {"\n\n"}
            The first step to growing your portfolio is to identify stocks you want to invest in. 
            Click on the search tab to see a list of suggested stocks, or search for a stock you want to buy.
            {"\n\n"}
            *NOTE: Our app currently only supports the top 20 stocks on the S&P 500.  
            {"\n\n"}

            <T.B>Buying and Selling Stocks</T.B>
            {"\n\n"}
            After you've identified a stock you want to trade, click on it. Select `Trade` and click `Buy` (or `Sell`).
            You can preview the estimated cost/sale based on the number of shares you intend to trade. 
            
            {"\n\n"}

            <T.B>Transaction History</T.B>
            {"\n\n"}
            Congratulations! You just made a trade (aka, you either bought or sold a stock). Click on the bottom `Profile`
            tab, and click `Transaction History` to see a log of all trades made, and the stock price at which they were executed.
            {"\n\n"}

            <T.B>Viewing Portfolio</T.B>
            {"\n\n"}
            Your Portfolio contains the list of stocks you own at any given point. View it from the home page. 
            {"\n\n"}
        
        </Text>
    </EducationPage>
  );
}

const styles = StyleSheet.create({  
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 20,
        marginBottom: 50
    },
});
