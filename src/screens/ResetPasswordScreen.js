import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

const ResetPasswordScreen = ({ route, navigation }) => {

    const { userId } = route.params;

    const [oldPassword, setoldPassword] = useState("")
    const [enteredOldPassword, setEnteredOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")


    useEffect(() => {
        getData()
    }, [])

    // METHOD TO SHOW ALERT
    const showAlert = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK", onPress: () => navigation.goBack() }
            ]
        );


    const getData = () => {
        let query = "SELECT * FROM Users WHERE ID = " + userId
        console.log(query)
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Users WHERE ID = " + userId,
                    [],
                    (tx, results) => {
                        var len = results.rows.length;
                        console.log("Result Length = " + len)
                        if (len > 0) {
                            let userPassword = results.rows.item(0).Password
                            setoldPassword(userPassword)
                        }
                        else {
                            Alert.alert("Email not exists")
                        }
                    }
                )
            })
        } catch (error) {
            Alert.alert("Error getting data")
            console.log(error);
        }
    }
    const updatePassword = async () => {
        try {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE Users SET Password = ? WHERE ID = ?",
                    [newPassword, userId],
                    () => {
                        showAlert("Success!", 'Password has been changed.')
                    },
                    error => { console.log(error) }
                );
            })
        } catch (error) {
            console.log(error);
        }
    }

    function changeButtonTapped() {
        if (enteredOldPassword.length > 0 && newPassword.length > 0) {
            if (enteredOldPassword == oldPassword) {
                if (newPassword.length >= 5) {
                    updatePassword()
                }
                else {
                    Alert.alert("New password must be 5 characters")
                }
            }
            else {
                Alert.alert("Wrong old password")
            }
        }
        else {
            Alert.alert("Please fill all the fields")
        }
    }

    function cancelButtonTapped() {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <Header title="Change Password" />


            <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                        setEnteredOldPassword(UserPassword)
                    }
                    placeholder="Old Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>


            <View style={styles.SectionStyle}>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(UserPassword) =>
                        setNewPassword(UserPassword)
                    }
                    placeholder="New Password" //12345
                    placeholderTextColor="#8b9cb5"
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
            </View>

            <CustomButton title="Change" onClick={changeButtonTapped} />
            <CustomButton title="Cancel" onClick={cancelButtonTapped} />
        </KeyboardAvoidingView>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },

})
