import React, { Component } from 'react';
import { Text, View, Button, TextInput, Alert, ToastAndroid, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Reviews extends Component {
  constructor(props) {
    super(props);


    this.state = {
      locationData: [],
      isLoading: true,
    };

  }
  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const value = await AsyncStorage.getItem("@session_token");
    const loc_id = this.props.route.params.location_id;


    return fetch("http://10.0.2.2:3333/api/1.0.0/location/" + loc_id, {
      method: 'get',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();

        } //Message to our console for insurance
        else if (response.status === 401) {
          throw 'Sorry! You Are Unauthorised.';
        }
        else {
          throw 'Sorry! There Seems To Be A Problem.';
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            locationData: responseJson,
        })

      }) //Message to our console for insurance
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })


  }
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <View>
          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (
             //This is where we'll be able to view the reviews
              <View style={{ padding: 20 }}>
                <Text>{item.review_body}</Text>
                <Text>Overall Rating:  {item.overall_rating}</Text>
                <Text>Price Rating:  {item.price_rating}</Text>
                <Text>Quality:  {item.quality_rating}</Text>
                <Text>clenliness:  {item.clenliness_rating}</Text>
                <Text>Likes:  {item.likes}</Text>
              </View>

            )}

            keyExtractor={(item, index) => item.review_id.toString()}


          />


        </View>





      </View>
    );
  }
}

export default Reviews;
