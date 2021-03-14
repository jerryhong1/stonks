import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default function WhyInvest() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Why Invest in the Stock Market? </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
           Investing in the stock market may seem risky at first, but learning how to manage the risk and understanding
           how the market works can enable traders to grow their wealth passively. Here are a few key reasons why the 
           stock market may be a good vehicle for investment. 
            {"\n\n"}
            Outrun Inflation
            {"\n\n"}
            Inflation, the reduced purchasing power of a currency over time, is not your friend when you’re trying to
             save for a significant purchase, buy a house or finance a comfortable retirement. Investing in the stock
            market may enable you to outrun inflatin. 
            {"\n\n"}
            Grow Your Wealth
            {"\n\n"}
            If you decide to invest in stocks to grow your wealth, understand that there’s no guarantee of how your 
            stocks will perform. Still, it’s unnecessary to buy stock in the next Amazon or Apple to earn a respectable
             return. Consider that the stock market has averaged a 10% annual return on investments, as measured by the S&P 500
            This is despite the stock market's volatility and its tendency to change rapidly, which from time to time culminates
            in a historic crash characterized by a sudden double-digit decline in value.
            {"\n\n"}
            Diversify Your Investments
            {"\n\n"}
            Diversify your investments by including some stocks, along with your bonds (and other fixed-income securities). 
            CDs and savings or money market accounts can help protect you from the financial markets' inherent volatility. 
            Often, when the stock market is down, the bond market is up and vice versa. This boils down to an ability to better 
            control volatility (otherwise known as risk) by strategically placing money in investments and bonds.
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
