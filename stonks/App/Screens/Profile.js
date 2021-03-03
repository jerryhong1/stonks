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
      
          console.log("New propic", result);
      
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
        <View style={styles.propicContainer}>
            {/* TODO: save/get profile pics in firestore */}
                <Image
                    source={propic? {uri: propic} : require('../../imgs/profile.png')}
                    style={styles.propic}
                />
    
                <TouchableOpacity 
                    onPress={selectImage}
                    style={{
                        alignItems: 'center',
                        padding: 10,
                        margin: 30,
                        color: 'grey'
                      }}
                > 
                    <Text style={{color: 'white'}}>Change Profile Picture</Text>
                </TouchableOpacity>
                
        <Text style = {{color: 'white', fontSize: 24, marginBottom: 8, fontWeight:"500"}}>{name}</Text>
            <Text style = {{color: 'grey', fontSize: 18,marginBottom: 8}}> {username} </Text>
            <Text style = {{color: 'white', fontSize: 18, marginBottom: 12}}> Your balance is ${balance}. </Text>
            <TouchableOpacity style={{...Buttons.smallButton, backgroundColor: "red"}}
            onPress={() => {
                firebase.auth().signOut()
                .then(() => navigation.navigate('Login'))
                .catch(console.err);
            }}
            >
            <View  style={{flexDirection: "row", alignItems: "center"}} > 
                <Ionicons name="exit-outline" size={24} color="white" style={{marginRight: 10}} />
                <Text style={Buttons.buttontext}>Sign out</Text>
            </View>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
        flexDirection: 'column',
    },
    propicContainer: {
        flex: 1,
        alignItems: 'center',
    },
    propic: {
        height: undefined,
        width: 100,
        marginTop: 50,
        aspectRatio: 1,
        borderRadius: 50,
        marginBottom: 16,
    },
    profileInfo: {
        flex: 2,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
