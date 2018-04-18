import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import HeaderImage from '../components/HeaderImage';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import ArrowRight from '../assets/arrow_right.png';
import Plus from '../assets/plus.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  inputBar: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 5,
    backgroundColor: Colors.white,
  },
  inputField: {
    flex: 1,
  },
});

class ListCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
   const params = navigation.state.params || {};

    return {
      headerTitle:
      <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Title"
            onChangeText={(text) => params.onChangeTitle(text)}
            value={params.name}
            selectionColor={Colors.accent}
            underlineColorAndroid={Colors.accent}
          />
        </View>,
      headerRight: <HeaderImage onPress={params.navigateToListSelectScreen} color={params.color} image={ArrowRight} />
    };
  };

  constructor() {
    super();
    this.state = {
      name: '',
      items: [],
      text: '',
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      navigateToListSelectScreen: this.navigateToListSelectScreen,
      onChangeTitle: this.onChangeTitle,
      title: this.state.name,
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

  onChangeTitle = (value) => {
    this.setState({name: value})
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

  onPressDelete = (index) => {
    console.log(index);
    let items = this.state.items;
    items.splice(index, 1);
    this.setState({
      items: items,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
        <List 
          data={this.state.items}
          image
          name
          onDeletePress={(index) => this.onPressDelete(index)}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder="Add some data"
            onChangeText={(text) => this.onChangeText(text)}
            value={this.state.text}
            selectionColor={Colors.accent}
            underlineColorAndroid={Colors.accent}
          />
          <HeaderImage onPress={this.onPressAdd} image={Plus} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ListCreateScreen;
