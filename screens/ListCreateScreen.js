import React from 'react';
import { Keyboard, StyleSheet, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import HeaderImage from '../components/HeaderImage';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import ArrowRight from '../assets/arrow_right.png';
import Plus from '../assets/plus.png';

const styles = StyleSheet.create({
  container: {
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
      headerTitle: (
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Title"
            onChangeText={text => params.onChangeTitle(text)}
            value={params.name}
            selectionColor={Colors.accent}
            underlineColorAndroid={Colors.accent}
          />
        </View>
      ),
      headerRight: (
        <HeaderImage
          onPress={params.navigateToListSelectScreen}
          color={params.color}
          image={ArrowRight}
        />
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      name: '',
      items: [],
      text: '',
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      navigateToListSelectScreen: this.navigateToListSelectScreen,
      onChangeTitle: this.onChangeTitle,
      title: this.state.name,
    });
  }

  onChangeText = (value) => {
    this.setState({ text: value });
  };

  onChangeTitle = (value) => {
    this.setState({ name: value });
  };

  onPressAdd = () => {
    this.setState({
      items: [
        ...this.state.items,
        {
          name: this.state.text,
        },
      ],
      text: '',
    });
    Keyboard.dismiss();
  };

  onAvatarPress = (item) => {};

  onPressDelete = (index) => {
    const { items } = this.state;
    items.splice(index, 1);
    this.setState({
      items,
    });
  };

  navigateToListSelectScreen = () => {
    const request = new Request('https://api.0llum.de/lists', {
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
      .then((responseJson) => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ListSelect' })],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
        <List
          data={this.state.items}
          onAvatarPress={item => this.onAvatarPress(item)}
          image
          name
          onDeletePress={index => this.onPressDelete(index)}
        />
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputField}
            placeholder="Add some data"
            onChangeText={text => this.onChangeText(text)}
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
