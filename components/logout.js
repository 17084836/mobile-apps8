import React, { Component } from 'react';
 import {View, Text, Button, ToastAndroid, StyleSheet} from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';


 class Logout extends Component  {






 checkLoggedIn = async () => {
   const value = await AsyncStorage.getItem('@session_token');
   if (value == null) {
       this.props.navigation.navigate('Login');
   }
 }

 logout = async () => {
  //Validation Here
  let token =  await AsyncStorage.getItem('@session_token');
  await AsyncStorage.removeItem('@session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout" , {
      method: 'post',
      headers: {
        'X-Authorization': token
      },
    })
    .then((response) => {
      if(response.status === 200){
        ToastAndroid.show("The logout has been Successful!",ToastAndroid.SHORT,
        ToastAndroid.CENTER);
        this.props.navigation.navigate("Login");
      }
       else if (response.status ===401){
        ToastAndroid.show("You Are Currently Not Logged In!",ToastAndroid.SHORT,ToastAndroid.CENTER);
        this.props.navigation.navigate("Login");
      }
      else{
        throw 'Something went wrong';
      }
    })
    .then(async (responseJson) => {
      console.log("Logged out now!" , responseJson);
      AsyncStorage.removeItem('@session_token');
      AsyncStorage.removeItem('@user_id');
      this.props.navigation.navigate("Login");

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
}

    render() {
      return (





        <View
          style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Logout Page</Text>
          <Button
           title="logout"
           onPress={() => this.logout()}
           />

        </View>
      );

    }
















  }

  export default Logout;
