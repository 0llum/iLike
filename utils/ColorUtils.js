import * as Colors from '../constants/Colors';

export function hexToRGB(color) {
  if (color.substring(0, 1) == '#') {
     color = color.substring(1);
  }

  const rgb = {};

  rgb.r = parseInt(color.substring(0, 2), 16);
  rgb.g = parseInt(color.substring(2, 4), 16);
  rgb.b = parseInt(color.substring(4), 16);

  return rgb;
}

export function getBrightness(color) {
  if (!color) {
    return 255;
  }

  rgb = hexToRGB(color);
  return rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
}

export function getTextColor(color) {
  return getBrightness(color) > 128 ? Colors.black : Colors.white;
}