import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class ExpandedItem extends React.Component {
  render() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton}>Confirm</Text>
        <View style={styles.tallylist}>
          <Text>SubTotal:</Text>
          <Text>{this.props.order.orderSubTotal}</Text>
        </View>
        <View style={styles.tallylist}>
          <Text>Tax:</Text>
          <Text>{this.props.order.orderTax}</Text>
        </View>
        <View style={styles.tallylist}>
          <Text>Tip:</Text>
          <Text>{this.props.order.orderTip}</Text>
        </View>
         <View style={styles.tallylist}>
           <Text>Fee:</Text>
           <Text>{this.props.order.orderFee}</Text>
        </View>
        <View style={styles.tallylist}>
          <Text>Total:</Text>
          <Text>{this.props.order.orderTotal}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000'
  },
  toolbar:{
    backgroundColor: '#CFB87C',
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
    justifyContent: 'space-between'


  }

});

export default ExpandedItem;
