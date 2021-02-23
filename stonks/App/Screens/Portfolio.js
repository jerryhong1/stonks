import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, FlatList} from 'react-native';
import firebase from 'firebase';

import Buttons from "../Styles/Buttons";
import StockList from "../Components/StockList";
import { fullStockDict } from "../Components/StockList";

export default function Portfolio({navigation}) {
    // total assets = balance (aka "buying power") + calculated from stock
    const [totalAssets, setTotalAssets] = useState(0);
    const [balance, setBalance] = useState(0);
    const [portfolio, setPortfolio] = useState({});
    const stockList = [];
    
    // Get username and balance from firebase
    useEffect(() => {
        const getUserData = async () => {
            const user = firebase.auth().currentUser;  // Not safe, but fine for now
            const userDoc = firebase.firestore().collection('users').doc(user.uid);
            const userSnapshot = await userDoc.get();
            const userData = userSnapshot.data();
            
            console.log("User Data", userData);
            setBalance(userData.balance);
            setPortfolio(userData.portfolio);
        }
        getUserData();

    }, []); 

    useEffect(() => {
        // Update the stock list with just stocks that the user owns. TODO: empty state.
        Object.entries(portfolio).forEach(
            (elt) => { console.log(elt); stockList.push({...fullStockDict[elt[0]], count: elt[1]}); }
        );
    }, [portfolio])


    // Update the "total assets" based on stocks owned and balance.
    useEffect(() => {
        let stockAssets = 0;
        Object.entries(portfolio).forEach(
            (elt) => {
                stockAssets += fullStockDict[elt[0]].currPrice * elt[1];
            } 
        );
        setTotalAssets(stockAssets + balance);
    }, [balance, portfolio])
    
    console.log("Portfolio", portfolio);
    console.log("Stock List", stockList);

    return (
        <View style={styles.container}>

            {/* graph view */}
            <View style={styles.graph}> 
                <Image source={require('../../imgs/stonksGoUp.png')}/>
            </View>

            {/* Your portfolio statistics */}
            <View style={styles.urPrtflio}> 
                <Text style = {{color: "white", fontSize: 16, fontWeight: 'bold'}} >{`Your Portfolio`} </Text> 
                <Text style = {{color: "white", fontSize: 30, marginTop: 5}} >${totalAssets} </Text> 
                <Text style = {{color: "white", fontSize: 16, marginTop: 5}} >${balance} of buying power</Text>
                <Text style = {{color: "green", fontSize: 16, marginTop: 5}} >↗ $50.00 (5%) </Text>
            </View>
            
            {/* Your stocks list TODO: feed in list from docs */}
            <View style={styles.stocks}>
                <StockList userStockList={stockList}/>
            </View>
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
  },
  graph: {
      flex: 2,
      backgroundColor: "black",
      width: "100%", 
      borderBottomColor: "white",
      borderWidth: 1,
  },
  urPrtflio: {
      padding: 16,
      flex: 1.5,
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
