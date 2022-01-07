import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Alert } from 'react-native'
import CustomButton from '../components/CustomButton';
import Header from "../components/Header";

import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => { },
  error => { console.log(error) }
);

const SignupScreen = ({ navigation }) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  useEffect(() => {
    // createTable()
  }, [])


  //METHOD TO CREATE TABLE

  // const createTable = () => {
  //     db.transaction(txn => {
  //       txn.executeSql(
  //         "CREATE TABLE IF NOT EXISTS "
  //         + "Users "
  //         + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, Email TEXT, Password TEXT);",
  //         [],
  //         (sqlTxn, res) => {
  //           console.log("table created successfully");
  //         },
  //         error => {
  //           console.log("error on creating table " + error.message);
  //         },
  //       );
  //     });
  //   };

  //METHOD TO CHECK IF THE EAMIL ID ALREADY EXISTS 
  const getData = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Users WHERE Email = '" + email + "'",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              Alert.alert("Email id already exists")
            }
            else {
              saveData()
            }
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }

  //METHOD TO SAVE USER DATA
  const saveData = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (?,?,?,?)",
          [firstName, lastName, email, password]
        );
      })
      // navigation.navigate('Home');
      Alert.alert("Data saved")
    } catch (error) {
      console.log(error);
    }
  }


  // METHOD TO SHOW ALERT
  const showAlert = (message) =>
    Alert.alert(
      "Alert",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  //METHOD GETS EXECUTED WHEN THE USER TAPS LOGIN BUTTON
  function loginTapped() {
    console.log("Login tapped")
    navigation.goBack()
  }


  //METHOD GETS EXECUTED WHEN THE USER TAPS SIGNUP BUTTON
  function signupTapped() {
    console.log("signupTapped")
    let isEmailValid = validateEmail()
    if (isEmailValid) {
      if (firstName.length > 0) {
        if (lastName.length > 0) {
          if (password.length >= 5) {
            getData()
          }
          else {
            showAlert("Password must be 5 characters")
          }
        }
        else {
          showAlert("Last Name should not be empty")
        }
      }
      else {
        showAlert("First name should not be empty")
      }
    }
    else {
      showAlert("Enter a valid email id")
    }
  }

  //METHOD TO VALIDATE EMAIL ID WITH REGEX
  function validateEmail() {
    let text = email
    console.log("Email ==> " + email + "  " + text)
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    }
    else {
      console.log("Email is valid")
      return true
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>

      <Header title="Signup" />

      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserFirstName) =>
            setFirstName(UserFirstName)
          }
          placeholder="First Name" //12345
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
          onChangeText={(UserLastName) =>
            setLastName(UserLastName)
          }
          placeholder="LastName" //12345
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
          onChangeText={(UserEmail) =>
            setEmail(UserEmail)
          }
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
          placeholder="Password" //12345
          placeholderTextColor="#8b9cb5"
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
        />
      </View>

      <CustomButton title="SIGNUP" onClick={signupTapped} />
      <CustomButton title="LOGIN" onClick={loginTapped} />
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

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
