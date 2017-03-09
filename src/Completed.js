import React from 'react';
import {
  Text, View, StyleSheet
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
      <View style={styles.container}>
        <Text>No Completed Orders</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A2A4A3',
    flex: 1,
  },
});

export default Completed;
