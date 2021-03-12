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
          <View style={styles.container}>
            <View >
              <ScrollView>
                <View >
                 <TextInput

                 placeholder="Please Enter The Overall Rating..."
                 onChangeText={(overall_rating) => this.setState ({overall_rating})}
                 value={this.state.overall_rating.toString()}
                 style={styles.text}

             />
             <TextInput

                 placeholder="Please Enter The Price Rating..."
                 onChangeText={(price_rating) => this.setState ({price_rating})}
                 value={this.state.price_rating.toString()}
                 style={styles.text}
             />
             <TextInput

                 placeholder="Please Enter The Quality Rating..."
                 onChangeText={(quality_rating) => this.setState ({quality_rating})}
                 value={this.state.quality_rating.toString()}
                 style={styles.text}

             />
             <TextInput

                 placeholder="Please Enter The Clenliness Rating..."
                 onChangeText={(clenliness_rating) => this.setState ({clenliness_rating})}
                 value={this.state.clenliness_rating.toString()}
                 style={styles.text}

              />
              <TextInput
                 placeholder="Please Enter The Review... "
                 onChangeText={(review_body) => this.setState ({review_body})}
                 value={this.state.review_body}
                 style={styles.text}

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


export default AddReview;
