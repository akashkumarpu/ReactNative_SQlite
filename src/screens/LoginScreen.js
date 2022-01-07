import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import CustomButton from '../components/CustomButton';
import { COLORS } from '../theme/colors'
import Header from "../components/Header";

import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    createTable()
    checkLoginStatus()
    setEmail("")
    setPassword("")
  }, [])


  //METHOD TO CREATE TABLE

  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Users "
        + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, Email TEXT, Password TEXT);",
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  //METHOD TO CHECK IF THE EAMIL ID ALREADY EXISTS 
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Users WHERE Email = '" + email + "' AND Password = '" + password + "'",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              console.log(results.rows.item(0))
              storeLogin("true")
              storeId(results.rows.item(0).ID)
              navigation.navigate("TabBarNavigator")
            }
            else {
              Alert.alert("Invalid credentials")
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }

  const storeLogin = async (value) => {
    try {
      await AsyncStorage.setItem('@login', value)
    } catch (e) {
      // saving error
    }
  }

  const storeId = async (userId) => {
    try {
      await AsyncStorage.setItem('@userId', userId.toString())
    } catch (e) {
      // saving error
    }
  }


  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@login')
      if (value !== null) {
        // value previously stored
        if (value == "true") {
          navigation.navigate("TabBarNavigator")
        }
      }
    } catch (e) {
      // error reading value
    }
  }


  function loginTapped() {
    console.log("Login tapped")
    console.log("email => " + email)
    console.log("Password =>" + password)
    getData()
  }

  function signupTapped() {
    console.log("signupTapped")
    navigation.navigate("Signup")
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header title="Login" />

      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserEmail) =>
            setEmail(UserEmail)
          }
          value={email}
          placeholder="Email" //12345
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
            setPassword(UserPassword)
          }
          value={password}
          placeholder="Password" //12345
          placeholderTextColor="#8b9cb5"
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          underlineColorAndroid="#f000"
          returnKeyType="next"
        />
      </View>

      <CustomButton title="LOGIN" onClick={loginTapped} />
      <CustomButton title="SIGNUP" onClick={signupTapped} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    width: "80%",
    backgroundColor: "grey",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
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
