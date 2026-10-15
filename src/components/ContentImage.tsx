import React from 'react';
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';

export function ContentImage({
  source,
  aspectRatio = 1.32,
  borderRadius = 4,
  resizeMode = 'cover',
}: {
  source: ImageSourcePropType;
  aspectRatio?: number;
  borderRadius?: number;
  resizeMode?: ImageResizeMode;
}) {
  return (
    <View style={[styles.frame, { aspectRatio, borderRadius }]}>
      <Image source={source} resizeMode={resizeMode} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { alignSelf: 'stretch', overflow: 'hidden' },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
