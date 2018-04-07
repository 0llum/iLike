import React from 'react';
import { StyleSheet, Text, View, FlatList, } from 'react-native';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    const { data } = this.props;
    return (
      <FlatList 
        style={styles.list}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.row}>
            <Text style={[styles.name, { fontWeight: 'bold' }]}>Name</Text>
            <Text style={[styles.number, { fontWeight: 'bold' }]}>Pick Rate</Text>
            <Text style={[styles.number, { fontWeight: 'bold' }]}>Overall</Text>
          </View>
        }
        renderItem={({item}) =>
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.number}>{Math.round(item.pickRate * 100)}%</Text>
            <Text style={styles.number}>{Math.round(item.overall * 100)}%</Text>
          </View>
        }
      />
    );
  }
}

export default List;
