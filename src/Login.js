import React from 'react';
import {
  Text, View
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';


class Login extends React.Component {
  static navigationOptions ={
    title: ({ state }) => "Login",
  };

  render() {
    return (
      <View>
        <Text>login</Text>
      </View>
    );
  }
}

export default Login;
