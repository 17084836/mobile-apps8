import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Contact extends Component{
  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
       <Text style={styles.text}>Contact</Text>
       <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#751d6e'
  },
  text: {
    color: 'white',
    fontSize: 25
  }
});

export default Contact;

/*

<Button
   title="Go Back"
   onPress={() => navigation.goBack()}
 />

 */
