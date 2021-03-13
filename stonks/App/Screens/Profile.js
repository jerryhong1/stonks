import React, { useEffect, useState} from 'react';
import { Button, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer } from "victory-native";
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

import { StonksIconButton } from '../Styles/Buttons';
import StockList from '../Components/TransactionList'
import * as T from '../Styles/text'
import {timeSince, formatMoney} from '../Lib/Utils';


function TransactionGraph({lineChartData}) {
    const chartTheme = {
        axis: {
          style: {
            tickLabels: {
                fill: 'white',
                padding: 10,
            },
            axis: {
                stroke: "#756f6a"
            },
          },
        },
    };

    // catch cases where y is undefined (for legacy accounts)
    lineChartData = lineChartData.filter(data => data.y)

    return (
        <VictoryChart theme={chartTheme} containerComponent={<VictoryVoronoiContainer/>}>
                
            <VictoryLine
                height={300} 
                domainPadding={{y: [8, 8]}} 
                padding={{ top: 5, bottom: 10 }} 
                theme={VictoryTheme.material} 
                data={lineChartData}
                style={{data: {stroke: "white", strokeWidth: 1}}}
            />
        </VictoryChart> 
    )
}

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


    function formatLineChartData(data) {
        var chartData = [];
        for (var i = 0; i < data.length; i++) {
          var timestamp = data[i].timestamp;
          var datapoint = {x: new Date(timestamp), y: data[i].assetTotal};
          chartData.push(datapoint);
        }
        return chartData;
    }

    function createGraph() {
        return (<View></View>)
        // (
        //     <VictoryChart theme={chartTheme} containerComponent={<VictoryVoronoiContainer/>}>
                
        //         <VictoryLine
        //             // height={300} 
        //             // domainPadding={{y: [8, 8]}} 
        //             // padding={{ top: 5, bottom: 10 }} 
        //             // theme={VictoryTheme.material} 
        //             data={lineChartData}
        //             style={{data: {stroke: "white", strokeWidth: 1}}}
        //         />
        //     </VictoryChart> 
        // );
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.profileAndName}>
            <View>
                <TouchableHighlight onPress={selectImage}>
                    <View style={{marginLeft: 16}}> 
                        <Image
                            source={propic? {uri: propic} : require('../../imgs/profile.png')}
                            style={styles.propic}
                        />
                        <T.Body2 style={{marginTop: -8}}>Change Profile Picture</T.Body2>
                    </View> 
                 </TouchableHighlight>
            </View>
            <View style={styles.accountInfo}> 
                <T.H2>{name}</T.H2>
                <T.H3 style = {{color: 'grey'}}>{username}</T.H3>
                
                <StonksIconButton 
                    style={{backgroundColor: 'red', marginTop: 12, marginBottom: 12}}
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
                        color="#ffffff"
                        title={"Transaction History"}
                        />
                </View>
                <View style={styles.button}>
                    <Button
                        onPress={() => {
                            {setDisplay("graph")}
                            
                        }}
                        color="#ffffff"
                        title={"Transaction Graph"}
                        />
                </View>
            </View>
            
            <View {...display === "transactions"? styles.transactionList : styles.graph}>
               {display === "transactions" ? 
                <StockList transactions={transactions}/> 
                : 
                <TransactionGraph lineChartData={lineChartData}/> 
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
