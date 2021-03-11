import React , {Component} from 'react';
import {View , ToastAndroid, StyleSheet, Button} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddReview extends Component{
  constructor(props){
    super(props);

    this.state = {
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
    }

  }
  AddReview = async () => {
    let to_send = {};
    const loc_id = this.props.route.params.location_id;
    const value = await AsyncStorage.getItem('@session_token');

    to_send.overall_rating = parseInt(this.state.overall_rating);
    to_send.price_rating = parseInt(this.state.price_rating);
    to_send.quality_rating = parseInt(this.state.quality_rating);
    to_send.clenliness_rating = parseInt(this.state.clenliness_rating);
    to_send.review_body = this.state.review_body;


//using a POST method to add a new review
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+loc_id+"/review", {
      method: 'post',
      headers: {
        'X-Authorization': value,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to_send),
    })
    .then((response) => {
      if(response.status === 201){
        //console.log(response);
        //Message to our console for insurance
        console.log("Review Has Been Created!");
        //Sending you back to the Location Reviews Page.
        this.props.navigation.navigate("Locations Reviews");
        //Sending a message to the user to confirm to them that their review has now been added.
        ToastAndroid.show("The Review Has Been Created!", ToastAndroid.SHORT);
      }
       else if (response.status ===400){
           //console.log(response);
           //Message to our console for insurance
        throw 'Failed Validation';
      }
      else{
        throw 'Sorry! There Seems To Be An Error.';
      }

    })

      }
      render(){
      //Creating our actual form where users could enter review details.
      const navigation = this.props.navigation;

        return(
            <View >
              <ScrollView>
                <View >
                 <TextInput

                 placeholder="The Overall Rating"
                 onChangeText={(overall_rating) => this.setState ({overall_rating})}
                 value={this.state.overall_rating.toString()}

             />
             <TextInput

                 placeholder="The Price Rating"
                 onChangeText={(price_rating) => this.setState ({price_rating})}
                 value={this.state.price_rating.toString()}
             />
             <TextInput

                 placeholder="The Quality Rating"
                 onChangeText={(quality_rating) => this.setState ({quality_rating})}
                 value={this.state.quality_rating.toString()}

             />
             <TextInput

                 placeholder="The Clenliness Rating"
                 onChangeText={(clenliness_rating) => this.setState ({clenliness_rating})}
                 value={this.state.clenliness_rating.toString()}

              />
              <TextInput
                 placeholder="The Review "
                 onChangeText={(review_body) => this.setState ({review_body})}
                 value={this.state.review_body}

              />
              <View>

                <Button
              title="Add Your Review!"
              onPress={() =>  this.AddReview()}
              />

              <Button
                 title="Go Back"
                 onPress={() => navigation.goBack()}
               />

            </View>

          </View>
        </ScrollView>
      </View>
      );

      }
    }


export default AddReview;
