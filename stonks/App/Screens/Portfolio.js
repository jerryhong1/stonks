import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList} from 'react-native';
import firebase from 'firebase';

import Buttons from "../Styles/Buttons";
import StockList, { fullStockDict }  from "../Components/StockList";


function EmptyState({navigation}) {
    return (
    <>
        <Text style={{textAlign: "center", color: "white", fontSize: 20, marginTop: 24, marginBottom: 8}}>No stocks yet.</Text>
        <TouchableOpacity style={Buttons.smallButton}
            onPress={() => navigation.navigate('Search')}
        >
            <Text style={Buttons.buttontext}>Browse stocks</Text>
        </TouchableOpacity>
    </>
    )
}

export default function Portfolio({navigation}) {
    // total assets = balance (aka "buying power") + calculated from stock
    const [totalAssets, setTotalAssets] = useState(0);
    const [balance, setBalance] = useState(0);
    const [portfolio, setPortfolio] = useState({});
    const [stockList, setStockList] = useState([]);
    
    
    // Get username, balance, and portfolio from firebase
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

        // Makes the Portfolio view update the data when you navigate back after you buy and sell a stock
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData();
            console.log("REFOCUSED Portfolio s creen");
        });

        // cleanup on unmount
        return unsubscribe;

    }, []); 

    useEffect(() => {
      // Update the stock list with just stocks that the user owns. TODO: empty state.
      if (portfolio) {
        let newStockList = []; 
        Object.entries(portfolio).forEach(
          ([name, qty]) => {
            if (qty > 0) {
              newStockList.push({...fullStockDict[name], count: qty});
            }
          }
        ); 
        console.log("new stock list", newStockList);
        setStockList(newStockList);
      }
    }, [portfolio])


    // Update the "total assets" based on stocks owned and balance.
    useEffect(() => {
      if (portfolio) {
        console.log("DID WE ENTER BALANCE STATE CHANGE??");
        let stockAssets = 0;
        Object.entries(portfolio).forEach(
          ([name, qty]) => {
            stockAssets += fullStockDict[name].currPrice * qty;
          } 
        );
        setTotalAssets(stockAssets + balance);
      }
    }, [balance, portfolio])
    
    // console.log("Portfolio", portfolio);
    // console.log("Stock List for rendering list!!", stockList);

    return (
        <SafeAreaView style={styles.container}>

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
                {stockList.length ? 
                <StockList userStockList={stockList}/>
                : 
                <EmptyState navigation={navigation} />
                }
            </View>
        </SafeAreaView>
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
