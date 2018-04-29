import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import HeaderImage from '../components/HeaderImage';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import * as ListUtils from '../utils/ListUtils';
import * as DbUtils from '../utils/DbUtils';
import ProgressBar from 'react-native-progress/Bar';
import ColorTile from '../components/ColorTile';
import ImageTile from '../components/ImageTile';
import ArrowRight from '../assets/arrow_right.png';

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
      headerRight: <HeaderImage onPress={params.navigateToListResultsScreen} color={params.color} image={ArrowRight} />
    }
  };

  constructor(props) {
    super(props);
    let { id, items } = props.navigation.state.params;
    items = items.map(el => ({
      ...el,
      count: 0,
      picks: 0,
      overall: 0,
      matches: [],
    }));
    items.sort(ListUtils.byNameAsc);
    shuffled = ListUtils.shuffle(items);
    this.state = {
      id: id,
      items: items,
      left: shuffled[0],
      right: shuffled[1],
      showTiles: true,
      progress: 0,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ 
      navigateToListResultsScreen: this.navigateToListResultsScreen,
    })
  }

  navigateToListResultsScreen = () => {
    this.props.navigation.navigate('ListResults', {
      id: this.state.id,
      name: this.props.navigation.state.params.name,
      color: this.props.navigation.state.params.color
    });
  }

  onPressTile = (num) => {
    let items = this.state.items;

    const listId = this.state.id;
    const leftId = this.state.left._id;
    const rightId = this.state.right._id;
    const left = items.find(x => x._id === leftId);
    const right = items.find(x => x._id === rightId);

    left.count = left.count + 1;
    right.count = right.count + 1;

    left.matches = [...left.matches, {
      _id: rightId,
      name: this.state.right.name,
      image: this.state.right.image,
      color: this.state.right.color,
      count: 0,
      picks: 0,
    }];

    right.matches = [...right.matches, {
      _id: leftId,
      name: this.state.left.name,
      image: this.state.left.image,
      color: this.state.left.color,
      count: 0,
      picks: 0,
    }];

    rightMatch = right.matches.find(x => x._id === leftId);
    leftMatch = left.matches.find(x => x._id === rightId);

    rightMatch.count = rightMatch.count + 1;
    leftMatch.count = leftMatch.count + 1;

    let body = {};
    body.items = [];

    if (num === 0) {
      left.picks = left.picks + 1;
      rightMatch.picks = rightMatch.picks + 1;

      body.items.push({
        id: leftId,
        count: 1,
        picks: 1,
        matches: [{
          itemId: rightId,
          count: 1,
        }],
      });
      body.items.push({
        id: rightId,
        count: 1,
        matches: [{
          itemId: leftId,
          count: 1,
          picks: 1,
        }],
      });
    } else {
      right.picks = right.picks + 1;
      leftMatch.picks = leftMatch.picks + 1;

      body.items.push({
        id: rightId,
        count: 1,
        picks: 1,
        matches: [{
          itemId: leftId,
          count: 1,
        }],
      });
      body.items.push({
        id: leftId,
        count: 1,
        matches: [{
          itemId: rightId,
          count: 1,
          picks: 1,
        }],
      });
    }

    let countSum = 0;
    items.forEach(el => {
      countSum += el.count;
    });

    items = items.map(el => (countSum > 0 ? {
      ...el,
      overall: el.picks * 2 / countSum
    } : el));
    
    items.sort(ListUtils.byNameAsc);
    items.sort(ListUtils.byPicksDesc);
    items.sort(ListUtils.byPickRateDesc);
    const progress = this.state.progress + 1 / ListUtils.getCombinations(items);

    let pair = ListUtils.getMostPickedLeastCommonPair(items);

    if (!pair) {
      this.setState({
        items: items,
        showTiles: false,
        progress: 1,
      });

      body.count = 1;
      return;
    }

    this.setState({
      items: items,
      left: num === 0 ? pair[0] : pair[1],
      right: num === 0 ? pair[1] : pair[0],
      progress: progress,
    });

    fetch('https://api.0llum.de/lists/' + listId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  onItemPress = (item) => {
    this.props.navigation.navigate('Details', {
      name: item.name,
      color: item.color || this.props.navigation.state.params.color,
      items: item.matches,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.items}
          image
          name
          pickRate
          progress
        />
        {this.state.showTiles && <View style={styles.tiles}>
          <TouchableOpacity 
            style={[styles.tile, this.state.left.color && {backgroundColor: this.state.left.color}]}
            onPress={() => this.onPressTile(0)}
          >
          {this.state.left.image
            ? <ImageTile image={this.state.left.image}>{this.state.left.name}</ImageTile>
            : <ColorTile color={this.state.left.color}>{this.state.left.name}</ColorTile>}
          </TouchableOpacity>
          <View style={styles.tileDivider} />
          <TouchableOpacity 
            style={[styles.tile, this.state.right.color && {backgroundColor: this.state.right.color}]}
            onPress={() => this.onPressTile(1)}
          >
            {this.state.right.image
              ? <ImageTile image={this.state.right.image}>{this.state.right.name}</ImageTile>
              : <ColorTile color={this.state.right.color}>{this.state.right.name}</ColorTile>}
          </TouchableOpacity>
        </View>}
        {this.state.showTiles && <ProgressBar
          progress={this.state.progress}
          width={null}
          borderRadius={0}
          borderWidth={0}
          color={Colors.accent}
        />}
      </View>
    );
  }
}

export default TilesScreen;
