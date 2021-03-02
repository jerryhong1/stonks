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
  const data = props.data;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('StockDetail', {data: data})}
      style={styles.item}
    >
      <View>
        <Text style={{color: 'white', fontSize: 18}}>{data.ticker}</Text>
        <Text style={{color: 'grey', fontSize: 14}}>{data.company}</Text>
      </View>
      <View style={styles.qtyAndChange}>
        {data.count && <Text style={{color: 'white', marginRight: 8}}>{data.count} ×</Text>}
        <View style={styles.dailyChangeBox}>
          <Text style={{color: 'white', margin: 3}}> {'$' + data.currPrice} </Text>
        </View>
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
    backgroundColor: 'red',     // should become a conditional render
    borderRadius: 5,
  },
  qtyAndChange: {
    flexDirection: 'row',
    alignItems: 'baseline',
  }
});
