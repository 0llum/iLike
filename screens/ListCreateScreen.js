import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import ArrowRight from '../assets/arrow_right.png';
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
  }
});

class ListCreateScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
   const params = navigation.state.params || {};

    return {
      headerTitle: 'ListScreen',
      headerRight:
        <TouchableOpacity style ={styles.headerImageContainer} onPress={params.navigateToListSelectScreen}>
          <Image style={[styles.headerImage, {tintColor: ColorUtils.getTextColor(params.color)}]} source={ArrowRight}/>
        </TouchableOpacity>
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
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
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
            selectionColor={Colors.accent}
            underlineColorAndroid={Colors.accent}
          />
          <TouchableOpacity style ={styles.headerImageContainer} onPress={this.onPressAdd}>
            <Image style={[styles.headerImage, {tintColor: Colors.black}]} source={Plus}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ListCreateScreen;
