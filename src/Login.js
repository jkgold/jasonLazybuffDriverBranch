import React from 'react';
import {
   TextInput, StyleSheet, View
} from 'react-native';
import axios from 'axios';
import { API_URL } from '../actions';


class Login extends React.Component {
  static navigationOptions ={
    title: ({ state }) => "Login",
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);


  }

  handleUsernameChange(username) {
    console.log(username)
    this.setState({username})
  }

  handlePasswordChange(password) {
    console.log(password)
    this.setState({password})
  }


  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#565A5C'}}>
        <TextInput
          placeholder='Username'
          style={{flex: 1, color: 'white'}}
          onChangeText={this.handleUsernameChange}
          value={this.state.username}
        />

        <TextInput
          placeholder='Password'
          style={{flex: 10, color: 'white'}}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />
      </View>
    );
  }
}

export default Login;
