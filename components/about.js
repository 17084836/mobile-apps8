import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class About extends Component {
  render(){

    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
       <Text style={styles.title}>About</Text>
       <Text style={styles.text}>This application was built and designed for my mobile applications development Unit. It's an app which allows users to view different coffee shops, leave a review and many other functions.</Text>
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
  }
});

export default About;

/*

<Button
 title="Go Back"
 onPress={() => navigation.goBack()}
 />

 */
