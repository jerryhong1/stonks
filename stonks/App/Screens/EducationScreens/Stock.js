import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default function Stock() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> What is a stock? </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
            A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. 
            This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how 
            much stock they own. Units of stock are called "shares."
            {"\n\n"}
            Stocks are bought and sold predominantly on stock exchanges, though there can be private sales as well, 
            and are the foundation of many individual investors' portfolios. These transactions have to conform to 
            government regulations which are meant to protect investors from fraudulent practices. Historically, they 
            have outperformed most other investments over the long run.1﻿ These investments can be purchased from most 
            online stock brokers. 
            </Text>
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
    title: {
        color: 'white',
        fontSize: 24,
        marginVertical: 40,
    },
    subtitle: {
        color: 'white',
        marginHorizontal: 25,
        fontSize: 18,
        textAlign: 'left',
        lineHeight: 25,
    },

});
