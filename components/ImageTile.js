import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  tileImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tileText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

class ImageTile extends React.Component {
  render() {
    return (
      <ImageBackground style={styles.tileImage} source={{uri: this.props.image}}>
        <Text style={styles.tileText} numberOfLines={2}>
          {this.props.children}
        </Text>
      </ImageBackground>
    );
  }
}

export default ImageTile;
