import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import Buttons from '../Styles/Buttons';

// Buy/Sell screen for a single stock, given by the route params.
export default function ModalScreen({route, navigation}) {
  const [balance, setBalance] = useState(0);
  const [qty, setQty] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  const stockData = route.params.stockData;
  const buyOrSell = route.params.buyOrSell;
  
  function handleQty(qty) {
    setQty(qty ? parseInt(qty) : 0);
  }

  function handleBuySell() {
    // 1. Add stock to portfolio if not there (only happens on buy)
    if (!portfolio[stockData.ticker]) {
      portfolio[stockData.ticker] = 0;
    }
    
    // 2. Update the number of stocks held
    let qtyChanged = buyOrSell === "Purchase" ? parseInt(qty) : -parseInt(qty);
    portfolio[stockData.ticker] = parseInt(portfolio[stockData.ticker]) + qtyChanged;
    
    // 3. Calculate total cost of stocks bought or sold and update balance. 
    let total_cost = buyOrSell === "Purchase" ? 
      parseInt(qty) * parseInt(stockData.currPrice) : 
      -1 * parseInt(qty) * parseInt(stockData.currPrice);
    let new_balance = balance - total_cost;
    
    // 4. Update user's portfolio and balance in firebase.
    const user = firebase.auth().currentUser;  
    const userDoc = firebase.firestore().collection('users').doc(user.uid);

    userDoc.set({
      balance: new_balance,
      portfolio: portfolio,
    });
    
    // 5. Display message indicating purchased stocks and navigate to portfolio.
    alert(`You just ${buyOrSell === "Purchase"? "bought" : "sold"} ${qty} stock(s) of ${stockData.company} at $${stockData.currPrice} for $${Math.abs(total_cost)}`);
    
    navigation.navigate('TabScreen');
  }

  // Get username and balance from firebase
  useEffect(() => {
    const getUserData = async () => {
      const user = firebase.auth().currentUser;  // Not safe, but fine for now
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      const userSnapshot = await userDoc.get();
      const userData = userSnapshot.data();
      
      setBalance(userData.balance);
      setPortfolio(userData.portfolio);
    }
    getUserData();
  }, []); 
  
  const cost = qty * stockData.currPrice;
  const buyingDisabled = (buyOrSell === "Purchase") && (qty === 0 || cost > balance);
  const sellingDisabled = (buyOrSell === "Sell") && (!portfolio[stockData.ticker] || qty === 0 || qty > portfolio[stockData.ticker]);
  console.log(qty);


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 30, marginTop: 50}}>{stockData.ticker}</Text>
        <Text style={{ color: "white", fontSize: 16 }}>Buying power: ${balance}</Text>
        { portfolio[stockData.ticker] ? 
          <Text style={{ color: "white", fontSize: 16 }}>Already bought: {portfolio[stockData.ticker]}</Text> : null
        } 
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.inputField}
          placeholder={'Quantity to ' + buyOrSell}
          keyboardType='number-pad'
          placeholderTextColor='grey'
          onChangeText = {handleQty}
        />
        {/* Displays error messages based on whether the user is buying or selling. */}
        {qty!== 0 && <Text style={{ color: "white", fontSize: 16 }}>${stockData.currPrice} × {qty} = ${cost}</Text>}
        {buyOrSell === "Purchase" && qty * stockData.currPrice > balance && <Text style={{ color: "red", fontSize: 16 }}>Not enough balance.</Text>}
        {buyOrSell === "Sell" && !portfolio[stockData.ticker] && <Text style={{ color: "red", fontSize: 16 }}>No stocks to sell.</Text>}
        {buyOrSell === "Sell" && qty > portfolio[stockData.ticker] && <Text style={{ color: "red", fontSize: 16 }}>Not enough stocks to sell.</Text>}
        
        {/* Purchase and Cancel. */}
        <TouchableOpacity 
          style={buyingDisabled || sellingDisabled ? Buttons.disabled : Buttons.button} 
          disabled={buyingDisabled || sellingDisabled}  // TODO: CHECK THIS THERE WAS AN ERROR SO I JUST MADE DID AN OR  
          onPress={handleBuySell}
        > 
          <Text style={buyingDisabled ? Buttons.buttontextdisabled : Buttons.buttontext}> {buyOrSell}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={Buttons.secondary} onPress={() => navigation.goBack()}> 
            <Text style={Buttons.buttontext}> Cancel </Text>
        </TouchableOpacity>
      </View> 
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
  },
  header: {
    padding: 16,
    flex: 2,
    backgroundColor: "black",
    width: "100%", 
  },
  content: {
    flex: 8,
    alignItems: "center"
  },
  inputField: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width * .6,
    borderRadius: 10,
    padding: 10,
    margin: 5
  },
})
