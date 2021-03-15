import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import EducationPage from "./Template"

export default function Stock() {
  return (
    <EducationPage
    title={"What is a stock, exactly?"}
    subtitle={"A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation."}
    pageName={'Stock'}
    >
        <Text style={styles.text}>  
        This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how 
        much stock they own. Units of stock are called "shares."
        {"\n\n"}
        Stocks are bought and sold predominantly on stock exchanges, though there can be private sales as well, 
        and are the foundation of many individual investors' portfolios. These transactions have to conform to 
        government regulations which are meant to protect investors from fraudulent practices. Historically, they 
        have outperformed most other investments over the long run.1﻿ These investments can be purchased from most 
        online stock brokers. 
        </Text>
    </EducationPage>
  )
}

const styles = StyleSheet.create({  
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 20,
        marginBottom: 50
    }
});
