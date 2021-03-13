import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { VictoryGroup, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryTooltip, VictoryCandlestick } from "victory-native";

export default function Candlestick() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> What is a candlestick chart? </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
            Candlesticks are useful when trading as they show 4 price points (open, close, high, and low)
            throughout a timeperiod. The candlestick has a wide part, which is called the "real body."  
            This real body represents the price range between the open and close of that day's trading. 
            </Text>
            <View>
            <VictoryCandlestick
            domainPadding={{x: [1, 65]}} 
            candleColors={{ positive: "#05ad6d", negative: "red" }}
            data={[
                {x: new Date(2016, 6, 1), open: 5, close: 10, high: 15, low: 0},
                {x: new Date(2016, 6, 2), open: 10, close: 15, high: 20, low: 5},
                {x: new Date(2016, 6, 3), open: 10, close: 15, high: 20, low: 5}
              ]}
              style={{data: {stroke: "white", strokeWidth: 1}, labels: { fill: "white", fontSize: "11px" } }}
              containerComponent={<VictoryVoronoiContainer/>}
              labels={"High Price \n \n \n \n \nOpen Price \n \nReal Body \n \nClose Price \n \n \n \nLow Price\n "}
            />
            </View>
            <Text style={styles.subtitle}> 
            Just above and below the real body are the "shadows" or "wicks." The shadows show the high and 
            low prices of that day's trading. If the upper shadow on a down candle is short, it indicates 
            that the open that day was near the high of the day. A short upper shadow on an up day dictates 
            that the close was near the high.
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
