import React, { Component } from 'react';
 import {View, Text, Button, ToastAndroid, StyleSheet} from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';


 class Logout extends Component  {

//Here There's a piece of code that will check if the person using the app is actually logged in or not
//If they're logged in then it will logout as normal
//If not, then the user will be sent to the sign in page
//Also getting a message from the terminal letting them know that they are currently not logged in (line39)

 CheckIfLoggedIn = async () => {
   const value = await AsyncStorage.getItem('@session_token');
   if (value == null) {
       this.props.navigation.navigate('Login');
   }
 }

 LoggingOut = async () => {
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
        AsyncStorage.removeItem('@session_token');
        AsyncStorage.removeItem('@user_id');
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

      const navigation = this.props.navigation;
      return (

<View style={styles.container}>



        <View
          style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Log out Page</Text>
          <Button
           title="Log Out"
           onPress={() => this.LoggingOut()}
        
           />

           <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            />

        </View>

        </View>
      );

    }

  }

//Here Im using a style sheet in order to add some colours to the page and get rid of the bland text that's on the page.

  const styles = StyleSheet.create({
    container:{
      flex: 1,
  //    alignItems: 'center',
    //  justifyContent: 'center',
      backgroundColor: '#751d6e'
    },
    title: {
      color: 'black',
      backgroundColor:'#3369d6',
      fontSize: 20,
      padding: 7
    },

    text: {
      color: 'black',
      fontSize: 18,
      padding:10,
      borderWidth:5,
      margin:5,
      borderColor:'steelblue'
    },
    text2: {
      fontSize:15,
       color:'steelblue'

    }
  });


  export default Logout;
