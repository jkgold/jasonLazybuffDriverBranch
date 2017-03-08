import React from 'react';
import {
  Text, View, AsyncStorage, ListView, ActivityIndicator, Modal, TextInput, StyleSheet, Button
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
      loading: false,
      modalVisible: false,
      tipConfirmAmount: '',
      tipOrder: null,
    };
    this.refreshOrders = this.refreshOrders.bind(this);
    this.showDeliveryConfirmation = this.showDeliveryConfirmation.bind(this);
    this.handleTipConfirm = this.handleTipConfirm.bind(this);
    this.completeOrder = this.completeOrder.bind(this);
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
      this.setState({ loading: true });
      console.log('firing refreshOrders');
      axios.post(`${API_URL}/driver/orders/active`, { auth: this.state.auth })
      .then(({ data }) => {
        this.setState({ orders: data, loading: false });
      })
    }

    showDeliveryConfirmation(order, auth) {
      this.setState({ modalVisible: true, tipOrder: order });
    }

    handleTipConfirm(tipConfirmAmount) {
      this.setState({ tipConfirmAmount });
    }

  mapOrders(orders) {
    if(orders.length > 0) {
      return orders.map((order, i) => {
        return (
          <ActiveListItem
          key={i}
          order={order}
          auth={this.state.auth}
          refreshOrders={this.refreshOrders}
          showDeliveryConfirmation={this.showDeliveryConfirmation}
          />
        );
      });
    }
    else {
      return <Text>You have no active orders</Text>
    }
  }

  completeOrder() {
    axios.post(`${API_URL}/driver/order/complete`, { order: this.state.tipOrder, auth: this.state.auth })
    .then(({ data }) => {
      if (data) {
        this.setState({ modalVisible: false, tipConfirmAmount: '', tipOrder: null });
        this.refreshOrders();
      }
    })
    .catch(err => console.log(err));
  }

  render() {
    if (this.state.modalVisible) {
      return (
        <View
          style={styles.modal}
        >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>Confirm Tip Amount</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={this.handleTipConfirm}
                value={this.state.tipConfirmAmount}
              />
            </View>
            <Button
              style={{backgroundColor: '#CFB87C', color: 'white'}}
              title="Confirm Tip"
              onPress={this.completeOrder}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
        {this.state.loading
        ? <ActivityIndicator
            animating={this.state.loading}
            style={{flex: 1 }}
            size='large'
          />
        : this.mapOrders(this.state.orders)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
  },
  inputContainer: {
    borderBottomWidth: 2,
    height: 20,
  },
  input: {
    height: 20,
    color: 'black'
  },
});

export default Active;
