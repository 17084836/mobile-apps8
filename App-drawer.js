import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';

import SignupScreen from './components/signup';
import LoginScreen from './components/login';
import Logout from './components/logout';


import Map from './components/map';
import Location from './components/location';
import Update from './components/updateuser';

import GetUserInfo from './components/getuserinformation';
import LocationsReviews from './components/locationsreviews';
import AddReview from './components/addreview';
import Reviews from './components/reviews';

//import Home from './components/home_with_buttons';

const Drawer = createDrawerNavigator();

class App extends Component {
  render(){
    return (
    <NavigationContainer>
     <Drawer.Navigator>
       <Drawer.Screen name="Home" component={Home} />
       <Drawer.Screen name="About" component={About} />
       <Drawer.Screen name="Contact" component={Contact} />

<Drawer.Screen name="Sign Up" component={SignupScreen} />
<Drawer.Screen name="Login" component={LoginScreen} />
<Drawer.Screen name="Logout" component={Logout} />

<Drawer.Screen name="Map" component={Map} />
<Drawer.Screen name="Update" component={Update} />
<Drawer.Screen name="User Details" component={GetUserInfo} />
<Drawer.Screen name="Locations Reviews" component={LocationsReviews} />
<Drawer.Screen name="Add Review" component={AddReview} />
<Drawer.Screen name="Reviews" component={Reviews} />


    </Drawer.Navigator>
  </NavigationContainer>
);
}
}
    export default App;
