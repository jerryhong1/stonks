import React, { useEffect, useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

import Buttons from '../Styles/Buttons';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({navigation}) {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);

  // Get username and balance from firebase
  useEffect(() => {
    const getUserData = async () => {
      const user = firebase.auth().currentUser;  // Not safe, but fine for now
      const userDoc = firebase.firestore().collection('users').doc(user.uid);
      const userSnapshot = await userDoc.get();
      const userData = userSnapshot.data();

      setUsername(userData.username);
      setBalance(userData.balance);
    }
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* graph view */}
      <View style={styles.propicContainer}>
        {/* TODO: save/get profile pics in firestore */}
        <Image style={styles.propic} source={require('../../imgs/tempPropic.jpg')} />
      </View>

      {/* Your portfolio statistics */}
      <View  style={styles.profileInfo}>
        <Text style = {{color: 'white', fontSize: 18}}> Username: {username} </Text>
        <Text style = {{color: 'white', fontSize: 18}}> Your balance is ${balance}. </Text>
      </View>

      {/* Account managedment, temporary debug stuff */}
      <View>
        <TouchableOpacity style={Buttons.button}
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
    </View>
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
    marginBottom: 40,
  },
  profileInfo: {
    flex: 2,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
