import React from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';
import Minus from '../assets/minus.png';

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.white,
  },
  listContainer: {
    backgroundColor: Colors.white,
  },
  separator: {
    width: '100%',
    height: 1,
    alignSelf: 'center',
    backgroundColor: Colors.bright,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 5,
  },
  rank: {
    flex: 1,
    fontSize: 18,
    padding: 5,
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: Colors.accent,
  },
  firstLetter: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
  name: {
    flex: 6,
    fontSize: 18,
    padding: 5,
  },
  number: {
    flex: 2,
    fontSize: 18,
    padding: 5,
    textAlign: 'right',
  },
  deleteButton: {
    width: 30,
    height: 30,
    tintColor: Colors.red,
  },
  progressBar: {
    flex: 4,
    position: 'absolute',
  },
});

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      width: Dimensions.get('window').width,
    }
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.onOrientationChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change');
  }

  onOrientationChange = () => {
    this.setState({
      width: Dimensions.get('window').width,
    });
  }

  render() {
    const {
      data,
      header,
      rank,
      image,
      name,
      count,
      picks,
      pickRate,
      overall,
      entries,
      onItemPress,
      onDeletePress,
      onRefresh,
      refreshing,
      progress,
    } = this.props;

    return (
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => item._id}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh ? onRefresh : false}
        refreshing={refreshing}
        ListHeaderComponent={
          header && <View style={styles.header}>
            { rank && <Text style={[styles.rank, { fontWeight: 'bold' }]}>Rank</Text>}
            { image && <Text style={[styles.rank, { fontWeight: 'bold' }]}>Image</Text>}
            { name && <Text style={[styles.name, { fontWeight: 'bold' }]}>Name</Text> }
            { count && <Text style={[styles.number, { fontWeight: 'bold' }]}>Count</Text> }
            { picks && <Text style={[styles.number, { fontWeight: 'bold' }]}>Picks</Text> }
            { pickRate && <Text style={[styles.number, { fontWeight: 'bold' }]}>Pick Rate</Text> }
            { overall && <Text style={[styles.number, { fontWeight: 'bold' }]}>Overall</Text> }
            { entries && <Text style={[styles.number, { fontWeight: 'bold' }]}>Entries</Text> }
          </View>
        }
        renderItem={({item, index}) =>
          <View>
            { progress && <ProgressBar
              style={styles.progressBar}
              progress={item.count > 0 ? item.picks / item.count : 0}
              width={this.state.width}
              height={40}
              borderRadius={0}
              borderWidth={0}
              color={Colors.brighter}
            /> }
            <TouchableOpacity
              style={styles.row}
              onPress={() => onItemPress ? onItemPress(item) : false}
            >
              { rank && <Text style={styles.rank}>{index}</Text>}
              { image && <View style={styles.imageContainer}>
                {item.image
                  ? <Image style={styles.image} source={{uri: item.image}}/>
                  : <View style={[styles.color, item.color && {backgroundColor: item.color}]}>
                    <Text style={[styles.firstLetter, item.color && {color: ColorUtils.getTextColor(item.color)}]}>{item.name.substring(0, 1).toUpperCase()}</Text>
                  </View>}
              </View>}
              { name && <Text style={styles.name} numberOfLines={1}>{item.name}</Text> }
              { count && <Text style={styles.number}>{item.count}</Text> }
              { picks && <Text style={styles.number}>{item.picks}</Text> }
              { pickRate && <Text style={styles.number}>{item.count > 0 ? Math.round(item.picks / item.count * 100) : 0}%</Text> }
              { overall && <Text style={styles.number}>{Math.round(item.overall * 100)}%</Text> }
              { entries && <Text style={styles.number}>{item.items.length}</Text> }
              { onDeletePress && <TouchableOpacity style={styles.imageContainer } onPress={() => onDeletePress(index)}>
                  <Image style={styles.deleteButton} source={Minus}/>
              </TouchableOpacity> }
            </TouchableOpacity>
          </View>
        }
        ItemSeparatorComponent={() =>
          <View style={styles.separator}/>
        }
      />
    );
  }
}

export default List;
