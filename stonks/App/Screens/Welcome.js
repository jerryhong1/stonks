import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import firebase from 'firebase';
import { formatMoney } from '../Lib/Utils';
import Buttons from '../Styles/Buttons';


export default function Welcome({route, navigation}) {
  const {name, email, username, balance} = route.params;
  const [curUser, setUsername] = useState(name);
  const [defaultBalance, setDefaultBalance] = useState(balance);
  const [dialogVisible, setDialogVisible] = useState(true);

  const updateBalance = async (inputText) => {
    try {
        const user = firebase.auth().currentUser;  // Not safe, but fine for now
        const userDoc = firebase.firestore().collection('users').doc(user.uid);
        userDoc.set({
          balance: Number(inputText),
          startingBalance: Number(inputText),
        }, {merge: true});
        console.log(inputText);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to Stonks{curUser ? `, ${curUser}` : ''}. </Text>
      <Text style={styles.subtitle}> You have {formatMoney(defaultBalance)} in your account. </Text>
      <DialogInput isDialogVisible={dialogVisible}
        title={"What is your preferred starting balance?"}
        message={"We recommend starting with at least $1000."}
        hintInput ={"$1000"}
        submitInput={ (inputText) => {
          setDefaultBalance(inputText)
          setDialogVisible(false)
          updateBalance(inputText)
        } }
        closeDialog={ () => {  setDialogVisible(false);
        }}>
      </DialogInput>
      <TouchableOpacity style={Buttons.button}
        onPress={() => navigation.navigate('TabScreen')}
      >
        <Text style={Buttons.buttontext}> Get Started </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
      color: 'white',
      margin: 20,
      fontSize: 18,
  },
  title: {
    color: 'white',
    fontSize: 24,
},
});
