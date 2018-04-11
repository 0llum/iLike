import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)'
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
    backgroundColor: Colors.white,
  },
  name: {
    flex: 2,
    fontSize: 18,
    padding: 5,
  },
  number: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    textAlign: 'right',
  },
});

class List extends React.Component {
  render() {
    const {
      data,
      name,
      count,
      rank,
      pickRate,
      overall,
      entries,
      onItemPress,
    } = this.props;

    return (
      <FlatList 
        style={styles.list}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            { name && <Text style={[styles.name, { fontWeight: 'bold' }]}>Name</Text> }
            { count && <Text style={[styles.number, { fontWeight: 'bold' }]}>Count</Text> }
            { rank && <Text style={[styles.number, { fontWeight: 'bold' }]}>Rank</Text> }
            { pickRate && <Text style={[styles.number, { fontWeight: 'bold' }]}>Pick Rate</Text> }
            { overall && <Text style={[styles.number, { fontWeight: 'bold' }]}>Overall</Text> }
            { entries && <Text style={[styles.number, { fontWeight: 'bold' }]}>Entries</Text> }
          </View>
        }
        renderItem={({item}) =>
          <TouchableOpacity
            style={[styles.row, item.color && {backgroundColor: item.color}]}
            onPress={() => onItemPress ? onItemPress({item}) : false}
          >
            { name && <Text style={[styles.name, {color: ColorUtils.getTextColor(item.color)}]}>{item.name}</Text> }
            { count && <Text style={[styles.number, {color: ColorUtils.getTextColor(item.color)}]}>{item.count}</Text> }
            { rank && <Text style={[styles.number, {color: ColorUtils.getTextColor(item.color)}]}>{item.rank}</Text> }
            { pickRate && <Text style={[styles.number, {color: ColorUtils.getTextColor(item.color)}]}>{Math.round(item.pickRate * 100)}%</Text> }
            { overall && <Text style={[styles.number, {color: ColorUtils.getTextColor(item.color)}]}>{Math.round(item.overall * 100)}%</Text> }
            { entries && <Text style={[styles.number, {color: ColorUtils.getTextColor(item.color)}]}>{item.data.length}</Text> }
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
