import React from 'react';
import {
  Text, View, AsyncStorage
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';





class Active extends React.Component {
  static navigationOptions = {
    title: ({state}) => "Active",
  };

  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

   componentDidMount() {
     console.log('firing component did mount');
     AsyncStorage.getItem('auth')
     .then((result) => {
      const auth = JSON.parse(result);
      // console.log(auth);
      return axios.post(`${API_URL}/driver/orders/active`, { auth })
     })
     .then((orders) => {
       console.log(orders.data);
       this.setState({ orders: orders.data });
     })
     .catch((err) => console.log(err))
    }

  render() {
    console.log(this.state.orders);
    return (
      <View style={{flex: 1, padding: 20}}>
        {this.state.orders.map((order) => {
          return <View style={{flex: 1}}><Text>{order.orderId}</Text></View>
        })}
      </View>
    );
  }
}







export default Active;
