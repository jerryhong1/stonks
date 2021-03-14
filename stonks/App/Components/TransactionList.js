import React from 'react';
import { StyleSheet, Text, FlatList, View} from 'react-native';
import * as T from '../Styles/text'
import { timeSince } from "../Lib/Utils"

function TransactionItem({transaction}) {
    let boughtOrSold = transaction["buyOrSell"] === "Purchase"? "Buy" : "Sale";
    let posOrNeg = transaction["qtyChanged"] > 0 ? "-" : "+"; // you lose money when you buy
    let date = new Date(transaction["timestamp"])
    return (
    <View style={styles.transactions}> 
        <View style={{flex: 1, paddingHorizontal: 8}}>
            <T.P style={{lineHeight: 20}}> 
                {transaction["stock"] + " " + boughtOrSold + "\n"}
                <Text style={{color: 'grey'}}>
                    {Math.abs(transaction["qtyChanged"]) + " share(s)    " + timeSince(date)}  
                    {/* TODO: change into "time" for items in the most recent day */}
                </Text>
            </T.P>
        </View>
        <View style={{paddingRight: 12}}>
            <T.H3>
                {posOrNeg + "$" + transaction["price"] * Math.abs(transaction["qtyChanged"])}
            </T.H3>
        </View>
    </View>)
}


// This component allows for a scrollable list of transaction history.

// NOTE: this also needs to accept a parameter from search that filters 
export default function StockList({transactions}) {
    // console.log("transactions", transactions);
    const renderTransactionItem = ({ index, item }) => {
        let transaction = item
        // console.log(transaction)
        return transaction ? <TransactionItem transaction={transaction} /> : null
    };
    
    const keyExtractor = (index) => {
        return index.toString();
    };

    return (
        <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item, index) => keyExtractor(index)}     // FIX ONCE WE HAVE DATA
        />
    );
}
  
const styles = StyleSheet.create({
    transactions: {
        width: '100%',
        borderTopColor: 'grey',
        borderBottomColor: 'grey',
        borderWidth: 0.3,
        flexDirection: 'row',
        alignContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    transactionTextLeft: {
        color: 'white',
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 5,
        lineHeight: 20,
        fontSize: 14,
    },
    transactionTextRight: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 12
    },
    transactionList: {
        flexDirection: 'column',
        width: '100%',
    }
});
