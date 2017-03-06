import React from 'react';
import { StackNavigator } from 'react-navigation';
import Active from './src/Active';
import Completed from './src/Completed';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import Map from './src/Map';

const WS_API = 'ws://lazybuffs-socket-server.herokuapp.com/';
var socket = require("socket.io-client")(WS_API, { jsonp: false });
socket.on('connect', () => {
  navigator.geolocation.getCurrentPosition(driverConnected, driverConnectErr);
});
const driverConnectErr = (err) => {
  console.log('driverConnectErr: ', err);
}
const driverConnected = (position) => {
  socket.emit('driverConnected', { driverId: '4', coords: position.coords });
  navigator.geolocation.watchPosition((position) => {
    socket.emit('driverMoved', { driverId: '4', coords: position.coords });
  }, watchDriverErr, { enableHighAccuracy: true });
}
const watchDriverErr = (err) => {
  console.log('watchDriverErr: ', err);
}


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Active: {screen: Active },
  Completed: {screen: Completed },
  Map: {screen: Map },
  Login: {screen: Login }
});

export default SimpleApp;
