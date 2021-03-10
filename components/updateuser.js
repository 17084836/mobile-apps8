import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, TextInput, Alert, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Update extends Component {
   constructor(props) {
     super(props);
     this.state = {
       givenName: '',
       familyName: '',
       email: '',
       password: '',
     };
   }


   componentDidMount() {
     this.onFocus = this.props.navigation.addListener('focus', () => {
       this.getAsync();
     });
     this.getAsync();
   }


   async getAsync() {
     let id = await AsyncStorage.getItem('id');
     let token = await AsyncStorage.getItem('token');
     let idParse = await JSON.parse(id);
     let tokenParse = await JSON.parse(token);

     this.setState({
       id: idParse,
       token: tokenParse,
     });
   }

   editAccount= async () => {

     const id = await AsyncStorage.getItem('@user_id');
     console.log(id);
     const token = await AsyncStorage.getItem('@session_token');
     console.log(token);
     //We're Connecting To The Server Here
     return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
         'X-Authorization': token,
       },
       body: JSON.stringify(this.state),
       })
        .then(response => {
          if (response.status !=200) {
            Alert.alert('Error! Edit failed.');
          } else {
            this.props.navigation.navigate('Home');
          }
        })
       .catch(e => {
         console.error(e);
       });


   }

   //Displaying The Components Here
   render() {


     return (
       <View style={styles.background}>
        <Text style={styles.text}>Update First Name:</Text>
        <TextInput
        style={styles.box}
        onChangeText={text => this.setState({givenName: text})}
        value={this.state.givenName}
        accessibilityLabel="Edit Forename"
        />


        <Text style={styles.text}>Update Last Name:</Text>
        <TextInput
           style={styles.box}
           onChangeText={text => this.setState({familyName: text})}
           value={this.state.familyName}
           accessibilityLabel="Edit Surname"
         />


         <Text style={styles.text}>Update Email Address:</Text>
         <TextInput
            style={styles.box}
            onChangeText={text => this.setState({email: text})}
            value={this.state.email}
            accessibilityLabel="Edit Email Address"
          />


          <Text style={styles.text}>Update Password:</Text>
          <TextInput
             style={styles.box}
             onChangeText={text => this.setState({password: text})}
             value={this.state.password}
             accessibilityLabel="Edit Password"
             secureTextEntry
          />


          <View style={styles.buttonContainer}>
             <Button
              title=" Edit Photo"
              icon={<Icon name="camera-account" size={30} color="white" />}
              onPress={() => this.props.navigation.navigate('Edit Photo')}
              buttonStyle={styles.button}
              accessibilityLabel="Edit Profile Photo"
            />


            <Button
               icon={<Icon name="content-save-edit" size={30} color="white" />}
              onPress={() => this.editAccount()}
              buttonStyle={styles.button}
              title=" Confirm Changes"
              accessibilityLabel="Confirm Edit"
            />


          </View>

        </View>

      );
    }
  }

  // Stylesheet
  const styles = StyleSheet.create({
    background: {
      flex: 10,
      flexDirection: 'column',
      backgroundColor: '#751d6e',
      justifyContent: 'center',
    },

    box: {
      backgroundColor: '#d633c9',
      marginHorizontal: 15,
      marginVertical: 6,
      width: 215,
      height: 45,
    },


    text: {
      fontSize: 20,
      color: '#ffffff',
      marginHorizontal: 20,
    },

    buttonContainer: {
      alignItems: 'center',
      flexDirection:'column',
      marginTop:55,
      marginBottom: 15,
  //    justifyContent: 'center',





    },
  })

export default  Update;
