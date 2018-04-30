import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Colors from '../constants/Colors';

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
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
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={styles.image}
        source={{ uri: this.props.image }}
      >
        <Text style={styles.text} numberOfLines={2}>
          {this.props.children}
        </Text>
      </ImageBackground>
    );
  }
}

export default ImageTile;
