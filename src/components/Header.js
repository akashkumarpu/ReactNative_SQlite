import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../theme/colors'

const Header = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerStyle}>
                {title}
            </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
    },
    headerStyle: {
        fontSize: 36,
        color: COLORS.primary,
        fontWeight: 'bold',
        fontFamily: "Cochin"
    }
})
