import React, { Component } from 'react';
import { Button, ToastAndroid, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

class SignupScreen extends Component{


  constructor(props){
    super(props);


    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    }
  }


  signup = () => {
    //Validation Here


    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 201){
          console.log("User Created with ID: ", response);
        return response.json()
      }else if(response.status === 400){
        throw 'Failed validation';
      }else{
        throw 'Something went wrong';
      }
    })
    .then(async (responseJson) => {
      console.log("User Created with ID: ", responseJson);
      this.props.navigation.navigate("Login");
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show("Welcome, Please Log In ",ToastAndroid.SHORT);
    })
  }




  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Welcome! In order to make an account with us, we require you to enter the following information.</Text>
      <Text style={styles.text2}>First Name:</Text>

        <TextInput
          placeholder="Please Enter Your First Name.."
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
          style={styles.text}
        />



        <Text style={styles.text2}>Last Name:</Text>
        <TextInput
          placeholder="Please Enter Your Last Name.."
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
          style={styles.text}
        />



        <Text style={styles.text2}>Email:</Text>
        <TextInput
          placeholder="Please Enter Your Email.."
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
          style={styles.text}
        />



        <Text style={styles.text2}>Password:</Text>
        <TextInput
          placeholder="Please Enter Your Password.."
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry
          style={styles.text}
        />

        <TouchableOpacity
          style={{ backgroundColor:'lightblue', padding:10, alignItems:'center', margin:8}}
          onPress={() => this.signup()}
          >
           <Text style={{fontSize:20, fontWeight:'bold', color:'steelblue'}}>Create Account</Text>
          </TouchableOpacity>

          <Button
           title="Go Back"
           onPress={() => navigation.goBack()}
           />








      </ScrollView>
      </View>
    )
  }
}

//Here Im using a style sheet in order to add some colours to the page and get rid of the bland text that's on the page.

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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








export default SignupScreen;
