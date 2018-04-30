import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListSelectScreen from './screens/ListSelectScreen';
import ListCreateScreen from './screens/ListCreateScreen';
import ListDetailsScreen from './screens/ListDetailsScreen';
import TilesScreen from './screens/TilesScreen';
import ListResultsScreen from './screens/ListResultsScreen';

const Navigation = StackNavigator(
  {
    ListSelect: { screen: ListSelectScreen },
    ListCreate: { screen: ListCreateScreen },
    Details: { screen: ListDetailsScreen },
    Tiles: { screen: TilesScreen },
    ListResults: { screen: ListResultsScreen },
  },
  {
    initialRouteName: 'ListSelect',
  },
);

console.disableYellowBox = true;

export default Navigation;
