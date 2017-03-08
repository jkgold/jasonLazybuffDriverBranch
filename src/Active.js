import React from 'react';
import {
  Text, View, AsyncStorage, ListView
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';
import ActiveListItem from './ActiveListItem';




class Active extends React.Component {
  static navigationOptions = {
    title: ({state}) => "Active",
  };

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      auth: null,
    };
    this.refreshOrders = this.refreshOrders.bind(this);
  }

   componentDidMount() {
     console.log('firing component did mount');
     AsyncStorage.getItem('auth')
     .then((result) => {
      const auth = JSON.parse(result);
      this.setState({ auth });

      return axios.post(`${API_URL}/driver/orders/active`, { auth })
     })
     .then(({ data }) => {
       this.setState({ orders: data });
     })
     .catch((err) => console.log(err))
    }

    refreshOrders() {
      console.log('firing refreshOrders');
      axios.post(`${API_URL}/driver/orders/active`, { auth: this.state.auth })
      .then(({ data }) => {
        this.setState({ orders: data });
      })
    }

  render() {
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: '#000000'}}>
        {this.state.orders.map((order, i) => {
          return (
            <ActiveListItem
            key={i}
            order={order}
            auth={this.state.auth}
            refreshOrders={this.refreshOrders}
            />
          )
        })}
      </View>
    );
  }
}

export default Active;
