import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import Buttons from '../Styles/Buttons';

// Buy/Sell screen for a single stock, given by the route params. For now, it can only buy.
export default function ModalScreen({route, navigation}) {
  const [balance, setBalance] = useState(0);
  const [qty, setQty] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  stockData = route.params.stockData;

  function handleQty(qty) {
    setQty(qty ? qty : 0);
  }

  // TODO: connect to firebase to update stock count
  function handlePurchase() {
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
  const buyingDisabled = qty === 0 || cost > balance;
  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 30 }}>{stockData.ticker}</Text>
        <Text style={{ color: "white", fontSize: 16 }}>Buying power: ${balance}</Text>
        { portfolio[stockData.ticker] && 
          <Text style={{ color: "white", fontSize: 16 }}>Already bought: {portfolio[stockData.ticker]}</Text> 
        } 
      </View>
      <View style={styles.content}>
        <TextInput
          style={styles.inputField}
          placeholder='Quantity'
          keyboardType='number-pad'
          placeholderTextColor='grey'
          onChangeText = {handleQty}
        />
        {qty!== 0 && <Text style={{ color: "white", fontSize: 16 }}>${stockData.currPrice} × {qty} = ${cost}</Text>}
        {qty * stockData.currPrice > balance && <Text style={{ color: "red", fontSize: 16 }}>Not enough balance.</Text>}
        
        {/* Purchase and Cancel. TODO: handle purchasing */}
        <TouchableOpacity 
          style={buyingDisabled ? Buttons.disabled : Buttons.button} disabled={buyingDisabled} 
          onPress={handlePurchase}
        > 
            <Text style={buyingDisabled ? Buttons.buttontextdisabled : Buttons.buttontext}>Purchase </Text>
        </TouchableOpacity>
        <TouchableOpacity style={Buttons.secondary} onPress={() => navigation.goBack()}> 
            <Text style={Buttons.buttontext}> Cancel </Text>
        </TouchableOpacity>
      </View> 
    </KeyboardAvoidingView>
  )
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