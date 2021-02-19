import React from 'react';
import { StyleSheet, Button, Text, View, TextInput, Dimensions, StatusBar, TouchableOpacity, Image} from 'react-native';

import Buttons from '../Styles/Buttons';


export default function Portfolio({navigation}) {
  return (
    <View style={styles.container}>
      {/* graph view */}
      <View style={styles.graph}>
        <Image source={require('../../imgs/stonksGoUp.png')}/>
      </View>

      {/* Your portfolio statistics */}
      <View style={styles.urPrtflio}>
        <Text style = {{color: 'white', fontSize: 18}} > Your Portfolio </Text>
        <Text style = {{color: 'white', fontSize: 35, marginTop: 5}} > $1050.00 </Text>
        <Text style = {{color: 'green', fontSize: 18, marginTop: 5}} > +$50.00 (5%)</Text>
      </View>

      {/* Stocks */}
      <View style={styles.stocks}>
        <Image source={require('../../imgs/tempstocks.png')}/>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}> Stonks </Text>
        <StatusBar style='auto' />
        <Button
          title="Go to Single Stock's Detail"
          onPress={() => navigation.navigate('StockDetail')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
  },
  graph: {
      flex: 2,
      backgroundColor: 'black',
      width: '100%',
      borderBottomColor: 'white',
      borderWidth: 1,
  },
  urPrtflio: {
      flex: 1.5,
      backgroundColor: 'black',
      width: '100%',
      borderBottomColor: 'white',
      borderWidth: 1,
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'center',
  },
  stocks: {
      flex: 4,
      backgroundColor: 'black',
      width: '100%',
      borderBottomColor: 'white',
      borderWidth: 1,

  },
  navBar: {
      flex: 0,
      backgroundColor: 'black',
      width: '100%',
      borderBottomColor: 'white',
      borderWidth: 1,
  }
});
