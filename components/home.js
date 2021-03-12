import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';



class Home extends Component{
  render(){

    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>

      <Text style={styles.title}>Home</Text>


       <Text style={styles.text}>Welcome to the Coffida App Assignment! Feel free to make an account with us so you get all the benefits of the app. Such as adding your own reviews, updating your review and much more!</Text>







      </View>
    );
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
    color: 'white',
    backgroundColor:'#3369d6',
    fontSize: 25,
    padding: 7
  },

  text: {
    color: 'white',
    fontSize: 18
  },



});



export default Home;
