import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import List from '../components/List';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tile: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  tileText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

class TilesScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: params.name,
      headerStyle: {
        backgroundColor: params.color,
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
      rank: 0,
      pickRate: 0,
      overall: 0,
      matches: [],
    }));
    items.sort(this.byName);
    shuffled = this.shuffle(items);
    this.state = {
      items: items,
      left: shuffled[0],
      right: shuffled[1],
      showTiles: true,
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
      color: this.state.right.color,
      count: 0,
      rank: 0,
      pickRate: 0,
    }];

    right.matches = [...right.matches, {
      id: this.state.left.id,
      name: this.state.left.name,
      color: this.state.left.color,
      count: 0,
      rank: 0,
      pickRate: 0,
    }];

    rightMatch = right.matches.find(x => x.id === this.state.left.id);
    leftMatch = left.matches.find(x => x.id === this.state.right.id);

    rightMatch.count = rightMatch.count + 1;
    leftMatch.count = leftMatch.count + 1;

    if (num === 0) {
      left.rank = left.rank + 1;
      rightMatch.rank = rightMatch.rank + 1;
    } else {
      right.rank = right.rank + 1;
      leftMatch.rank = leftMatch + 1;
    }

    leftMatch.pickRate = leftMatch.rank / leftMatch.count;
    rightMatch.pickRate = rightMatch.rank / rightMatch.count;

    // calculate pickRate
    items = items.map(el => (el.count > 0 ? {
      ...el,
      pickRate: el.rank / el.count
    } : el));

    // calculate sum of counts
    let countSum = 0;
    items.forEach(el => {
      countSum += el.count;
    });

    // calculate overall pickRate
    items = items.map(el => (countSum > 0 ? {
      ...el,
      overall: el.rank * 2 / countSum
    } : el));
    
    // sort items by pickRate (inverse, because of how flatlist works)
    items.sort(this.byPickRate);

    // create a shuffled copy of items
    shuffled = this.shuffle(items);
    shuffled.sort(this.byCount);

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

    if (!newRight) {
      this.setState({
        items: items,
        showTiles: false,
      })
      return;
    }

    this.setState({
      items: items,
      left: newLeft,
      right: newRight,
    });

    console.log(items);
  }

  byName = (a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    
    if (nameA < nameB) {
      return -1;
    }
    
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  }

  byPickRate = (a, b) => {
    if (a.pickRate < b.pickRate) {
      return 1;
    }

    if (a.pickRate > b.pickRate) {
      return -1;
    }

    return this.byName(a, b);
  }

  byCount = (a, b) => {
    return a.count - b.count;
  }

  shuffle(a) {
    b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  onItemPress = (item) => {
    this.props.navigation.navigate('Details', {
      name: item.item.name,
      color: item.item.color,
      items: item.item.matches,
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <List 
        data={this.state.items}
        onItemPress={(item) => this.onItemPress(item)}
        name
        pickRate
        overall
      />
        {this.state.showTiles && <View style={styles.tiles}>
          <TouchableOpacity 
            style={[styles.tile, {backgroundColor: this.state.left.color}]}
            onPress={() => this.onPressTile(0)}
          >
            <Text style={[styles.tileText, {color: ColorUtils.getTextColor(this.state.left.color)}]}>
              {this.state.left.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tile, {backgroundColor: this.state.right.color}]}
            onPress={() => this.onPressTile(1)}
          >
            <Text style={[styles.tileText, {color: ColorUtils.getTextColor(this.state.right.color)}]}>
              {this.state.right.name}
            </Text>
          </TouchableOpacity>
        </View>}
      </View>
    );
  }
}

export default TilesScreen;
