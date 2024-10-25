import React from 'react';
import {View} from 'react-native';
import {DotsProps} from './types';

const Dots = ({count, current}: DotsProps) => {
  const styles = {};
  const arr = Array(count)
    .fill(0)
    .map((_, i) => (current === i ? styles.dotActive : styles.dotInactive));

  return (
    <View style={styles.dotsWrapper}>
      {arr.map((style, i) => (
        <View key={i} style={[styles.dot, style]} />
      ))}
    </View>
  );
};

export default Dots;
