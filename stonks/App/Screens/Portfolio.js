import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Image, FlatList} from 'react-native';
import firebase from 'firebase';

import { SafeAreaContainer } from "../Styles/container";
import { Buttons, StonksButton } from "../Styles/Buttons";
import { colors } from '../Styles/theme';
import * as T from '../Styles/text';

import StockList, { fullStockDict }  from "../Components/StockList";


function EmptyState({navigation}) {
    return (
    <>
        <Text style={{textAlign: "center", color: "white", fontSize: 20, marginTop: 24, marginBottom: 8}}>No stocks yet.</Text>
        {/* <StonksButton
            onPress={() => navigation.navigate('Search')}
            variant={"secondary"}
            text={"Buy Stocks"}
        /> */}
    </>
    )
}

export default function Portfolio({navigation}) {
    // total assets = balance (aka "buying power") + calculated from stock
    const [totalAssets, setTotalAssets] = useState(0);
    const [balance, setBalance] = useState(0);
    const [portfolio, setPortfolio] = useState({});
    const [stockList, setStockList] = useState([]);
    
    const reloadUserData = async () => {
        try {
            const user = firebase.auth().currentUser;  // Not safe, but fine for now
            const userDoc = firebase.firestore().collection('users').doc(user.uid);
            const userSnapshot = await userDoc.get();
            const userData = userSnapshot.data();
            // console.log("User Data", userData);

            setBalance(userData.balance);
            setPortfolio(userData.portfolio);
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
        let stockAssets = 0;
        Object.entries(portfolio).forEach(
          ([name, qty]) => {
            stockAssets += fullStockDict[name].currPrice * qty;
          } 
        );
        setTotalAssets(stockAssets + balance);
      }
    }, [balance, portfolio])
    
    return (
        <SafeAreaContainer>
            {/* graph view */}
            <View style={styles.graph}> 
                <Image source={require('../../imgs/stonksGoUp.png')}/>
            </View>

            {/* Your portfolio statistics */}
            <View style={styles.urPrtflio}> 
                <T.H4>{`Total Value of Assets`}</T.H4> 
                <T.H1>${totalAssets} </T.H1> 
                <T.Body1 style = {{color: colors.GREEN}} >↗ $50.00 (5%) </T.Body1>
                <T.Body1 style = {{marginTop: 4}} >${balance} of buying power</T.Body1>
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
