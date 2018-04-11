import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';
import Lists from '../constants/Lists';

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
      items: Lists,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ 
      navigateToListCreateScreen: this.navigateToListCreateScreen,
    })
  }

  navigateToListCreateScreen = () => {
    this.props.navigation.navigate('ListCreate');
  }

  onItemPress = (item) => {
    this.props.navigation.navigate('Tiles', {
      name: item.item.name,
      color: item.item.color,
      items: item.item.data,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List 
          data={this.state.items}
          onItemPress={(item) => this.onItemPress(item)}
          name
          entries
        />
      </View>
    );
  }
}

export default ListSelectScreen;
