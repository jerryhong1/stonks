import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import Buttons from '../Styles/Buttons';
import {formatMoney} from '../Lib/Utils';
import {stockCache, subscribeStockCache}  from "../Lib/StockCache";
// import { consolidateStreamedStyles } from 'styled-components';

// Buy/Sell screen for a single stock, given by the route params.
export default function ModalScreen({route, navigation}) {
  const [balance, setBalance] = useState(0);
  const [qty, setQty] = useState(0);
  const [portfolio, setPortfolio] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [currPrice, setCurrPrice] = useState(0);
  const ticker = route.params.ticker;
  const company = route.params.company;
  const buyOrSell = route.params.buyOrSell;

  function handleQty(qty) {
    setQty(qty ? parseInt(qty) : 0);
  }

  const handleBuySell = async() => {
    // 1. Add stock to portfolio if not there (only happens on buy)
    if (!portfolio[ticker]) {
      portfolio[ticker] = 0;
    }

    // 2. Update the number of stocks held
    let qtyChanged = buyOrSell === "Purchase" ? parseInt(qty) : -parseInt(qty);
    portfolio[ticker] = parseInt(portfolio[ticker]) + qtyChanged;

    // 3. Calculate total cost of stocks bought or sold and update balance.
    let total_cost = (buyOrSell === "Purchase" ? 1 : -1) *
                     parseInt(qty) * parseFloat(currPrice);
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
    alert(`You just ${buyOrSell === "Purchase"? "bought" : "sold"} ${qty} stock(s) of ${company} at ${formatMoney(currPrice)} for ${formatMoney(total_cost)}`);

    navigation.navigate('Home');
  }

  async function updateTransaction (qtyChanged) {
    let updatedTransaction = transactions;

    if (Object.keys(updatedTransaction).length === 0){
      console.log("No transactions yet");
      updatedTransaction = [{
        portfolio: portfolio,
        stock: ticker,
        qtyChanged: qtyChanged,
        price: currPrice,
        buyOrSell: buyOrSell,
        timestamp: Date.now(),
        assetTotal: totalAssets,
      }];
    }
    else {
      updatedTransaction.push({
        portfolio: portfolio,
        stock: ticker,
        qtyChanged: qtyChanged,
        price: currPrice,
        buyOrSell: buyOrSell,
        timestamp: Date.now(),
        assetTotal: totalAssets,
      });
    }
    return updatedTransaction;
  }

  function updateStockData(ticker, data) {
    setCurrPrice(data.currPrice);
  }

  // Get username, balance, portfolio, and transactions from firebase
  useEffect(() => {
    if (stockCache.hasOwnProperty(ticker)) {
      setCurrPrice(stockCache[ticker].currPrice);
    }

    // Subscribe to stock cache changes for $TICKER.
    let unsubStockCache = subscribeStockCache(updateStockData, ticker);

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

    if (unsubStockCache !== null) {
      return unsubStockCache;
    }
  }, []);

  useEffect(() => {
    if (portfolio) {
      let stockAssets = 0;
      Object.entries(portfolio).forEach(
        ([name, qty]) => {
          stockAssets += currPrice * qty;
        }
      );
      setTotalAssets(stockAssets + balance);
    }
  }, [balance, portfolio])

  const cost = qty * currPrice;
  const buyingDisabled = (buyOrSell === "Purchase") && (qty === 0 || cost > balance);
  const sellingDisabled = (buyOrSell === "Sell") && (!portfolio[ticker] || qty === 0 || qty > portfolio[ticker]);
  console.log(qty);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "white", fontSize: 30, marginTop: 50, marginBottom: 5, fontWeight: 'bold'}}>{buyOrSell === 'Purchase' ? 'Buying' : 'Selling'} {ticker}</Text>
        <Text style={{ color: "grey", fontSize: 16 }}>Your buying power: {formatMoney(balance)}</Text>
        { portfolio[ticker] ?
          <Text style={{ color: "grey", fontSize: 16 }}>Shares already owned: {portfolio[ticker]}</Text> : null
        }
      </View>

      <View style={styles.content}>

	  {/* Shares to Purchase */}
		<View style={styles.row}>
			<View style={styles.leftLabel}>
				<Text style={styles.labelText}># of Shares to {buyOrSell} </Text>
			</View>

			<View style={styles.righthandView}>
				<TextInput
          autoFocus
					style={styles.inputField}
					placeholder='0'
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
				<Text style={styles.labelText}>Current Market Price </Text>
			</View>

			<View style={styles.righthandView}>
				<Text style={styles.labelText}>{formatMoney(currPrice)} </Text>
			</View>
		</View>

		{/* Estimated Cost */}
		<View style={{...styles.row, borderWidth: 0}}>
			<View style={styles.leftLabel}>
				<Text style={styles.labelText}>Estimated Cost </Text>
			</View>

			<View style={styles.righthandView}>
      {<Text style={qty === 0 ? styles.defaultEstCost : {...styles.labelText, fontWeight: '600'}}>{formatMoney(cost)}</Text>}
			</View>
		</View>

		<View style={{height: '10%', justifyContent: 'center'}}>
			{/* Displays error messages based on whether the user is buying or selling. */}
			{buyOrSell === "Purchase" && qty * currPrice > balance && <Text style={{ color: "red", fontSize: 16 }}>Not enough balance.</Text>}
			{buyOrSell === "Sell" && !portfolio[ticker] && <Text style={{ color: "red", fontSize: 16 }}>No stocks to sell.</Text>}
			{buyOrSell === "Sell" && qty > portfolio[ticker] && <Text style={{ color: "red", fontSize: 16 }}>Not enough stocks to sell.</Text>}
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
	alignItems: 'center',
	paddingVertical: 8,
	margin: 4,
	height: 48,
	width: Dimensions.get('window').width * .9,
	borderBottomColor: 'white',
	borderWidth: 1,
  },
  leftLabel: {
	width: '70%',
  },
  righthandView: {
	width: '30%',
	alignItems: 'flex-end',
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
