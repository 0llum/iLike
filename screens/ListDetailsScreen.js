import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import List from '../components/List';
import Lists from '../constants/Lists';
import * as ColorUtils from '../utils/ColorUtils';
import * as ListUtils from '../utils/ListUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ListDetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: params.name,
      headerStyle: {
        backgroundColor: params.color,
      },
      headerTintColor: ColorUtils.getTextColor(params.color),
    };
  };

  constructor(props) {
    super(props);
    let { items } = props.navigation.state.params;
    items.sort(ListUtils.byPickRate);
    this.state = {
      items: items,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <List
          data={this.state.items}
          name
          pickRate
        />
      </View>
    );
  }
}

export default ListDetailsScreen;
