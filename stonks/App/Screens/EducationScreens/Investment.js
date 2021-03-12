import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default function Investment() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> What is an investment? </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
                An investment is an asset or item acquired with the goal of generating income or appreciation. 
                Appreciation refers to an increase in the value of an asset over time. When an individual 
                purchases a good as an investment, the intent is not to consume the good but rather to use it in 
                the future to create wealth. An investment always concerns the outlay of some asset today—time, 
                money, or effort—in hopes of a greater payoff in the future than what was originally put in. 
                {"\n\n"}
                For example, an investor may purchase a monetary asset now with the idea that the asset will 
                provide income in the future or will later be sold at a higher price for a profit.
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
