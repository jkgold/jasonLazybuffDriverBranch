import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ExpandedItem from './ExpandedItem';

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
          <Text>{this.props.order.orderId}</Text>
          <Text>{this.props.order.orderStatus}</Text>
          <Text>{this.props.order.orderCreatedAt}</Text>
        </View>
        {this.state.itemExpanded ? <ExpandedItem order={this.props.order} auth={this.props.auth} refreshOrders={this.props.refreshOrders}/> : null}
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outsideContainer: {
    justifyContent: 'flex-start',
  },
});

export default ActiveListItem;
