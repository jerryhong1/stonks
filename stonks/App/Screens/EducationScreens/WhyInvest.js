import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import EducationPage from "./Template"
import * as T from "../../Styles/text"


export default function WhyInvest() {
  return (    
    <EducationPage
      title={"Why Invest in the Stock Market?"}
      subtitle={"Investing in the stock market may seem risky at first, but learning how to manage the risk and understanding how the market works can enable traders to grow their wealth passively."}
      pageName={'WhyInvest'}
      >
      <Text style={styles.text}> 
        Here are a few key reasons why the stock market may be a good vehicle for investment. 
        {"\n\n"}
        <T.B>Outrun Inflation </T.B>
        {"\n\n"}
        Inflation, the reduced purchasing power of a currency over time, is not your friend when you’re trying to
          save for a significant purchase, buy a house or finance a comfortable retirement. Investing in the stock
        market may enable you to outrun inflatin. 
        {"\n\n"}
        <T.B>Grow Your Wealth</T.B>
        {"\n\n"}
        If you decide to invest in stocks to grow your wealth, understand that there’s no guarantee of how your 
        stocks will perform. Still, it’s unnecessary to buy stock in the next Amazon or Apple to earn a respectable
          return. Consider that the stock market has averaged a 10% annual return on investments, as measured by the S&P 500
        This is despite the stock market's volatility and its tendency to change rapidly, which from time to time culminates
        in a historic crash characterized by a sudden double-digit decline in value.
        {"\n\n"}
        <T.B>Diversify Your Investments</T.B>
        {"\n\n"}
        Diversify your investments by including some stocks, along with your bonds (and other fixed-income securities). 
        CDs and savings or money market accounts can help protect you from the financial markets' inherent volatility. 
        Often, when the stock market is down, the bond market is up and vice versa. This boils down to an ability to better 
        control volatility (otherwise known as risk) by strategically placing money in investments and bonds.
      </Text>
  </EducationPage>
  );
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
