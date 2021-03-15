import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import EducationPage from "./Template"

export default function Investment() {
  return (
    <EducationPage
    title={"What is an investment?"}
    subtitle={"An investment is an asset or item acquired with the goal of generating income or appreciation."}
    pageName={'Investment'}
    > 
        <Text style={styles.text}> 
            Appreciation refers to an increase in the value of an asset over time. When an individual 
            purchases a good as an investment, the intent is not to consume the good but rather to use it in 
            the future to create wealth. An investment always concerns the outlay of some asset today—time, 
            money, or effort—in hopes of a greater payoff in the future than what was originally put in. 
            {"\n\n"}
            For example, an investor may purchase a monetary asset now with the idea that the asset will 
            provide income in the future or will later be sold at a higher price for a profit.
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
