import React from 'react';
import {
  Text, View, Button
} from 'react-native';
var socket = require("socket.io-client")("ws://lazybufs-socket-server.herokuapp.com", { jsonp: false });

socket.on('connect', () => {
  console.log('client connect');
});



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  handleLogout() {
    // TODO: fire redux action on log out
    console.log("Log out lit");
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Lazy Buffs!</Text>

        <Button
          onPress={()=> navigate( 'Completed')}
          title="Completed"
        />

        <Button
          onPress={()=> navigate( 'Map')}
          title="Map"
        />
        <Button
          onPress={this.handleLogout}
          title="Login"
        />
      </View>
    );
  }
}
export default HomeScreen;
