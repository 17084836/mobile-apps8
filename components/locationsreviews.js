import React, { Component } from 'react';
import { Text, View, Image, Alert, Button, TextInput, ToastAndroid, ActivityIndicator, ScrollView, StyleSheet, YellowBox, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocationsReviews extends Component  {
  constructor(props) {
    super(props);


    this.state = {
      userData: [],
      locationData: [],

    };
  }


componentDidMount(){
  //this.CheckIfLoggedIn();
  this.GettingTheInfo();
//  this.PullingTheData();
}
CheckIfLoggedIn = async () => {
  const value = await AsyncStorage.getItem('@session_token');
  if (value == null) {
      ToastAndroid.show("Need To be Logged In First", ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
  else {
    this.PullingTheData();
  }
}


PullingTheData = async () => {
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
        console.log('The Information Is Uploaded To The Screen.');
        this.setState({
          userData: responseJson,
        })

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })


  }


  GettingTheInfo = async () => {
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

          console.log("Reviews Are Displayed!");
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

  FavouriteLocation = async (loc_id) => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");


    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/favourite", {
      method: 'post',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {


        }
        else if (response.status === 401) {
          throw 'Im afraid You Are Unauthorised To View This Information';
        }
        else {
          throw 'There Seems To Be A Problem';
        }
      })
      .then(async () => {
        console.log("The Location Has Been Favourited");


      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })

}

RemoveFromFavourites = async (loc_id) => {
  const value = await AsyncStorage.getItem("@session_token");
  const id = await AsyncStorage.getItem("@user_id");
  // console.log(id);

  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/favourite", {
    method: 'delete',
    headers: {
      'X-Authorization': value
    },
  })
    .then((response) => {
      if (response.status === 200) {



      }
      else if (response.status === 401) {
        throw 'Im afraid You Are Unauthorised To View This Information';
      }
      else {
        throw 'There Seems To Be A Problem';
      }
    })
    .then(async () => {
      console.log("The Location Has Been Removed From Favourites");


    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
    })

}



   render() {

const navigation = this.props.navigation;

     return (

       <View
         style={{
           flex: 1,
           flexDirection: 'column',
           justifyContent: 'center',
           alignItems: 'center',
           backgroundColor: '#751d6e'
         }}>
         <Text>Here Are The Location Reviews! Feel Free To Create A New Review For Any Of The Coffee Shops!</Text>




           <Button
             onPress={() => this.GettingTheInfo()}
             title="Location Reviews"
             accessibilityLabel="Confirm Edit"
           />

           <FlatList
             data={this.state.locationData}
             renderItem={({ item }) => (
               <View>
                 <View style={{ padding: 40 }}>
                   <Text>{item.location_town}</Text>
                    <Text>{item.location_id}</Text>
                   <Text>{item.location_name}</Text>
                   <Text>The Overall Rating: {item.avg_overall_rating}</Text>
                   <Text>The Overall Rating: {item.avg_overall_rating}</Text>
                   <Text>The Price Rating: {item.avg_price_rating}</Text>
                   <Text>The Quality Rating: {item.avg_quality_rating}</Text>
                   <Text>The Clenliness Rating: {item.avg_clenliness_rating}</Text>
                 </View>
                 <Button style={{ padding: 20 }}
                       title="Add Your Review"
                       onPress={() => this.props.navigation.navigate("Add Review", { location_id: item.location_id })}
                 />

                 <Button style={{ padding: 20 }}
                     title="Reviews"
                     onPress={() => this.props.navigation.navigate("Reviews", { location_id: item.location_id })}
                 />
                 <Button style={{ padding: 20 }}
                     title="Add To Favourite"
                     onPress={() => this.FavouriteLocation(item.location_id)}
                 />
                 <Button style={{ padding: 20 }}
                    title="Remove From Favourite"
                    onPress={() => this.RemoveFromFavourites(item.location_id)}
                 />


               </View>
             )}
             keyExtractor={(item, index) => item.location_id.toString()}
           />


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
     padding: 7,
     borderWidth: 5,
     margin: 5,
     borderColor:'steelblue'
   },
   text2: {
     fontSize:15,
      color:'steelblue'

   }
 });



 export default LocationsReviews;
