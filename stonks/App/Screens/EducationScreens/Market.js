import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import EducationPage from './Template'

export default function Market() {

  return (
    <EducationPage
        title={"What is the stock market?"}
        subtitle={"The stock market refers to the collection of markets and exchanges where regular activities of buying, selling, and issuance of shares of publicly-held companies take place."}
        pageName={'Market'}
        >
        <Text style={styles.text}> 
            Such financial activities are conducted through institutionalized 
            formal exchanges or over-the-counter (OTC) marketplaces which operate under a defined 
            set of regulations. There can be multiple stock trading venues in a country or a region
            which allow transactions in stocks and other forms of securities.
            {"\n\n"}
            
            While both terms - stock market and stock exchange - are used interchangeably, the latter 
            term is generally a subset of the former. If one says that she trades in the stock market, 
            it means that she buys and sells shares/equities on one (or more) of the stock exchange(s) 
            that are part of the overall stock market. The leading stock exchanges in the U.S. include 
            the New York Stock Exchange (NYSE), Nasdaq, and the Chicago Board Options Exchange (CBOE). 
            These leading national exchanges, along with several other exchanges operating in the country, 
            form the stock market of the U.S.
            {"\n\n"}
            Though it is called a stock market or equity market and is primarily known for trading 
            stocks/equities, other financial securities - like exchange traded funds (ETF), corporate bonds 
            and derivatives based on stocks, commodities, currencies, and bonds - are also traded in the stock markets.
        </Text>
    </EducationPage>
   
  );
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginVertical: 40,
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 20,
        marginBottom: 50,
    },

});
