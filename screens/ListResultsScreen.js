import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import * as ListUtils from '../utils/ListUtils';
import ProgressBar from 'react-native-progress/Bar';
import ColorTile from '../components/ColorTile';
import ImageTile from '../components/ImageTile';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  tile: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  tileImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tileText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tileDivider: {
    width: 5,
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
      headerTintColor: ColorUtils.getTextColor(params.color),
      headerRight:
        <TouchableOpacity onPress={params.navigateToListResultsScreen}
        >
          <Text style={styles.headerButton}>-></Text>
        </TouchableOpacity>,
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
    })

    const request = new Request('http://0llum.de:3000/lists/' + this.state.id);
    return fetch(request)
      .then(response => response.json())
      .then(responseJson => {
        let items = responseJson.items;
        items.sort(ListUtils.byPickRate);
        this.setState({
          items: items,
          refreshing: false,
        });
      })
      .catch(error => console.log(error));
  }

  onRefresh = () => {
    this.fetchLists();
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.items}
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

export default TilesScreen;
