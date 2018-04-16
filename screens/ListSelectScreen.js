import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import HeaderImage from '../components/HeaderImage';
import List from '../components/List';
import * as ColorUtils from '../utils/ColorUtils';
import Plus from '../assets/plus.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ListSelectScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Select a list or create one',
      headerRight: <HeaderImage onPress={params.navigateToListCreateScreen} color={params.color} image={Plus} />
    };
  };

  constructor() {
    super();
    this.state = {
      items: [],
      refreshing: false,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ 
      navigateToListCreateScreen: this.navigateToListCreateScreen,
    })
  }

  componentDidMount() {
    this.fetchLists();
  }

  navigateToListCreateScreen = () => {
    this.props.navigation.navigate('ListCreate');
  }

  fetchLists() {
    this.setState({
      refreshing: true,
    })

    const request = new Request('http://0llum.de:3000/lists');
    return fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          items: responseJson,
          refreshing: false,
        });
      })
      .catch(error => console.log(error));
  }

  onRefresh = () => {
    this.fetchLists();
  }

  onItemPress = (item) => {
    this.props.navigation.navigate('Tiles', {
      name: item.name,
      color: item.color,
      items: item.items,
      id: item._id,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List 
          data={this.state.items}
          onItemPress={(item) => this.onItemPress(item)}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          image
          name
          entries
        />
      </View>
    );
  }
}

export default ListSelectScreen;
