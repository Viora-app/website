import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions} from '../Polyfills';

import {boxes} from '../../config/stylesGuides';
import {IntroContentProps} from './types';

const Slide = ({data}: IntroContentProps) => {
  const [dimensions, setDimensions] = useState([0, 0]);
  const styles = {};
  const {backgroundColor, image, description, color, onSelect} = data;

  useEffect(() => {
    const {width, height} = Dimensions.get('window');
    setDimensions([
      width - boxes.paddingMedium * 2,
      height - width - boxes.paddingMedium * 3,
    ]);
  }, []);

  return (
    <View style={[styles.stepContainer, {backgroundColor}]}>
      <View style={[styles.imageContainer, {height: dimensions[0]}]}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={[styles.descriptionContainer, {height: dimensions[1]}]}>
        <Text style={[styles.description, {color}]}>{description}</Text>
      </View>
    </View>
  );
};

export default Slide;
