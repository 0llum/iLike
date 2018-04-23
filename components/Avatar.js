import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: Colors.accent,
  },
  firstLetter: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
  },
});

class Avatar extends React.Component {
  render() {
    const {
      image,
      color,
      text,
    } = this.props;

    return (
      <View style={styles.imageContainer}>
        {image
          ? <Image style={styles.image} source={{uri: image}}/>
          : <View style={[styles.color, color && {backgroundColor: color}]}>
            <Text style={[styles.firstLetter, color && {color: ColorUtils.getTextColor(color)}]}>
              {text.substring(0, 1).toUpperCase()}
            </Text>
          </View>}
      </View>
    );
  }
}

export default Avatar;
