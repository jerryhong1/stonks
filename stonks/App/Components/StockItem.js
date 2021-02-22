import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';


export default function StockItem(props) {
    const navigation = useNavigation();
  
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('StockDetail', {data: props.data})}
            style={styles.item}
        > 
            <View> 
                <Text style={{color: "white", fontSize: 18}}>{props.data.ticker}</Text>
                <Text style={{color: "grey", fontSize: 14}}>{props.data.company}</Text>
            </View> 

            <View style={styles.dailyChangeBox}> 
                <Text style={{color: "white", margin: 3}}> {props.data.currPrice} </Text>
            </View> 
       </TouchableOpacity>
    );
}
  
const styles = StyleSheet.create({
    item: {
        width: '100%',
        borderBottomColor: 'grey',
        borderWidth: 0.3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10, 
    },
    dailyChangeBox: {
        backgroundColor: "red",     // should become a conditional render
        borderRadius: 5,
    }
});