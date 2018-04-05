import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListScreen from './screens/ListScreen';
import TilesScreen from './screens/TilesScreen';

const Navigation = StackNavigator({
  List: {screen: ListScreen},
  Tiles: {screen: TilesScreen},
}, {
  initialRouteName: 'List',
});

export default Navigation;
