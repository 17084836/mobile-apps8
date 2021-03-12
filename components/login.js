import React, { Component } from 'react';
import { Button, ToastAndroid, View, StyleSheet } from 'react-native';
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

      const navigation = this.props.navigation;
        return (
          <View style={styles.container}>
           <View>
      <TextInput
      placeholder="Enter Your Email..."
      onChangeText={(email) => this.setState ({email})}
      value={this.state.email}
      style={styles.text}
      />
      <TextInput
      placeholder="Enter Your Password..."
      onChangeText={(password) => this.setState ({password})}
      value={this.state.password}
      style={styles.text}
      secureTextEntry
      />
      <Button
      title="Login"
      onPress={() =>  this.login()}
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

export default LoginScreen;
