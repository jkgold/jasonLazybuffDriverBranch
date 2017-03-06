import React from 'react';
import { StackNavigator } from 'react-navigation';
import Active from './src/Active';
import Completed from './src/Completed';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import Map from './src/Map';


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Active: {screen: Active },
  Completed: {screen: Completed },
  Map: {screen: Map },
  Login: {screen: Login }
});

export default SimpleApp;
