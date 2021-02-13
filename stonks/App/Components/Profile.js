import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';

import Buttons from "../Styles/Buttons";

export default function Profile({navigation}) {
  
  return (
    <View style={styles.container}>
      {/* graph view */}
      <View style={styles.propicContainer}> 
        <Image style={styles.propic} source={require('../../imgs/tempPropic.jpg')} />
      </View>

      {/* Your portfolio statistics */}
      <View  style={styles.profileInfo}>
        <Text style = {{color: "white", fontSize: 18}}> Username: Bihan </Text>
        <Text style = {{color: "white", fontSize: 18}}> Your balance is $1050. </Text>
      </View>

      {/* Account managedment, temporary debug stuff */}
      <View>
        <TouchableOpacity style={Buttons.button}
          onPress={() => {
            firebase.auth().signOut()
              .then(() => navigation.navigate('Home'))
              .catch(console.err);
          }}
        >
          <Text style={Buttons.buttontext}>Sign out</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
    flexDirection: "column",
  },
  propicContainer: {
    flex: 1,
    alignItems: "center",
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
    color: "white", 
    alignItems: "center",
    justifyContent: "center",
  }
});
