import React, { useState, setState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import firebase from 'firebase';
import Buttons from '../Styles/Buttons';


export default function Welcome({route, navigation}) {
  const {name, email, username, balance} = route.params;
  const [curUser, setUsername] = useState(name);
  const [defaultBalance, setDefaultBalance] = useState(balance);
  const [dialogVisible, setDialogVisible] = useState(false);

  const updateBalance = async (inputText) => {
    try {
        const user = firebase.auth().currentUser;  // Not safe, but fine for now
        const userDoc = firebase.firestore().collection('users').doc(user.uid);
        userDoc.set({
          balance: Number(inputText),
          startingBalance: Number(inputText),
        }, {merge: true});

        navigation.navigate('StartingAmount', {
            name: name,
            email: email,
            username: username,
            balance: Number(inputText),
        })
    } catch (error) {
        console.log(error);
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to Stonks{curUser ? `, ${curUser}` : ''}. </Text>
      <Text style={styles.subtitle}> How much money would you like to start off with? </Text>
      <DialogInput isDialogVisible={dialogVisible}
        title={"What is your preferred starting balance?"}
        message={"We recommend starting with at least $1000."}
        hintInput ={"$1000"}
        submitInput={ (inputText) => {
          setDialogVisible(false),
          updateBalance(inputText)
        } }
        closeDialog={ () => {  setDialogVisible(false);
        }}>
      </DialogInput>
      <TouchableOpacity style={Buttons.welcomeButton}
        onPress={() => 
          updateBalance("1000")
        }
      >
        <View > 
          <Text style={Buttons.welcomeButtonText}>$1000</Text>
          <Text>My first paycheck</Text>
        </View>
        <View>
          <Text style={Buttons.triangle}> ▶ </Text>  
        </View>      
      </TouchableOpacity>
      <TouchableOpacity style={Buttons.welcomeButton}
        onPress={() => 
          updateBalance("10000")
        }
      >
        <View > 
          <Text style={Buttons.welcomeButtonText}>$10k</Text>
          <Text>Almost a Roth IRA's worth </Text>
        </View>
        <View>
          <Text style={Buttons.triangle}> ▶ </Text>  
        </View>      
      </TouchableOpacity>
      <TouchableOpacity style={Buttons.welcomeButton}
        onPress={() => 
          updateBalance("100000")
        }
      >
        <View > 
          <Text style={Buttons.welcomeButtonText}>$100k</Text>
          <Text>My life savings</Text>
        </View>
        <View>
          <Text style={Buttons.triangle}> ▶ </Text>  
        </View>      
      </TouchableOpacity>
      <TouchableOpacity style={Buttons.welcomeButton}
        onPress={() => setDialogVisible(true)}
      >
        <View > 
          <Text style={Buttons.welcomeButtonText}>Custom</Text>
          <Text>Choose your own amount</Text>
        </View>
        <View>
          <Text style={Buttons.triangle}> ▶ </Text>  
        </View>      
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    marginTop: 170,
    marginHorizontal: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginTop: 100,
    textAlign: 'center',
  },
});
