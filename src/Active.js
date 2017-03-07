import React from 'react';
import {
  Text, View, AsyncStorage, ListView
} from 'react-native';
import axios from 'axios';
import { StackNavigator } from 'react-navigation';
import { API_URL } from '../actions';





class Active extends React.Component {
  static navigationOptions = {
    title: ({state}) => "Active",
  };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
   dataSource: ds.cloneWithRows(['row 1', 'row 2']), orders: [],
    };
  }

   componentDidMount() {
     console.log('firing component did mount');
     AsyncStorage.getItem('auth')
     .then((result) => {
      const auth = JSON.parse(result);
      console.log(auth);
      return axios.post(`${API_URL}/driver/orders/active`, { auth })
     })
     .then((orders) => {
       this.setState({ orders })
     })
     .catch((err) => console.log(err))

    }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.orders}
          renderRow={(rowData) => <Text>{rowData}</Text>}

        />
      </View>


    );
  }
}







export default Active;
