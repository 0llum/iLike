import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderImage from '../components/HeaderImage';
import List from '../components/List';
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
      headerRight: (
        <HeaderImage
          onPress={params.navigateToListCreateScreen}
          color={params.color}
          image={Plus}
        />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      items: [],
      refreshing: false,
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      navigateToListCreateScreen: this.navigateToListCreateScreen,
    });
  }

  componentDidMount() {
    this.fetchLists();
  }

  onRefresh = () => {
    this.fetchLists();
  };

  onItemPress = (item) => {
    const list = {
      name: item.name,
      color: item.color,
      items: item.items,
      id: item._id,
    };
    this.props.navigation.navigate('Tiles', {
      user: this.props.navigation.state.params.user,
      list,
    });
  };

  fetchLists() {
    this.setState({
      refreshing: true,
    });

    const request = new Request('https://api.0llum.de/lists');
    return fetch(request)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          items: responseJson,
          refreshing: false,
        });
      })
      .catch(error => console.log(error));
  }

  navigateToListCreateScreen = () => {
    this.props.navigation.navigate('ListCreate');
  };

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.items}
          onItemPress={item => this.onItemPress(item)}
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
