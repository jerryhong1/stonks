import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import Buttons from '../Styles/Buttons';
// import { consolidateStreamedStyles } from 'styled-components';
 
// Buy/Sell screen for a single stock, given by the route params.
export default function ModalScreen({route, navigation}) {
  const [balance, setBalance] = useState(0);
  const [qty, setQty] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  const [marketPrice, setMarketPrice] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const stockData = route.params.stockData;
  const buyOrSell = route.params.buyOrSell;

  function handleQty(qty) {
    setQty(qty ? parseInt(qty) : 0);
  }

  const handleBuySell = async() => {
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

    // 4. Update user's transaction object or create if first transaction
    let newTransaction = await updateTransaction(qtyChanged);

    // 5. Update user's portfolio and balance in firebase.
    const user = firebase.auth().currentUser;  
    const userDoc = firebase.firestore().collection('users').doc(user.uid);

    userDoc.set({
      balance: new_balance,
      portfolio: portfolio,
      transactions: newTransaction,
    }, {merge: true});
    
    // 5. Display message indicating purchased stocks and navigate to portfolio.
    alert(`You just ${buyOrSell === "Purchase"? "bought" : "sold"} ${qty} stock(s) of ${stockData.company} at $${stockData.currPrice} for $${Math.abs(total_cost)}`);
    
    navigation.navigate('TabScreen');
  }

  async function updateTransaction (qtyChanged) {
    let updatedTransaction = transactions;

    if (Object.keys(updatedTransaction).length === 0){
      console.log("No transactions yet");
      updatedTransaction = [{
        portfolio: portfolio,
        stock: stockData.ticker,
        qtyChanged: qtyChanged,
        price: stockData.currPrice,
        buyOrSell: buyOrSell,
        timestamp: Date.now(),
      }];
      console.log("First Transaction object: ", updatedTransaction);
    }
    else {
      updatedTransaction.push({
        portfolio: portfolio,
        stock: stockData.ticker,
        qtyChanged: qtyChanged,
        price: stockData.currPrice,
        buyOrSell: buyOrSell,
        timestamp: Date.now(),
      });
      console.log("New Transaction object: ", updatedTransaction);
    }
    return updatedTransaction;
  }

  // Get username, balance, portfolio, and transactions from firebase
  useEffect(() => {
    const getUserData = async () => {
      const user = firebase.auth().currentUser;  // Not safe, but fine for now
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      const userSnapshot = await userDoc.get();
      const userData = userSnapshot.data();
      
      setBalance(userData.balance);
      setPortfolio(userData.portfolio);
      setTransactions(userData.transactions);
    }
	getUserData();
	
	// TODO: NONE OF THIS IS USED. Do we want to get the currPrice from props, or do we want to reload it here?
	// get market price of current stock being transacted upon
	const getStockValue = async () => {
		// console.log("Ticker ", stockData.ticker);
		const stock = stockData.ticker; 
		const stockDoc = firebase.firestore().collection('stocks').doc(stock);
		const stockSnapshot = await stockDoc.get();
		const stockDataFirebase = stockSnapshot.data();
		const stockValues = stockDataFirebase.results;
		const lastPrice = stockValues[stockValues.length - 1].vw;
		// console.log("CURR STOCK ", stockDataFirebase);
		setMarketPrice(lastPrice);
	}
	getStockValue();
  }, []); 
  
  const cost = qty * stockData.currPrice;
  const buyingDisabled = (buyOrSell === "Purchase") && (qty === 0 || cost > balance);
  const sellingDisabled = (buyOrSell === "Sell") && (!portfolio[stockData.ticker] || qty === 0 || qty > portfolio[stockData.ticker]);
  console.log(qty);


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 30, marginTop: 50, marginBottom: 5, fontWeight: 'bold'}}>{buyOrSell === 'Purchase' ? 'Buying' : 'Selling'} {stockData.ticker}</Text>
        <Text style={{ color: "grey", fontSize: 16 }}>Your buying power: ${balance}</Text>
        { portfolio[stockData.ticker] ? 
          <Text style={{ color: "grey", fontSize: 16 }}>Shares already owned: {portfolio[stockData.ticker]}</Text> : null
        } 
      </View>

      <View style={styles.content}>

    {/* Shares to Purchase */}
		<View style={styles.row}> 
			<View style={styles.leftLabel}> 
				<Text style={styles.labelText}> # of Shares to {buyOrSell} </Text> 
			</View> 

			<View style={styles.righthandView}> 
				<TextInput
					style={styles.inputField}
					placeholder='Type # here'
					keyboardType='number-pad'
					placeholderTextColor='grey'
					onChangeText = {handleQty}
					color='white'
					fontSize={18}
				/>
			</View>
		</View> 

		{/* Curr Market Price */}
		<View style={styles.row}> 
			<View style={styles.leftLabel}> 
				<Text style={styles.labelText}> Current Market Price </Text> 
			</View>

			<View style={styles.righthandView}> 
				<Text style={styles.labelText}>${stockData.currPrice} </Text> 
			</View>
		</View> 

		{/* Estimated Cost */}
		<View style={styles.row}> 
			<View style={styles.leftLabel}> 
				<Text style={styles.labelText}> Estimated Cost </Text> 
			</View>

			<View style={styles.righthandView}> 
				{qty!== 0 && <Text style={styles.labelText}>${cost}</Text>}
				{qty=== 0 && <Text style={styles.defaultEstCost}>${cost}</Text>}
			</View>
		</View> 
        

		<View style={{height: '10%', justifyContent: 'center'}}> 
			{/* Displays error messages based on whether the user is buying or selling. */}
			{buyOrSell === "Purchase" && qty * stockData.currPrice > balance && <Text style={{ color: "red", fontSize: 16 }}>Not enough balance.</Text>}
			{buyOrSell === "Sell" && !portfolio[stockData.ticker] && <Text style={{ color: "red", fontSize: 16 }}>No stocks to sell.</Text>}
			{buyOrSell === "Sell" && qty > portfolio[stockData.ticker] && <Text style={{ color: "red", fontSize: 16 }}>Not enough stocks to sell.</Text>}
        </View>
        

        {/* Purchase and Cancel. */}
        <TouchableOpacity 
          style={buyingDisabled || sellingDisabled ? Buttons.disabled : Buttons.button} 
          disabled={buyingDisabled || sellingDisabled} 
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
//   inputField: {
// 	width: '100%',
//   },
  row: {
	flexDirection: 'row',
	// alignContent: 'center',
	alignItems: 'center',
	padding: 2,
	margin: 4,
	height: '5%',
	// backgroundColor: 'pink',
	width: Dimensions.get('window').width * .9,
	borderTopColor: 'white',
	// borderBottomColor: 'white',
	borderWidth: 1,
  },
  leftLabel: {
	width: '70%',
	// backgroundColor: 'pink'
  },
  righthandView: {
	width: '30%',
	alignItems: 'flex-end',
	// backgroundColor: 'blue',
  },
  labelText: {
	color: 'white', 
	fontSize: 18
  },
  defaultEstCost: {
	color: 'grey', 
	fontSize: 18
  },
})
