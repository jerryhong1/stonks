import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import { colors } from "../Styles/colors"
import { SafeAreaContainer } from "../Styles/container"
import * as T from '../Styles/text'
import CashIcon from '../../assets/CashIcon'
import AppIcon from '../../assets/AppIcon'
import { FontAwesome } from '@expo/vector-icons';

var width = Dimensions.get('window').width * .9

export var icons = {
  'WhyInvest': <CashIcon/>,
  'UseApp': <AppIcon/>,
  'Market': <FontAwesome name='line-chart' size={48} color='white' />
}

function EducationItem({title, subtitle, navigation, navigateTo}) {
  return (
    <TouchableOpacity 
      style={styles.education}
      onPress={() => navigation.navigate(navigateTo)}>
      {/* this is a jank icon loader */}
      {icons[navigateTo] ? <View style={{marginRight: 16}}>
        {icons[navigateTo]}
      </View> : null}
      <View 
        style={{
          flex: 3
        }}
      >
        <T.H4>{title}</T.H4>
        <T.P style={{color: colors.LIGHT_GRAY, marginTop: 8}}>{subtitle}</T.P>
      </View>
    </TouchableOpacity>
  )
}


export default function Education({navigation}) {

  return (
    <SafeAreaContainer>
      <View style={styles.header}>
        <T.H2 style={{marginHorizontal: 16}}>Welcome to</T.H2>
        <T.H1 style={{marginHorizontal: 16, marginBottom: 16}}>Stonks Education.</T.H1>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
        <T.H4 style={styles.heading}>Get started</T.H4> 
       
        <EducationItem
          title={"How do I use this app to invest?"}
          subtitle={"We give you the money; you decide the stocks, the quantity to buy or sell, and the timing."}
          navigation={navigation}
          navigateTo={'UseApp'}
        />
         
        <EducationItem
          title={"What is the stock market?"}
          subtitle={"The stock market is where buyers and sellers come together to trade shares in eligible companies."}
          navigation={navigation}
          navigateTo={'Market'}
        />

        <EducationItem 
          title={"Why invest in the stock market?"}
          subtitle={"Investing in the stock market may seem risky at first, but learning how to manage the risk can enable traders to grow their wealth passively."}
          navigation={navigation}
          navigateTo={'WhyInvest'}
        />

        <T.H4 style={styles.heading}>Advanced</T.H4> 
                 
        <EducationItem
          title={"What is an investment?"}
          subtitle={"An investment is an asset bought with the expectation that it will generate some future income or profit."}
          navigation={navigation}
          navigateTo={'Investment'}
        />

        <EducationItem
          title={"What is a stock?"}
          subtitle={"A stock is a unit of ownership in a company."}
          navigation={navigation}
          navigateTo={'Stock'}
        />
        
    
{/*         
        <TouchableOpacity style={styles.education}
          onPress={() => navigation.navigate('Candlestick')}
        >
          <Text style={styles.title}>What is a candlestick chart? </Text>
          <Text style={styles.subtitle}>Candlesticks are useful when trading as they show 4 price points (open, close, high, and low) throughout a timeperiod. </Text>

        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({  
    header: {
        width: Dimensions.get('window').width,
        marginTop: 16,
        borderBottomColor: colors.SUBTLE_TEXT,
        borderWidth: 1,
    },
    content: {
      paddingVertical: 24, 
      width: Dimensions.get('window').width,
      zIndex: 100
    }, 
    contentContainerStyle: {
      justifyContent: "center",
      paddingBottom: 48
    },
    heading: {
      color: colors.LIGHT_GRAY, 
      marginLeft: 16,
      marginVertical: 10
    },
    education: {
      justifyContent: "space-between", 
      flexDirection: "row",
      paddingVertical: 16, 
      paddingHorizontal: 12, 
      backgroundColor: colors.GRAY,
      width:  Dimensions.get('window').width - 32,
      borderRadius: 8,
      marginVertical: 10,
      marginHorizontal: 16
    }
});
