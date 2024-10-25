import React, {FC} from 'react';
import {View, Image, TouchableOpacity} from '../Polyfills';
import {useNavigation} from '@react-navigation/native';

import {getPreferredSize} from './utils';
import {GalleryProps, ReadableImageProps} from './types';
import {Routes} from '../../config/routes';

const ImageItem: FC<ReadableImageProps> = ({index, image, style}) => {
  const styles = {};
  const {navigate} = useNavigation();
  const onPress = params => {
    if (params.uri) {
      navigate(Routes.Picture, params);
    }
  };

  const img = getPreferredSize(image?.attributes.formats, index);
  return (
    <TouchableOpacity
      disabled={typeof img === 'number'}
      onPress={() => onPress(img)}
      style={[
        styles.imageWrapper,
        index === 0 ? styles.galleryMain : styles.galleryOther,
        style,
      ]}>
      <Image source={img} style={styles.image} />
    </TouchableOpacity>
  );
};

const Readable: FC<GalleryProps> = ({images = []}) => {
  const styles = {};

  const formatImages = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);
  };

  return (
    <View style={[styles.galleryWrapper, styles.spacer]}>
      {formatImages().map((image, index) => (
        <ImageItem image={image} index={index} key={`image-${index}`} />
      ))}
    </View>
  );
};

export default Readable;
