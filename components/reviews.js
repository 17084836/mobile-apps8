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
    this.GettingTheInfo();
  }

  GettingTheInfo = async () => {
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

  LikeTheReview = async (loc_id,rev_id) => {
    const value = await AsyncStorage.getItem("@session_token");
    const id = await AsyncStorage.getItem("@user_id");


    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id+"/like", {
      method: 'post',
      headers: {
        'X-Authorization': value
      },
    })
      .then((response) => {
        if (response.status === 200) {


        }
        else if (response.status === 401) {
          throw 'Im Afraid You Are Unauthorised To View This Information';
        }
        else {
          throw 'Sorry, There Seems To Be A Problem';
        }
      })
      .then(async () => {
        console.log("The Review Has Been Liked!");
        this.GettingTheInfo();

      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
      })

}
UnlikeTheReview = async (loc_id,rev_id) => {
  const value = await AsyncStorage.getItem("@session_token");
  const id = await AsyncStorage.getItem("@user_id");


  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review/"+rev_id+"/like", {
    method: 'delete',
    headers: {
      'X-Authorization': value
    },
  })
    .then((response) => {
      if (response.status === 200) {


      }
      else if (response.status === 401) {
        throw 'Im Afraid You Are Unauthorised To View This Information';
      }
      else {
        throw 'Sorry, There Seems To Be A Problem';
      }
    })
    .then(async () => {
      console.log("The Review Has Been Unliked.");
      this.GettingTheInfo();

    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
    })

}
  render() {
    const navigation = this.props.navigation;
    const loc_id = this.props.route.params.location_id;
    return (
      <View style={styles.container}>
      <View>
        <View>
          <FlatList
            data={this.state.locationData.location_reviews}
            renderItem={({ item }) => (
             //This is where we'll be able to view the reviews
              <View style={{ padding: 20 }}>
                <Text style={styles.title}>Review: {item.review_body}</Text>
                <Text style={styles.text}>Overall Rating:  {item.overall_rating}</Text>
                <Text style={styles.text}>Price Rating:  {item.price_rating}</Text>
                <Text style={styles.text}>Quality:  {item.quality_rating}</Text>
                <Text style={styles.text}>clenliness:  {item.clenliness_rating}</Text>
                <Text style={styles.text}>Likes:  {item.likes}</Text>
                <Button style={{ padding: 20 }}
                      title="Like"
                      onPress={() => this.LikeTheReview(loc_id,item.review_id)}
                    />
                    <Button style={{ padding: 20 }}
                          title="Unlike"
                          onPress={() => this.UnlikeTheReview(loc_id,item.review_id)}
                        />
                        <Button
                         title="Go Back"
                         onPress={() => navigation.goBack()}
                         />
              </View>





            )}

            keyExtractor={(item, index) => item.review_id.toString()}


          />

          



        </View>

      </View>
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




export default Reviews;
