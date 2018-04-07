import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import List from '../components/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    fontSize: 20,
  },
});

class TilesScreen extends React.Component {
  constructor(props) {
    super(props);
    let { items } = props.navigation.state.params;
    items = items.sort(this.byName);
    shuffled = this.shuffle(items);
    this.state = {
      items: items,
      tile1: shuffled[0],
      tile2: shuffled[1],
    }
  }

  onPressTile = (num) => {
    let items = this.state.items;

    // increase count of both tile items
    items = items.map(el => (el.id === this.state.tile1.id ? {...el, count: el.count + 1} : el));
    items = items.map(el => (el.id === this.state.tile2.id ? {...el, count: el.count + 1} : el));

    // increase rate of picked item
    if (num === 0) {
      items = items.map(el => (el.id === this.state.tile1.id ? {...el, rank: el.rank + 1} : el));
    } else {
      items = items.map(el => (el.id === this.state.tile2.id ? {...el, rank: el.rank + 1} : el));
    }

    // calculate pickRate
    items = items.map(el => (el.count > 0 ? {...el, pickRate: el.rank / el.count} : el));

    // calculate sum of counts
    let countSum = 0;
    items.forEach(el => {
      countSum += el.count;
    });

    // calculate overall pickRate
    items = items.map(el => (countSum > 0 ? {...el, overall: el.rank / (countSum / 2)} : el));

    // sort items by pickRate (inverse, because of how flatlist works)
    items.sort(this.byPickRate);

    // create a shuffled copy of items
    shuffled = this.shuffle(items);
    shuffled.sort(this.byCount);

    this.setState({
      items: items,
      tile1: shuffled[0],
      tile2: shuffled[1],
    });
  }

  byName(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  }

  byPickRate(a, b) {
    return b.pickRate - a.pickRate;
  }

  byCount(a, b) {
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

  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    return (
      <View style={styles.container}>
      <List data={this.state.items} />
        <View style={styles.tiles}>
          <TouchableOpacity 
            style={styles.tile}
            onPress={() => this.onPressTile(0)}
          >
            <Text style={styles.tileText}>{this.state.tile1.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tile}
            onPress={() => this.onPressTile(1)}
          >
            <Text style={styles.tileText}>{this.state.tile2.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default TilesScreen;
