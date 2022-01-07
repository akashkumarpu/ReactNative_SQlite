import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../theme/colors'

const CustomButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.customBtn}
            onPress={props.onClick}>
            <Text style={styles.Text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    customBtn: {
        width: "60%",
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    Text: {
        color: 'white'
    }
})
