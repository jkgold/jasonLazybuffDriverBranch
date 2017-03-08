import React from 'react';
import {
   TextInput, StyleSheet, View, Button, Text, ActivityIndicator, TouchableHighlight, AsyncStorage
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
      username: 'ryan',
      password: 'password',
      err: null,
      loading: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleUsernameChange(username) {
    this.setState({ username });
  }

  handlePasswordChange(password) {
    this.setState({ password });
  }

  submitLogin() {
    this.setState({ loading: true });
    fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: this.state.username,
      password: this.state.password
    })
  })
  .then(response => response.json())
  .then((res) => {
    if (res.err) {
      console.log(res.err);
      this.setState({ err: res.err, loading: false });
    }
    else {
        AsyncStorage.setItem('auth', JSON.stringify(res.profile))
        .then((json) => {
          this.props.navigation.navigate('Active')
        })
        .catch((err) => console.log('fail', err))
      this.setState({ loading: false });
    }
  })
  .catch((err) => {
    console.log(err);
    this.setState({ loading: false });
  });
}

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>

        <View>
          <TextInput
            placeholder='username'
            style={{flex: 1, color: 'white' }}
            autoCapitalize='none'
            autoCorrect= {false}
            onChangeText={this.handleUsernameChange}
            value={this.state.username}
          />
          <TextInput
            placeholder='password'
            style={{flex: 1, color: 'white'}}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
          {this.state.err ? <Text style={{flex: 1, color: 'white'}}>{this.state.err}</Text> : null}

          <Button
            title='submit'
            style={{backgroundColor: '#CFB87C', color: 'white'}}
            onPress={this.submitLogin}
          />
        </View>

        <ActivityIndicator
          animating={this.state.loading}
          style={{flex: 1 }}
          size='large'
        />
      </View>
    );
  }
}

export default Login;
