import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Contact extends Component{
  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
       <Text style={styles.title}>Contact:</Text>
       <Text style={styles.text}>Please do not hesitate to contact us if there are any problems/enquiries. Our email is 17084836@stu.mmu.ac.uk</Text>
       <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
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

export default Contact;

/*

<Button
   title="Go Back"
   onPress={() => navigation.goBack()}
 />

 */
