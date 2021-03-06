import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions} from 'react-native';
import EducationPage from "./Template";
import * as T from "../../Styles/text";


export default function UnderstandStock() {
  return (
    <EducationPage
    title={"Understand a stock's components"}
    subtitle={"Learn what the different symbols representing a stock in your portoflio mean."}
    pageName={'UnderstandStock'}
    >
        <Text style={{...styles.text, marginBottom: 0}}> 
        {/* WOULD BE SUPER COOL IF WE COULD MAKE THIS INTERACTIVE -- IE. SOMEONE CLICKS ON A DIFF PART OF THE PORTFOLIO AND A MODAL POPS UP */}
            <T.B>Understanding a stock</T.B>
            {"\n\n"}
        </Text> 
        <View 
            style={styles.item}
        > 
            <View> 
                <Text style={{color: "white", fontSize: 18}}>AAPL</Text>
                <Text style={{color: "grey", fontSize: 14}}>Apple</Text>
            </View> 
            <View style={styles.qtyAndChange}>
                {<Text style={{color: "white", marginRight: 8}}>1 ×</Text>}            
                <View style={styles.dailyChangeBox}> 
                    <Text style={{color: "white", margin: 3}}> $123.22 </Text>
                </View> 
            </View>
        </View> 
        <Text style={styles.text}>
            {"\n\n"}
            AAPL: The 'ticker' is an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market
            {"\n\n"}
            Apple: The company's full name.
            {"\n\n"}
            Quantity: '1 ×' indicates how many shares of the indicated stock you own currently in your portfolio.
            {"\n\n"}
            Price: '$123.22' indicates the current market price of the stock. If the box is red, this indicates that the stock's value has
            gone down since the market opened. If the box is green, this indicates that the stock's value has gone up since the market's open.
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
    },
    item: {
        width: Dimensions.get('window').width * .7,
        borderColor: 'grey',
        borderWidth: 0.3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10, 
        marginBottom: .5,
    },
    dailyChangeBox: {
        backgroundColor: "red",     // should become a conditional render
        borderRadius: 5,
    },
    qtyAndChange: {
        flexDirection: 'row',
        alignItems: "baseline",
    }
});
