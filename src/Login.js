import React from 'react';
import {
   TextInput, StyleSheet, View, Button, Text, ActivityIndicator, TouchableHighlight, AsyncStorage, Image
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#CFB87C', padding: 16}}>

        <View style={styles.inputContainer}>
          <View style={styles.inputCard}>
            <TextInput
              placeholder='username'
              style={styles.textInput}
              autoCapitalize='none'
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
            {this.state.err ? <Text style={{ color: 'red', fontSize: 20}}>{this.state.err}</Text> : <View></View>}

            <Button
              title='submit'
              style={{backgroundColor: '#000000', fontSize: 20,}}
              onPress={this.submitLogin}
            />
            <ActivityIndicator
              animating={this.state.loading}
              style={{color: 'black'}}
              size='large'
            />

          </View>
        </View>


        {/* <View style={{ width: 200, height: 200, position: 'absolute', bottom: 20 }}>
          <Image
            style={styles.image}
            source={require('../images/buffalo-head.png')}
          />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputCard: {
      width: '100%',
      height: 200,
      margin: 20,
    },
    textInput: {
      height: 40,
      color: 'black',
      fontSize: 20,
      width: '100%',
      borderBottomWidth: 10,
      borderBottomColor: '#A2A4A3',
      marginTop: 10,
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
    },
    image: {
      height: '100%',
      width: '100%',
    }
})

export default Login;
