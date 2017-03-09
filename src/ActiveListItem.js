import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ExpandedItem from './ExpandedItem';
import Minutes from './Minutes';

class ActiveListItem extends React.Component{
  constructor() {
    super();
    this.state = {
      itemExpanded: false
    };
    this.expandItem = this.expandItem.bind(this);
  }


  expandItem() {
    this.setState({ itemExpanded: !this.state.itemExpanded })
  }

  render() {
    return (
      <View style={styles.outsideContainer}>
        <View style={styles.container}>
          <Button
            title='expand'
            onPress={this.expandItem}
          />
          <Text>ID: {this.props.order.orderId}</Text>
          <Text>{this.props.order.orderStatus}</Text>
          <Minutes
            createdAt={parseInt(this.props.order.orderCreatedAt)} readyIn={parseInt(this.props.order.orderReadyIn)}
          />
        </View>
        {this.state.itemExpanded
          ? <ExpandedItem
              order={this.props.order}
              auth={this.props.auth}     refreshOrders={this.props.refreshOrders}
              showDeliveryConfirmation={this.props.showDeliveryConfirmation}
            />
          : null}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
  outsideContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default ActiveListItem;
