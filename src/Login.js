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
      username: '',
      password: '',
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#A2A4A3'}}>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='username'
            style={styles.textInput}   autoCapitalize='none'
            autoCorrect= {false}
            onChangeText={this.handleUsernameChange}
            value={this.state.username}
          />
          <TextInput
            placeholder='password'
            style={styles.textInput} 
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
          {this.state.err ? <Text style={{flex: 1, color: 'white'}}>{this.state.err}</Text> : null}

          <Button
            title='submit'
            style={{backgroundColor: 'black', color: 'white', fontSize: 20,}}
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

const styles = StyleSheet.create({
  inputContainer: {
      flex:1,
      borderBottomWidth: 2,
      borderTopWidth: 2,
      height: 20,
      fontSize: 100,
    },
    textInput: {
      flex: 1,
      color: 'black',
      fontSize: 20, backgroundColor:'#CFB87C',
      width: '100%',
      borderBottomWidth: 10,
      marginTop: 10,
      borderWidth: 2,

    }

})

export default Login;
