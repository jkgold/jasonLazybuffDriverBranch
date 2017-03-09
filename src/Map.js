import React from 'react';
import { Text, View, StyleSheet, AsyncStorage} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';
import MapView, { Marker, Callout } from 'react-native-maps';



class Map extends React.Component {
  static navigationOptions ={
    title: ({ state }) => "Map",
  };

  constructor() {
    super();
    this.state = {
      ordersWithLocation: [],
      latitude: 40.0292888,
      longitude: -105.3100174,
    };
    this.watchDriver = this.watchDriver.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('auth')
    .then((result) => {
      const auth = JSON.parse(result);
      this.setState({ auth });

      return axios.post(`${API_URL}/driver/orders/active`, { auth })
    })
    .then(({ data }) => {
      data.forEach((order) => {
        this.getCoords(order);
      })
    })
    .catch((err) => console.log(err))
  }

  getCoords(order) {
    let customerAddress = order.customerAddress.replace(/ +/g,'+');
    let address = `${customerAddress},+Boulder,+CO&`;
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}key=AIzaSyD7r-xG9QqIPcGJyKWuGPJ0_LV-M_ZM9ao`)
    .then(({ data }) => {
      console.log('res from google ', data.results[0].geometry.location);
      let orderWithLocation = JSON.parse(JSON.stringify(order));
      orderWithLocation.location = data.results[0].geometry.location;

      console.log(orderWithLocation);
      this.setState({ ordersWithLocation: this.state.ordersWithLocation.concat(orderWithLocation) });
    })
    .catch(err => console.log(err))
  }

  watchDriver() {
    navigator.geolocation.watchPosition((position) => {
      this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      console.log(position.coords);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.ordersWithLocation.map((order) => {
            console.log(order.location);
            return <Marker
              coordinate={{latitude: order.location.lat, longitude: order.location.lng}} />
          })}
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});


export default Map;
