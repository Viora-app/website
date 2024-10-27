import React, {FC} from 'react';
import {View, Image, TouchableOpacity} from '../Polyfills';
import {useRouter} from 'next/navigation';

import {getPreferredSize} from './utils';
import {GalleryProps, ReadableImageProps} from './types';
import {Routes} from '../../config/routes';

const ImageItem: FC<ReadableImageProps> = ({index, image}) => {
  const {push: navigate} = useRouter();
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
      >
      <Image alt="" source={img} />
    </TouchableOpacity>
  );
};

const Readable: FC<GalleryProps> = ({images = []}) => {
  const formatImages = () => {
    return Array(5)
      .fill(null)
      .map((_, index) => images[index] || null);
  };

  return (
    <View>
      {formatImages().map((image, index) => (
        <ImageItem image={image} index={index} key={`image-${index}`} />
      ))}
    </View>
  );
};

export default Readable;
