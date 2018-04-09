import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
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
            style={styles.row}
            onPress={() => onItemPress({item})}
          >
            { name && <Text style={styles.name}>{item.name}</Text> }
            { count && <Text style={styles.number}>{item.count}</Text> }
            { rank && <Text style={styles.number}>{item.rank}</Text> }
            { pickRate && <Text style={styles.number}>{Math.round(item.pickRate * 100)}%</Text> }
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
