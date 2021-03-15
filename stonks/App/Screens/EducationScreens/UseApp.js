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

            {/* WOULD BE SUPER COOL IF WE COULD MAKE THIS INTERACTIVE -- IE. SOMEONE CLICKS ON A DIFF PART OF THE PORTFOLIO AND A MODAL POPS UP */}
            <T.B>Understanding a stock</T.B>
            {"\n\n"}
            <View 
                style={styles.item}
            > 
                <View> 
                    <Text style={{color: "white", fontSize: 18}}>AAPL</Text>
                    <Text style={{color: "grey", fontSize: 14}}>Apple</Text>
                </View> 
                <View style={styles.qtyAndChange}>
                    {<Text style={{color: "white", marginRight: 8}}>1 ×</Text>}            
                    <View style={styles.dailyChangeBox}> 
                        <Text style={{color: "white", margin: 3}}> $123.22 </Text>
                    </View> 
                </View>
            </View> 
            {"\n\n"}
            AAPL: The 'ticker' is an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market
            {"\n\n"}
            Apple: The company's full name.
            {"\n\n"}
            Quantity: '1 x' indicates how many shares of the indicated stock you own currently in your portfolio.
            {"\n\n"}
            Price: '$123.22' indicates the current market price of the stock. If the box is red, this indicates that the stock's value has
            gone down since the market opened. If the box is green, this indicates that the stock's value has gone up since the market's open.
            
        
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
    item: {
        width: Dimensions.get('window').width * .7,
        borderColor: 'grey',
        borderWidth: 0.3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10, 
        marginBottom: .5,
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
