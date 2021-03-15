// use this template file to create new screens.

import React from 'react';
import { ScrollView, StyleSheet, Text, View} from 'react-native';
import { icons } from '../Education'
import { SafeAreaContainer } from "../../Styles/container"
import { colors } from '../../Styles/colors'
import * as T from '../../Styles/text'

// pass in pageName for icon. 
// children is the text object that represents the actual content.
export default function EducationPage({title, subtitle, pageName, children}) {
  return (
    <SafeAreaContainer>
        <View style={styles.title}>
            {/* this is a jank icon loader */}
            {icons[pageName] ? <View style={{marginRight: 20}}>
                {icons[pageName]}
            </View> : null}
            <View style={{ flex: 3 }}>
                <T.H2 style={{lineHeight: 30}}>{title}</T.H2>
            </View>
        </View>

        <ScrollView style={{marginHorizontal: 20}}>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {children}
        </ScrollView>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({  
    subtitle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'left',
        lineHeight: 24,
        fontWeight: '400',
        color: colors.LIGHT_GRAY,
        borderBottomColor: colors.SUBTLE_TEXT,
        borderWidth: 1,
        marginBottom: 20,
    },
    subtitleContainer: {
        borderBottomColor: colors.SUBTLE_TEXT,
        borderWidth: 1,
        marginBottom: 20
    },
    title: {
        justifyContent: "space-between", 
        flexDirection: "row",
        paddingTop: 32, 
        paddingBottom: 16,
        paddingHorizontal: 8, 
        borderRadius: 8,
        marginHorizontal: 16
    }
});
