import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  tileText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

const ColorTile = (props) => {
  const { color, children } = props;
  return (
    <Text style={[styles.tileText, { color: ColorUtils.getTextColor(color) }]}>{children}</Text>
  );
};

export default ColorTile;
