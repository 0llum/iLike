import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  inputBar: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 10,
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
        <TouchableOpacity onPress={params.navigateToListSelectScreen}>
          <Text style={styles.addButton}>GO</Text>
        </TouchableOpacity>,
    };
  };

  constructor() {
    super();
    this.state = {
      name: 'New List',
      items: [],
      text: '',
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      navigateToListSelectScreen: this.navigateToListSelectScreen,
    })
  }

  navigateToListSelectScreen = () => {
    const request = new Request('http://0llum.de:3000/lists', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        items: this.state.items,
      }),
    });
    return fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        this.props.navigation.navigate('ListSelect');
      })
      .catch(error => console.log(error));
  }

  onChangeText = (value) => {
    this.setState({text: value})
  }

  onPressAdd = () => {
    this.setState({
      items: [...this.state.items, {
        name: this.state.text,
      }],
      text: "",
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
