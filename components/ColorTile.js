import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  tileText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

class ColorTile extends React.Component {
  render() {
    return (
      <Text style={[styles.tileText, {color: ColorUtils.getTextColor(this.props.color)}]}>
        {this.props.children}
      </Text>
    );
  }
}

export default ColorTile;
