import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

import { SafeAreaContainer } from "../Styles/container";
import { StonksButton } from "../Styles/Buttons";
import { colors } from '../Styles/colors';
import * as T from '../Styles/text';

import StockList from "../Components/StockList";
import {stockCache, subscribeStockCache}  from "../Lib/StockCache";
import {formatMoney} from '../Lib/Utils';
import { formatLineChartData, TransactionGraph, LineGraph } from "../Components/StockGraph"

function EmptyState({navigation}) {
    return (
    <View style={{marginTop: 24}}>
        <T.H2 style={{textAlign: "center", marginBottom: 16}}>No stocks yet.</T.H2>
        <StonksButton 
            onPress={() => navigation.navigate('Search')}
            text={"Buy Stocks"}
        />
        <StonksButton 
            onPress={() => navigation.navigate('Education')}
            variant={"secondary"}
            text={"Learn more about stocks"}
        />
    </View>
    )
}

export default function Portfolio({navigation}) {
    // total assets = balance (aka "buying power") + calculated from stock
    const [totalAssets, setTotalAssets] = useState(0);
    const [balance, setBalance] = useState(0);
    const [startingBalance, setStartingBalance] = useState(0);
    const [portfolio, setPortfolio] = useState({});
    const [stockList, setStockList] = useState([]);
    const [changeInAssets, setChangeInAssets] = useState(0);
    const [lineChartData, setLineChartData] = useState([0,0]);

    const reloadUserData = async () => {
        try {
            const user = firebase.auth().currentUser;  // Not safe, but fine for now
            const userDoc = firebase.firestore().collection('users').doc(user.uid);
            const userSnapshot = await userDoc.get();
            const userData = userSnapshot.data();
            // console.log("User Data", userData);
            setStartingBalance(userData.startingBalance);
            setBalance(userData.balance);
            setPortfolio(userData.portfolio);
            setLineChartData(formatLineChartData(userData.transactions));

        } catch (error) {
            console.log(error);
        }
    }


    // Get username, balance, and portfolio from firebase
    useEffect(() => {

        // CLEANER WAY of keeping portfolio view real-time after Buy/Sell (instead of on the page / navigation.addListener('focus') )
        // Listener is on the data not the screen, so no weird render / re-loads
        const user = firebase.auth().currentUser;  // Not safe, but fine for now
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        reloadUserData();

        let unsubscribe = userDocRef.onSnapshot(() => {
            reloadUserData();
        });

        // Cleanup
        return () => {unsubscribe();}
    }, []); 

    useEffect(() => {
      // Update the stock list with just stocks that the user owns. TODO: empty state.
      if (portfolio) {
        let newStockList = []; 
        Object.entries(portfolio).forEach(
          ([name, qty]) => {
            if (qty > 0) {
              newStockList.push({ticker: name, count: qty});
            }
          }
        ); 
        //console.log("new stock list", newStockList);
        setStockList(newStockList);
      }
    }, [portfolio])


    // Update the "total assets" based on stocks owned and balance.
    useEffect(() => {
      if (portfolio) {
        let stockAssets = 0;
        Object.entries(portfolio).forEach(
          ([name, qty]) => {
            stockAssets += stockCache[name].currPrice * qty;
          } 
        );
        setTotalAssets(stockAssets + balance);
        setChangeInAssets(stockAssets + balance - startingBalance);
      }
    }, [balance, portfolio])
    
    return (
        <SafeAreaContainer>
            {/* Your portfolio statistics */}
            <View style={styles.urPrtflio}> 
                <T.H4>{`Total Value of Assets`}</T.H4> 
                <T.H1>{formatMoney(totalAssets)} </T.H1> 
                <T.P style = {{color: changeInAssets < 0 ? colors.RED : changeInAssets == 0 ? colors.SUBTLE_TEXT : colors.GREEN}} >
                  {changeInAssets < 0? "↘" : changeInAssets == 0 ? "-" : "↗"} {formatMoney(changeInAssets)} ({(100*(changeInAssets/totalAssets)).toFixed(2)}%) 
                </T.P>
                <T.P style = {{marginTop: 4}} >{formatMoney(balance)} of buying power</T.P>
            </View>
            
            {/* graph view */}
            <View style={styles.graph}> 
                <LineGraph data={lineChartData} renderLabel={({datum}) => datum.x}/>
                {/* <TransactionGraph lineChartData={lineChartData}/> */}
            </View>
            
            {/* Your stocks list TODO: feed in list from docs */}
            <View style={styles.stocks}>
                {stockList.length ? 
                <StockList userStockList={stockList}/>
                : 
                <EmptyState navigation={navigation} />
                }
            </View>
        </SafeAreaContainer>
    );
}

const styles = StyleSheet.create({
  graph: {
      flex: 3,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    margin: 20,
    textAlign: 'left',
  },
  education: {
    width: "90%",
    backgroundColor: '#05ad6d',
    borderRadius: 5,
    margin: 20,
    height: 130,
  },
  urPrtflio: {
      padding: 16,
      flex: 2,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
      alignItems: "flex-start",
      flexDirection: "column",
      justifyContent: "center",
  },
  stocks: {
      flex: 4,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  },
  navBar: {
      flex: 0,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  }
});
