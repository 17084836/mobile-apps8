import React, { Component } from 'react';
import { Button, ToastAndroid, View } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, Text } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';




class LoginScreen extends Component {
    constructor(props) {
        super(props);



        this.state = {
            email: "",
            password: ""
        }




    }
    login = async() => {
        //Validation Here
        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()



                } else if (response.status === 400) {
                    throw ' Sorry! You Have Entered An Incorrect Email Or Password';
                } else {
                    throw 'Sorry! Something Went Wrong';
                }



            })



        .then(async(responseJson) => {
                console.log("You've Signed In!", responseJson);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));
                await AsyncStorage.setItem('@user_info', JSON.stringify(responseJson));
                //convert back to integer when pulling the id out
                this.props.navigation.navigate("Home");
                ToastAndroid.show("You Have Logged In Successfully!", ToastAndroid.SHORT, ToastAndroid.CENTER);



            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show("Sorry! There Seems To Be An Error", ToastAndroid.SHORT);
            })
    }

    //This is where the actual Login Form will be.
    render() {
        return (
           <View>
      <TextInput
      placeholder="Enter Your Email..."
      onChangeText={(email) => this.setState ({email})}
      value={this.state.email}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <TextInput
      placeholder="Enter Your Password..."
      onChangeText={(password) => this.setState ({password})}
      value={this.state.password}
      style={{padding:5, borderWidth:1, margin:10}}
      />
      <Button
      title="Login"
      onPress={() =>  this.login()}
      />
      </View>
        );
    }
}

export default LoginScreen;
