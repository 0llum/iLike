import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
  tiles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tile: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  tileText: {
    textAlign: 'center',
    fontSize: 20,
  },
  list: {
    flex: 1,
  },
});

class TilesScreen extends React.Component {
  constructor(props) {
    super(props);
    const { items } = props.navigation.state.params;
    this.state = {
      items: items,
      tile1: items[0],
      tile2: items[1],
    }
  }

  onPressTile1 = () => {
    const items = this.state.items.map(el => (
      el.id === this.state.tile1.id ? {...el, rank: el.rank + 1} : el
    ));

    this.setState({
      items: items,
      tile1: items[this.getRndInteger(0, items.length)],
      tile2: items[this.getRndInteger(0, items.length)],
    });

    console.log(this.state);
  }

  onPressTile2 = () => {
    const items = this.state.items.map(el => (
      el.id === this.state.tile2.id ? {...el, rank: el.rank + 1} : el
    ));

    this.setState({
      items: items,
      tile1: items[this.getRndInteger(0, items.length)],
      tile2: items[this.getRndInteger(0, items.length)],
    });

    console.log(this.state);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tiles}>
          <TouchableOpacity 
            style={styles.tile}
            onPress={this.onPressTile1}
          >
            <Text style={styles.tileText}>{this.state.tile1.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tile}
            onPress={this.onPressTile2}
          >
            <Text style={styles.tileText}>{this.state.tile2.name}</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          style={styles.list}
          keyExtractor={(item, index) => item.id.toString()}
          data={this.state.items}
          extraData={this.state}
          renderItem={({item}) =>
            <Text>{item.id} - {item.name} - {item.rank}</Text>
          }
        />
      </View>
    );
  }
}

export default TilesScreen;
