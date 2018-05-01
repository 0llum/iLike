import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Colors from '../constants/Colors';
import * as ColorUtils from '../utils/ColorUtils';

const styles = StyleSheet.create({
  headerImageContainer: {
    justifyContent: 'center',
    padding: 10,
  },
  headerImage: {
    width: 24,
    height: 24,
  },
});

const HeaderImage = (props) => {
  const { color, image, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.headerImageContainer}
      onPress={() => (onPress ? onPress() : false)}
    >
      <Image
        style={[
          styles.headerImage,
          { tintColor: color ? ColorUtils.getTextColor(color) : Colors.black },
        ]}
        source={image}
      />
    </TouchableOpacity>
  );
};

export default HeaderImage;
