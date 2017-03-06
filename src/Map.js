import React from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';


class Map extends React.Component {
  static navigationOptions ={
    title: ({ state }) => "Map",
  };

  render() {
    return (
      <View>
        <Text>Map</Text>
      </View>
    );
  }
}



export default Map;
