import React from 'react';
import { StyleSheet, Text, ImageBackground } from 'react-native';
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
    backgroundColor: Colors.black50,
  },
});

const ImageTile = (props) => {
  const { image, children } = props;
  return (
    <ImageBackground
      style={styles.imageContainer}
      imageStyle={styles.image}
      source={{ uri: image }}
    >
      <Text style={styles.text} numberOfLines={2}>
        {children}
      </Text>
    </ImageBackground>
  );
};

export default ImageTile;
