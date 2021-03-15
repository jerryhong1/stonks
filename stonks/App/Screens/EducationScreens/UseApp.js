import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import EducationPage from "./Template"
import * as T from "../../Styles/text"

export default function UseApp() {
  return (
    <EducationPage
    title={"How do I use this app?"}
    subtitle={"We give you the money; you decide the stocks, the quantity to buy or sell, and the timing."}
    pageName={'UseApp'}
    > 
        <Text style={styles.text}> 
            TODO: FILL THESE OUT.
            You'll notice we've given you some money to start out and a list of stocks to view.
            Each stock has a price which fluctuates over time depending on....
            {"\n\n"}
            <T.B>Buying and Selling Stocks</T.B>
            {"\n\n"}
            <T.B>Viewing Portfolio</T.B>
            {"\n\n"}
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
