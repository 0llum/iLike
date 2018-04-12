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
    }
  };

  constructor(props) {
    super(props);
    let { items } = props.navigation.state.params;
    items = items.map(el => ({
      ...el,
      count: 0,
      picks: 0,
      overall: 0,
      matches: [],
    }));
    items.sort(ListUtils.byName);
    shuffled = ListUtils.shuffle(items);
    this.state = {
      items: items,
      left: shuffled[0],
      right: shuffled[1],
      showTiles: true,
      progress: 0,
    }
  }

  onPressTile = (num) => {
    let items = this.state.items;

    let left = items.find(x => x.id === this.state.left.id);
    let right = items.find(x => x.id === this.state.right.id);

    left.count = left.count + 1;
    right.count = right.count + 1;

    left.matches = [...left.matches, {
      id: this.state.right.id,
      name: this.state.right.name,
      image: this.state.right.image,
      color: this.state.right.color,
      count: 0,
      picks: 0,
    }];

    right.matches = [...right.matches, {
      id: this.state.left.id,
      name: this.state.left.name,
      image: this.state.left.image,
      color: this.state.left.color,
      count: 0,
      picks: 0,
    }];

    rightMatch = right.matches.find(x => x.id === this.state.left.id);
    leftMatch = left.matches.find(x => x.id === this.state.right.id);

    rightMatch.count = rightMatch.count + 1;
    leftMatch.count = leftMatch.count + 1;

    if (num === 0) {
      left.picks = left.picks + 1;
      rightMatch.picks = rightMatch.picks + 1;
    } else {
      right.picks = right.picks + 1;
      leftMatch.picks = leftMatch.picks + 1;
    }

    let countSum = 0;
    items.forEach(el => {
      countSum += el.count;
    });

    items = items.map(el => (countSum > 0 ? {
      ...el,
      overall: el.picks * 2 / countSum
    } : el));
    
    items.sort(ListUtils.byPickRate);

    shuffled = ListUtils.shuffle(items);
    shuffled.sort(ListUtils.byCountAsc);

    let newLeft = shuffled[0];
    let newRight;

    for (let i = 1; i < shuffled.length; i++) {
      matchLeft = newLeft.matches.find(x => x.id === shuffled[i].id);
      matchRight = shuffled[i].matches.find(x => x.id === newLeft.id);
      if (!matchLeft && !matchRight) {
        newRight = shuffled[i];
        break;
      }
    }

    const progress = this.state.progress + 1 / ListUtils.getCombinations(items);

    if (!newRight) {
      this.setState({
        items: items,
        showTiles: false,
        progress: 1,
      })
      return;
    }

    this.setState({
      items: items,
      left: newLeft,
      right: newRight,
      progress: progress,
    });
  }

  onItemPress = (item) => {
    this.props.navigation.navigate('Details', {
      name: item.item.name,
      color: item.item.color || this.props.navigation.state.params.color,
      items: item.item.matches,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.items}
          onItemPress={(item) => this.onItemPress(item)}
          image
          name
          pickRate
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
