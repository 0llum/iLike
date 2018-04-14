import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 15,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

class ListSelectScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Select a list or create one',
      headerRight:
        <TouchableOpacity onPress={params.navigateToListCreateScreen}
        >
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>,
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
      name: item.item.name,
      color: item.item.color,
      items: item.item.items,
      id: item.item._id,
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
