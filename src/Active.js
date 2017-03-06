import React from 'react';
import {
  Text, View
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';





class Active extends React.Component {
  static navigationOptions ={
    title: ({state}) => "Active",
  };
  //  componetDidMount()
  //     axios.get(`${API_URL}/driver/active`, { auth: this.props.auth })
  //     .then((completedOrders) => {
  //       console.log();
  //     })
    // }

  render() {
    return (
      <View>
        <Text>No Active Orders</Text>
      </View>
    );
  }
}







export default Active;
