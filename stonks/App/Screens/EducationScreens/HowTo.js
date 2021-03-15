import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";

export default function HowTo() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> How to use this app [TODO] </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
                STEP 0. You start out with a fixed amount of money. {"\n\n"}
                STEP 1. Search for stocks to buy [insert image] {"\n\n"}
                STEP 2. Stock values fluctuate over time: usually, they grow {"\n\n"}
                STEP 3. Check your portfolio every day. See what stocks you own, the current value, and more. {"\n\n"}
                {"\n\n"}


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
