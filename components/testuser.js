import React, { Component } from 'react';
import { Text, View, Image, Alert, Button, TextInput, ToastAndroid, ActivityIndicator, ScrollView, StyleSheet, YellowBox, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class testuser extends Component  {
  constructor(props) {
    super(props);


    this.state = {

      userData: [],

      locationData: [],

    };
  }


componentDidMount(){
  this.checkLoggedIn();
//  this.getInfo();
  this.getData();
}
checkLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if (value == null) {
      ToastAndroid.show("Need To be Logged In First", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  else {
    this.getData();
  }
}


getData = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    //console.log(id);

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + id, {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Sorry! You Are Unauthorised To View This Page. Please Log in first';
        }
        else {
          throw 'Something Went Wrong';
        }
      })
      .then((responseJson) => {
        // console.log(responseJson);
        console.log('Data loaded');
        this.setState({
          userData: responseJson,
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })



  }


  getInfo = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");
    // console.log(id);

    return fetch("http://10.0.2.2:3333/api/1.0.0/find", {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {

          console.log("worked");
          return response.json();
        }
        else if (response.status === 401) {
          throw 'Sorry You Are Unauthorised To View This Information';
        }
        else {
          throw 'There Seems To Be A Problem';
        }
      })
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          isLoading: false,
          locationData: responseJson
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })


  }

   render() {

const navigation = this.props.navigation;
   const data = this.props.route.params.data;
     return (
       <View
         style={{
           flex: 1,
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
         }}>
         <Text>User's Details:</Text>


          <FlatList
            data={data}
            renderItem={({ item }) => (
             //This is where we'll be able to view the reviews
              <View style={{ padding: 20 }}>
              <Text style={{ padding: 8 }}>NAME: {item.first_name} {item.last_name}</Text>
               <Text style={{ padding: 8 }}>EMAIL: {item.email}</Text>
              </View>

            )}

            keyExtractor={(item, index) => item.user_id.toString()}


          />


       </View>
     );
   }
 }

 export default testuser;
