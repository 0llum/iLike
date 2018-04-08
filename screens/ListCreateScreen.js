import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';
import Lists from '../constants/Lists';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    flex: 1,
  },
  inputBar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  inputField: {
    flex: 1,
  },
  addButton: {
    padding: 10,
    justifyContent: 'center',
  },
});

class ListCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
   const params = navigation.state.params || {};

    return {
      headerTitle: 'ListScreen',
      headerRight:
        <TouchableOpacity onPress={params.navigateToTilesScreen}>
          <Text style={styles.addButton}>GO</Text>
        </TouchableOpacity>,
    };
  };

  constructor() {
    super();
    const data = Lists[0];
    this.state = {
      name: data.name,
      items: data.data,
      text: '',
      id: data.data.length === 0 ? 0 : data.data.reduce((prev, current) => (prev.id > current.id) ? prev : current).id + 1,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      navigateToTilesScreen: this.navigateToTilesScreen,
    })
  }

  navigateToTilesScreen = () => {
    this.props.navigation.navigate('Tiles', {
      name: this.state.name,
      items: this.state.items
    });
  }

  onChangeText = (value) => {
    this.setState({text: value})
  }

  onPressAdd = () => {
    const id = this.state.id;
    this.setState({
      items: [...this.state.items, {
        id: id,
        name: this.state.text,
        rank: 0,
        count: 0,
        pickRate: 0,
        overall: 0
      }],
      text: "",
      id: id + 1,
    });
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={"padding"}
      >
        <List 
          data={this.state.items}
          name
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder="Add some data"
            onChangeText={(text) => this.onChangeText(text)}
            value={this.state.text}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={this.onPressAdd}
          >
            <Text>ADD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ListCreateScreen;
