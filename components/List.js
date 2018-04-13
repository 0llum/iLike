import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
  },
  separator: {
    height: 1,
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
});

class List extends React.Component {
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
      onRefresh,
      refreshing,
    } = this.props;

    return (
      <FlatList 
        style={styles.list}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => item.id.toString()}
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
          <TouchableOpacity
            style={styles.row}
            onPress={() => onItemPress ? onItemPress({item}) : false}
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
            { entries && <Text style={styles.number}>{item.data.length}</Text> }
          </TouchableOpacity>
        }
        ItemSeparatorComponent={() =>
          <View style={styles.separator}/>
        }
      />
    );
  }
}

export default List;
