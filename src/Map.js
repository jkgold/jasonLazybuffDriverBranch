import React from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';
import MapView from 'react-native-maps';


class Map extends React.Component {
  static navigationOptions ={
    title: ({ state }) => "Map",
  };

  render() {
    return (
      <View>
        <MapView 
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />

      </View>
    );
  }
}



export default Map;
