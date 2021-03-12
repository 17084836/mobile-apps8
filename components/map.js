import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
         'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
   console.warn(err);
  }
}


class Map extends Component{

  constructor(props){
    super(props);

    this.state = {
      location: null,
      locationPermission: false
    }


  }

  findCoordinates(){
    console.log("state", this.state);
    if(!this.state.locationPermission){
      console.log("asking for permission...");
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
      const location = JSON.stringify(position);
      this.setState({location});
    }, (error) => {
      Alert.alert(error.message);
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000

    });
  }

  render(){
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
      <View>
       <Button title="Get my coords" onPress={() => {this.findCoordinates()}} />
       <Text style={styles.title}>Location: {this.state.location}</Text>

       <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        />
       </View>
       </View>
    );
  }

}


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






export default Map;
