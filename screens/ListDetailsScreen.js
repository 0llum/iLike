import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';
import * as ColorUtils from '../utils/ColorUtils';
import * as ListUtils from '../utils/ListUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ListDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: params.name,
      headerStyle: {
        backgroundColor: params.color,
      },
      headerTintColor: ColorUtils.getTextColor(params.color),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.state.params.id,
      itemId: props.navigation.state.params.itemId,
      matches: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 10000);

    return fetch('http://0llum.de:3000/lists/' + this.state.id + '/' + this.state.itemId)
      .then(response => response.json())
      .then(responseJson => {
        let matches = responseJson.matches;
        matches.sort(ListUtils.byPickRateDesc);
        this.setState({
          matches: matches,
          refreshing: false,
        });
      })
      .catch(error => console.log(error));
  }

  onRefresh = () => {
    this.fetchDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.matches}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          image
          name
          pickRate
        />
      </View>
    );
  }
}

export default ListDetailsScreen;
