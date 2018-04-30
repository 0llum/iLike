import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import List from '../components/List';
import * as Colors from '../constants/Colors';
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
        backgroundColor: params.color || Colors.white,
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
    };
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    this.setState({
      refreshing: true,
    });

    return fetch('https://api.0llum.de/lists/' + this.state.id + '/' + this.state.itemId)
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
  };

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
          progress
        />
      </View>
    );
  }
}

export default ListDetailsScreen;
