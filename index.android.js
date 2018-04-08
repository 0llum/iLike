import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListSelectScreen from './screens/ListSelectScreen';
import ListCreateScreen from './screens/ListCreateScreen';
import TilesScreen from './screens/TilesScreen';

const Navigation = StackNavigator({
  ListSelect: {screen: ListSelectScreen},
  ListCreate: {screen: ListCreateScreen},
  Tiles: {screen: TilesScreen},
}, {
  initialRouteName: 'ListSelect',
});

console.disableYellowBox = true;

export default Navigation;
