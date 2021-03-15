import React, { useEffect, useState} from 'react';
import { Button, StyleSheet, View, SafeAreaView, TouchableHighlight, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

import { StonksIconButton } from '../Styles/Buttons';
import StockList from '../Components/TransactionList'
import * as T from '../Styles/text'
import {formatMoney} from '../Lib/Utils';
import { TransactionGraph, formatLineChartData} from "../Components/StockGraph"

import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Styles/colors';


export default function Profile({navigation}) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [propic, setPropic] = useState();
    const [transactions, setTransactions] = useState([]);
    const [display, setDisplay] = useState("transactions"); 
    const [lineChartData, setLineChartData] = useState([0,0]);
    
    const reloadUserData = async () => {
        try {
            const user = firebase.auth().currentUser;  // Not safe, but fine for now
            const userDoc = firebase.firestore().collection('users').doc(user.uid);
            const userSnapshot = await userDoc.get();
            const userData = userSnapshot.data();

            setName(user.displayName);
            setUsername(userData.username);
            setBalance(userData.balance);
            setPropic(userData.propic);
            setTransactions(userData.transactions.reverse()); // report with the most recent at the top
            setLineChartData(formatLineChartData(userData.transactions));
            console.log(lineChartData);

        } catch (error) {
            console.log(error);
        }
    }
    const selectImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
            
          if (!result.cancelled) {
            setPropic(result.uri);
            const user = firebase.auth().currentUser;  // Not safe, but fine for now
            const userDoc = firebase.firestore().collection('users').doc(user.uid);
            userDoc.set({propic: result.uri}, {merge: true});
          }
        
    }

    // Get username and balance from firebase in real-time after Buy/Sell
    useEffect(() => { 
        const user = firebase.auth().currentUser; 
        const userDocRef = firebase.firestore().collection('users').doc(user.uid);
        reloadUserData();
        
        // Attaching the listener
        const unsubscribe = userDocRef.onSnapshot(() => {
            reloadUserData();
        });

        // Cleanup
        return () => unsubscribe();

    }, []);

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.profileAndName}>
            <View>
                <TouchableHighlight onPress={selectImage}>
                    <View style={{marginLeft: 16}}> 

                        {propic ? 
                            <Image
                                source={{uri: propic}}
                                style={styles.propic}
                            />
                        :
                            <FontAwesome5 name="user-circle" size={120} color="white" style={styles.propic} />
                        }

                        <T.Body2 style={{marginTop: -8}}>Change Profile Picture</T.Body2>
                    </View> 
                 </TouchableHighlight>
            </View>
            <View style={styles.accountInfo}> 
                <T.H2>{name}</T.H2>
                <T.H3 style = {{color: 'grey'}}>{username}</T.H3>
                
                <StonksIconButton 
                    style={{backgroundColor: colors.RED, marginTop: 12, marginBottom: 12}}
                    onPress={() => {
                        firebase.auth().signOut()
                        .then(() => navigation.navigate('Login'))
                        .catch(console.err);
                    }}
                    width={120}
                    iconName={'exit-outline'}
                    text={"Sign out"}
                />
            </View>        
        </View>
        <View style={styles.transactionsAndBalance}> 
            <T.H3>Your balance</T.H3>
            <T.H0 style={{marginBottom: 16}}>{formatMoney(balance)}</T.H0>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            {setDisplay("transactions")}
                            
                        }}
                        color={display === 'transactions' ? "#ffffff" : colors.SUBTLE_TEXT}
                        title={"Transaction History"}
                        />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            {setDisplay("graph")}
                        }}
                        color={display === 'graph' ? "#ffffff" : colors.SUBTLE_TEXT}
                        title={"Transaction Graph"}
                        />
                </View>
            </View>
            
            <View {...display === "transactions"? styles.transactionList : styles.graph}>
               {display === "transactions" ? 
                <StockList transactions={transactions}/> 
                : 
                <TransactionGraph lineChartData={lineChartData} height={250} width={340}/>
               }
            </View>
        </View> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
        alignContent: 'flex-start',
        width: '100%'
    },
    profileAndName: {
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingBottom: 12
    },
    propic: {
        height: undefined,
        width: 120,
        aspectRatio: 1,
        borderRadius: 100,
        marginBottom: 24,
    },
    accountInfo: {
        marginLeft: 24,
    },
    transactionsAndBalance: {
        flex: 2,
        marginLeft: 16,
        marginRight: 16,
        color: 'white',
        alignItems: 'flex-start',
    },
    graph: {
        flex: 2,
        backgroundColor: "black",
        width: "100%",
        borderBottomColor: "white",
        borderWidth: 1,
    },
    profileInfo: {
        flex: 2,
        marginLeft: 16,
        marginRight: 16,
        color: 'white',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    transactionList: {
        flex: 3,
        width: '100%',
        borderTopColor: 'white',
        borderWidth: 1
    }
});
