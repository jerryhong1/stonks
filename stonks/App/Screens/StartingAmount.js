import React, { useState, setState} from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { formatMoney } from '../Lib/Utils';
import Buttons from '../Styles/Buttons';


export default function StartingAmount({route, navigation}) {
    const {name, email, username, balance} = route.params;
    const [curUser, setUsername] = useState(name);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Welcome to Stonks{curUser ? `, ${curUser}` : ''}. </Text>

            <View style={{height: '80%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.subtitle}> Okay, we'll start you off with </Text>
                <Text style={styles.amount}> {formatMoney(balance)} </Text>

                <TouchableOpacity style={Buttons.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={Buttons.buttontext}> Start Trading </Text>
                </TouchableOpacity>
                <View style={styles.trendBox}>
                    <Text style={styles.trendTextHeader}>{formatMoney(balance)} can yield: </Text>
                    <Text style={styles.trendText}>✅ {formatMoney(balance * 1.15**5)} over 5 years</Text>
                    <Text style={styles.trendText}>✅ {formatMoney(balance * 1.15**10)} over 10 years</Text>
                    <Text style={styles.trendText}>✅ {formatMoney(balance * 1.15**25)} over 25 years</Text>
                    <Text style={styles.trendTextFootnote}>*with 15% growth per year</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subtitle: {
        color: 'white',
        fontSize: 18,
        marginHorizontal: 80,
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 100,
        textAlign: 'center',
    },
    amount: {
        color: 'white',
        fontSize: 50,
        marginBottom: 20,
    },
    trendBox: {
        marginVertical: 40,
        width: Dimensions.get('window').width * .8,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 12,
        borderColor: '#1EDD4E',
        borderWidth: 4,
    },
    trendTextHeader: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 4,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    trendText: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 35,
        marginVertical: 4,
        textAlign: 'left',
        // paddingVertical: 5,
    },
    trendTextFootnote: {
        color: 'black',
        fontSize: 14,
        marginHorizontal: 20,
        marginVertical: 4,
        textAlign: 'left',
        fontWeight: 'bold'
    },
});
