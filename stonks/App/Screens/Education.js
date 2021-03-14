import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Education({navigation}) {

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Welcome to Stonks Education.</Text>
      <ScrollView>
        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('Investment')}
        >
          <Text style={styles.title}>What is an investment? </Text>
          <Text style={styles.subtitle}>An investment is an asset bought with the expectation that it will generate some future income or profit. </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('Stock')}
        >
          <Text style={styles.title}>What is a stock? </Text>
          <Text style={styles.subtitle}>A stock is a unit of ownership in a company. </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('Market')}
        >
          <Text style={styles.title}>What is the stock market? </Text>
          <Text style={styles.subtitle}>The stock market is where buyers and sellers come together to trade shares in eligible companies. </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('WhyInvest')}
        >
          <Text style={styles.title}>Why Invest in the stock market? </Text>
          <Text style={styles.subtitle}>Investing in the stock market may seem risky at first, but learning how to manage the risk can enable traders to grow their wealth passively.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('Candlestick')}
        >
          <Text style={styles.title}>What is a candlestick chart? </Text>
          <Text style={styles.subtitle}>Candlesticks are useful when trading as they show 4 price points (open, close, high, and low) throughout a timeperiod. </Text>

        </TouchableOpacity>
      </ScrollView>
      
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
    head: {
        color: 'white',
        fontSize: 26,
        marginVertical: 30,
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20,
        textAlign: 'left',
    },
    subtitle: {
        color: 'white',
        margin: 20,
        fontSize: 18,
        textAlign: 'left',
    },
    education: {
        width: "90%",
        backgroundColor: '#05ad6d',
        borderRadius: 5,
        margin: 20,
        overflow: 'scroll',
    }
});
