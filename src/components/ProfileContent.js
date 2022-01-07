import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileContent = ({title, description}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

export default ProfileContent

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignItems: 'flex-start',
        marginTop: 20
    },
    title: {
        fontSize:20,
        color: "#696969",
        fontWeight: "600"
    },
    description: {
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    }
})
