import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import List from '../components/List';
import * as ColorUtils from '../utils/ColorUtils';
import Plus from '../assets/plus.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImageContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
});

class ListSelectScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Select a list or create one',
      headerRight:
      <TouchableOpacity style ={styles.headerImageContainer} onPress={params.navigateToListCreateScreen}>
        <Image style={[styles.headerImage, {tintColor: ColorUtils.getTextColor(params.color)}]} source={Plus}/>
      </TouchableOpacity>
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
