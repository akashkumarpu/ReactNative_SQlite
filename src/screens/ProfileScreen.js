import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { COLORS } from '../theme/colors'
import CustomButton from '../components/CustomButton';
import ProfileContent from '../components/ProfileContent';
import Header from '../components/Header';

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

const ProfileScreen = ({ navigation }) => {

  const [userId, setUserId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    getEmail()
  }, [])


  useEffect(() => {
    if (userId.length > 0) {
      getData()
    }
  }, [userId])


  // METHOD TO SHOW ALERT
  const showAlert = (title, message) =>
    Alert.alert(
      title,
      message,
      [
        { text: "YES", onPress: () => navigation.popToTop() },
        { text: "NO" }
      ]
    );
  const getEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('@userId')
      console.log("userId = " + value)
      if (value !== null) {
        setUserId(value)
      }
    } catch (e) {
      // error reading value
    }
  }

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
              let firstname = results.rows.item(0).FirstName
              let lastname = results.rows.item(0).LastName
              let emailid = results.rows.item(0).Email
              setFirstName(firstname)
              setLastName(lastname)
              setEmail(emailid)
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

  function resetPasswordTapped() {
    navigation.navigate('ResetPassword', {
      userId: userId,
    });
  }

  function logoutTapped() {
    storeLogin("false")
    showAlert("Alert", "Are you sure want to logout ?")
  }

  const storeLogin = async (value) => {
    try {
      await AsyncStorage.setItem('@login', value)
    } catch (e) {
      // saving error
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      <ProfileContent
        title="First Name"
        description={firstName}
      />
      <ProfileContent
        title="Last Name"
        description={lastName}
      />
      <ProfileContent
        title="Email"
        description={email}
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Change Password"
          onClick={resetPasswordTapped}
        />
        <CustomButton
          title="Logout"
          onClick={logoutTapped}
        />
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    width: "100%",
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20
  }
})
