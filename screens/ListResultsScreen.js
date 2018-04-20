import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import * as ListUtils from '../utils/ListUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class TilesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: params.name,
      headerStyle: {
        backgroundColor: params.color || Colors.white,
      },
      headerTintColor: ColorUtils.getTextColor(params.color)
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      id: props.navigation.state.params.id,
      items: [],
      refreshing: false,
    }
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults() {
    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 10000);

    return fetch('http://0llum.de:3000/lists/' + this.state.id)
      .then(response => response.json())
      .then(responseJson => {
        let items = responseJson.items;
        items.sort(ListUtils.byPickRateDesc);
        this.setState({
          items: items,
          refreshing: false,
        });
      })
      .catch(error => console.log(error));
  }

  onRefresh = () => {
    this.fetchResults();
  }

  onItemPress = (item) => {
    console.log(item);
    this.props.navigation.navigate('Details', {
      id: this.state.id,
      itemId: item._id,
      name: item.name,
      color: item.color || this.props.navigation.state.params.color,
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
          count
          picks
          pickRate
        />
      </View>
    );
  }
}

export default TilesScreen;
