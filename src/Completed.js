import React from 'react';
import {
  Text, View
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';

class Completed extends React.Component {
  static navigationOptions = {
    title: ({ state }) => "Completed",
  };

  render() {
    return (
      <View>
        <Text>No Completed Orders</Text>
      </View>
    );
  }
}

export default Completed;
