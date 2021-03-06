import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, Modal, TextInput } from 'react-native';
import axios from 'axios';
import { API_URL } from '../actions';

const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`

class ExpandedItem extends React.Component {
//begining of fuctional code.
  constructor() {
    super();
    this.state = {
      orderConfirmationActive: false,
      orderConfirmed: false,
    };
    this.handleNextAction = this.handleNextAction.bind(this);
  }

  confirmOrder(orderId, auth) {
    axios.post(`${API_URL}/driver/order/confirm`, { orderId, auth })
    .then(({ data }) => {
      this.props.refreshOrders();
    })
    .catch(err => console.log(err));
  }

  waitOnOrder(orderId, auth) {
    axios.post(`${API_URL}/driver/order/wait`, { orderId, auth })
    .then(({ data }) => {
      this.props.refreshOrders();
    })
    .catch(err => console.log(err));
  }

  pickUpOrder(orderId, auth) {
    axios.post(`${API_URL}/driver/order/pickup`, { orderId, auth })
    .then(({ data }) => {
      this.props.refreshOrders();
    })
    .catch(err => console.log(err));
  }

  handleNextAction(status) {
    if (status === 'assigned') {
      return this.confirmOrder(this.props.order.orderId, this.props.auth);
    }
    else if (status === 'confirmed') {
      return this.waitOnOrder(this.props.order.orderId, this.props.auth);
    }
    else if (status === 'waiting') {
      return this.pickUpOrder(this.props.order.orderId, this.props.auth);
    }
    else if (status === 'pickedUp') {
      return this.props.showDeliveryConfirmation(this.props.order, this.props.auth);
    }
  }



  render() {
    console.log(this.props.order);
    let title = null;
    switch (this.props.order.orderStatus) {
      case 'assigned':
        title = 'Confirm';
        break;
      case 'confirmed':
        title = 'Waiting';
        break;
      case 'waiting':
        title = 'Picked Up';
        break;
      case 'pickedUp':
        title = 'Confirm Delivery';
        break;
      default:
    }

    return (
      <View style={styles.toolbar}>
        <Button
          title={title}
          style={styles.toolbarButton}
          onPress={() => this.handleNextAction(this.props.order.orderStatus)}
        >
          Confirm
        </Button>


        <View style={styles.addressContainer}>
          <Text>{this.props.order.customerName}</Text>
          <Text>{stylePhone(this.props.order.customerPhone)}</Text>
         <Text>
           {this.props.order.customerAddress}
           {this.props.order.customerUnt ? this.props.order.customerUnit : null}
         </Text>
          <Text>Boulder, CO {this.props.order.customerZip}</Text>
        </View>


        <View style={styles.tallylist}>
          <Text>SubTotal:</Text>
          <Text>${this.props.order.orderSubTotal}</Text>
        </View>

        <View style={styles.tallylist}>
          <Text>Tax:</Text>
          <Text>${this.props.order.orderTax}</Text>
        </View>

        <View style={styles.tallylist}>
          <Text>Tip:</Text>
          <Text>${this.props.order.orderTip}</Text>
        </View>

         <View style={styles.tallylist}>
           <Text>Fee:</Text>
           <Text>${this.props.order.orderFee}</Text>
        </View>

        <View style={styles.tallylist}>
          <Text>Total:</Text>
          <Text>${this.props.order.orderTotal}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000'
  },
  addressContainer: {
    padding: 10,
  },
  toolbar:{
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  toolbarButton:{
    textAlign: 'center',
    backgroundColor:'#565A5C',
    color:'white',
      borderRadius: 5
  },
  tallylist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ExpandedItem;
