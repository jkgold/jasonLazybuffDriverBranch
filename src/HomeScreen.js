import React from 'react';
import {
  Text, View, Button
} from 'react-native';




class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {

  }

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
          // onPress={this.handleLogout}
          onPress={()=> navigate( 'Login')}
          title="Login"
        />
      </View>
    );
  }
}
export default HomeScreen;
