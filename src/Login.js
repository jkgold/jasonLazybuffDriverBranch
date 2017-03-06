import React from 'react';
import {
   TextInput
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'enter email/username here'};
    }

  render() {
    return (

    <TextInput
      style={{padding: 15, height: 60, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}
    />


    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     justifyContent:'center',
//     alignItems: 'center',
//     flex: 1,
//
//   },
//   username: {
//
//   },
//   password: {
//
//   }
// })

export default Login;
