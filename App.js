import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import ListSelectScreen from './screens/ListSelectScreen';
import ListCreateScreen from './screens/ListCreateScreen';
import ListDetailsScreen from './screens/ListDetailsScreen';
import TilesScreen from './screens/TilesScreen';
import ListResultsScreen from './screens/ListResultsScreen';

const Navigation = StackNavigator(
  {
    Login: { screen: LoginScreen },
    ListSelect: { screen: ListSelectScreen },
    ListCreate: { screen: ListCreateScreen },
    Details: { screen: ListDetailsScreen },
    Tiles: { screen: TilesScreen },
    ListResults: { screen: ListResultsScreen },
  },
  {
    initialRouteName: 'Login',
  },
);

console.disableYellowBox = true;

export default Navigation;
