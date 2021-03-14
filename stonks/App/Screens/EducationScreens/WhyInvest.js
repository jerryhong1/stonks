import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';

export default function WhyInvest() {

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Why should you invest? </Text>
        <ScrollView>
            <Text style={styles.subtitle}> 
                
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
        marginBottom: 50,
    },

});
