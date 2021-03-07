import React, { useEffect, useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import firebase from 'firebase';

import Buttons from '../Styles/Buttons';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({navigation}) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [balance, setBalance] = useState(0);
    const [propic, setPropic] = useState();
    const [transactions, setTransactions] = useState([]);

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
            setTransactions(userData.transactions);
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

    function getList() {
        let allTransactions = transactions;

        const transactionList = [];
        for (let i = 0; i < allTransactions.length; i++){
          let curTransaction = allTransactions[i];

          if (curTransaction) {
            let boughtOrSold = curTransaction["buyOrSell"] === "Purchase"? "Buy" : "Sale";
            let posOrNeg = curTransaction["qtyChanged"] > 0 ? "+" : "-";
            let date = new Date(curTransaction["timestamp"])
            transactionList[i] = (
                <View key={i} style={styles.transactions}> 
                    <Text style={styles.transactionText}> 
                        {curTransaction["stock"] + " " + boughtOrSold + "\t\t\t\t\t\t\t\t" + 
                        posOrNeg + "$" + curTransaction["price"] * Math.abs(curTransaction["qtyChanged"])}
                    </Text>
                    <Text style={styles.transactionText2}>
                        {Math.abs(curTransaction["qtyChanged"]) + " share(s) \t " + date.toDateString()} 
                    </Text>
                </View>
            );
          }
        }
        
        let retVal = (
          <Text> There are no transactions.</Text>
        );
        
        if (transactionList.length > 0){
          retVal = (
            <View >
              <View>{transactionList}</View>
            </View>
          );
        }
        return retVal;
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.propicContainer}>
            <View>
                <Image
                    source={propic? {uri: propic} : require('../../imgs/profile.png')}
                    style={styles.propic}
                />
    
                <TouchableOpacity 
                    onPress={selectImage}
                    style={{
                        alignItems: 'center',
                        marginTop: 8,
                        marginBottom: 24,
                        color: 'grey'
                      }}
                > 
                    <Text style={{color: 'white'}}>Change Profile Picture</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.username}> 
                <Text style = {{color: 'white', fontSize: 24, marginBottom: 8, fontWeight:'500'}}> {name}</Text>
                <Text style = {{color: 'grey', fontSize: 18,marginBottom: 8}}> {username} </Text>
            </View>        
        </View>
        <View style={styles.profileInfo}> 
            <Text style = {{color: 'white', fontSize: 18, marginTop: -50, marginBottom: 12}}> Your balance</Text>
            <Text style = {{color: 'white', fontSize: 40, marginBottom: 20}}> ${balance} </Text>

            <View style={styles.transactionList}> 
                <Text style={styles.transactionHistory}>Transaction History</Text>
                {getList()}
            </View> 
        </View> 
        <TouchableOpacity style={{...Buttons.smallButton, backgroundColor: 'red', marginTop: 20, width: 120, alignSelf: 'center'}}
            onPress={() => {
                firebase.auth().signOut()
                .then(() => navigation.navigate('Login'))
                .catch(console.err);
            }}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}} > 
                <Ionicons name='exit-outline' size={24} color='white' style={{marginRight: 10}} />
                <Text style={Buttons.buttontext}>Sign out</Text>
            </View>
        </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
        width: '100%'
    },
    propicContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    propic: {
        height: undefined,
        width: 100,
        marginLeft: 15,
        aspectRatio: 1,
        borderRadius: 50,
        marginBottom: 16,
    },
    username: {
        alignItems: 'center',
        marginLeft: 30,
        marginTop: -30,
    },
    profileInfo: {
        flex: 2,
        color: 'white',
        alignItems: 'flex-start',
    },
    transactionHistory: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: 'white', 
        fontSize: 18, 
        marginBottom: 12
    },
    transactions: {
        width: '100%',
        borderTopColor: 'grey',
        borderBottomColor: 'grey',
        borderWidth: 0.3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15, 
        flexDirection: 'column',
        overflow: 'scroll'
    },
    transactionText: {
        color: 'white',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 14,
    },
    transactionText2: {
        color: 'grey',
        paddingHorizontal: 20,
        fontSize: 12,
    },
    transactionList: {
        flexDirection: 'column',
        flex: 2,
        width: '100%',
    }
});
